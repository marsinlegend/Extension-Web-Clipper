import { generateUuid } from '@web-clipper/shared/lib/uuid';
import { BlobToBase64 } from '@/common/blob';
import Axios from 'axios';
import { UploadImageRequest, ImageHostingService } from '../interface';
import { isUndefined } from 'lodash';
import { GithubClient } from '../../clients/github/client';
import Container from 'typedi';
import { IBasicRequestService } from '@/service/common/request';

export interface GithubImageHostingOption {
  accessToken: string;
  savePath: string;
  repoName: string;
}

export default class GithubImageHostingService implements ImageHostingService {
  private config: GithubImageHostingOption;
  private username: string;
  private date: Date;
  private githubClient: GithubClient;
  constructor(config: GithubImageHostingOption) {
    this.username = '';
    this.config = config;
    this.date = new Date();
    this.githubClient = new GithubClient({
      token: this.config.accessToken,
      request: Container.get(IBasicRequestService),
    });
  }

  getId() {
    return this.config.accessToken;
  }

  uploadImage = async ({ data }: UploadImageRequest) => {
    return this.uploadAsBase64(data);
  };

  uploadImageUrl = async (url: string) => {
    const image = await Axios.get(url, { responseType: 'blob' });
    const imageBlob = image.data;
    const imageBase64 = await BlobToBase64(imageBlob);
    return this.uploadAsBase64(imageBase64);
  };

  private async getUserName() {
    const response = await this.githubClient.getUserInfo();
    return response.login;
  }

  private generateFilename = (data: string): string => {
    const matchedSuffix: any = data.match(/^data:image\/(.*);base64,/);
    const suffix: string = matchedSuffix[1];
    return `${generateUuid()}\.${suffix}`;
  };

  private uploadAsBase64 = async (data: string): Promise<string> => {
    if (this.username === '') {
      try {
        this.username = await this.getUserName();
      } catch (error) {
        throw error;
      }
    }

    if (isUndefined(this.config.savePath)) this.config.savePath = '';
    if (this.config.savePath.startsWith('/')) this.config.savePath.substr(1);
    if (!this.config.savePath.endsWith('/') && this.config.savePath.length > 0)
      this.config.savePath += '/';

    const fileName = this.generateFilename(data);
    const folderName = this.date
      .toLocaleString('chinese', { hour12: false })
      .replace(new RegExp('/', 'g'), '-')
      .replace(new RegExp(':', 'g'), '-');
    const filteredImage = data.replace(/^data:image\/.*;base64,/, '');
    const response = await this.githubClient.uploadFile({
      owner: this.username,
      repo: this.config.repoName,
      path: `${this.config.savePath}${folderName}/${fileName}`,
      message: `Upload image "${fileName}"`,
      content: filteredImage,
    });
    return `${response.content.html_url}?raw=true`;
  };
}
