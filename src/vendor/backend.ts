interface Repository {
  id: string;
  name: string;
  private: boolean;
  description: string;
  createdAt: string;
  owner: string;
  /**
   * namespace = owner/name
   */
  namespace: string;
}

interface UserInfo {
  name: string;
  avatar: string;
  homePage: string;
  description?: string;
}

interface CreateDocumentRequest {
  title: string;
  content: string;
  private: boolean;
  repositoryId: string;
  tags?: string[];
}
interface CreateDocumentResponse {
  href: string;
  repositoryId: string;
  documentId: string;
}

interface CreateRepositoryRequest {
  name: string;
  private: boolean;
}

interface UploadImageRequest {
  data: string;
}

interface ImageHostingService {
  uploadImage(request: UploadImageRequest): Promise<string>;

  uploadImageUrl(url: string): Promise<string>;
}

interface DocumentService {
  getRepositories(): Promise<Repository[]>;

  createDocument(
    request: CreateDocumentRequest
  ): Promise<CreateDocumentResponse>;

  getUserInfo(): Promise<UserInfo>;
}
