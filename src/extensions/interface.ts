import { SerializedExtension } from './interface';
import { ImageHostingService } from '../common/backend/index';
import { codeCallWithContext } from './utils';
import TurndownService from 'turndown';
import { IHighlighter } from '@web-clipper/highlight';

export interface InitContext {
  accountInfo: {
    type?: string;
  };
  url?: string;
  pathname: string;
  currentImageHostingService?: {
    type: string;
  };
}

export interface ContentScriptContext {
  $: JQueryStatic;
  turndown: TurndownService;
  Highlighter: Type<IHighlighter>;
  AreaSelector: any;
  toggleClipper: any;
  Readability: any;
  document: Document;
  QRCode: any;
}

export interface Message {
  info(content: string): void;
}

export interface ToolContext<T, Out> {
  result: T;
  data: Out;
  message: Message;
  imageService: ImageHostingService;
  loadImage: any;
  captureVisibleTab: any;
}

export interface IExtensionLifeCycle<T, U> {
  /**
   * 插件被加载之前
   */
  init?(context: InitContext): boolean;

  /**
   * 执行插件
   */
  run?(context: ContentScriptContext): Promise<T> | T;

  /**
   * 执行插件后
   */
  afterRun?(context: ToolContext<T, U>): Promise<U> | U;

  /**
   * 清理环境
   */
  destroy?(context: ContentScriptContext): void;
}

export interface IExtensionManifest {
  /**
   * 扩展名名
   */
  readonly name: string;
  /**
   * 版本号 a.b.c
   */
  readonly version: string;
  /**
   * 描述
   */
  readonly description?: string;
  /**
   * 图标地址
   */
  readonly icon?: string;
  /**
   * 匹配的网址列表，如果为空，则匹配全部网站。
   */
  readonly matches?: string[];
  /**
   * 关键字
   */
  readonly keywords?: string[];

  readonly i18nManifest?: {
    [key: string]: {
      readonly name?: string;
      readonly description?: string;
      readonly icon?: string;
      readonly keywords?: string;
    };
  };
}

export const enum ExtensionType {
  Text = 'Text',
  Image = 'Image',
  Tool = 'tool',
}

export interface SerializedExtension {
  type: ExtensionType;
  manifest: IExtensionManifest;
  init?: string;
  run?: string;
  afterRun?: string;
  destroy?: string;
}

export interface SerializeAble {
  serialize: () => SerializedExtension;
}

class AbstractExtension<T, U> implements SerializeAble {
  private readonly type: ExtensionType;
  private readonly manifest: IExtensionManifest;

  constructor(
    type: ExtensionType,
    manifest: IExtensionManifest,
    private extensionLifeCycle: IExtensionLifeCycle<T, U>
  ) {
    this.type = type;
    this.manifest = manifest;
  }

  serialize() {
    return {
      type: this.type,
      manifest: this.manifest,
      init: codeCallWithContext(this.extensionLifeCycle.init),
      run: codeCallWithContext(this.extensionLifeCycle.run),
      afterRun: codeCallWithContext(this.extensionLifeCycle.afterRun),
      destroy: codeCallWithContext(this.extensionLifeCycle.destroy),
    };
  }
}

export class TextExtension<T = string> extends AbstractExtension<T, string> {
  constructor(manifest: IExtensionManifest, methods: IExtensionLifeCycle<T, string>) {
    super(ExtensionType.Text, manifest, methods);
  }
}

export class ToolExtension<T = string> extends AbstractExtension<T, string> {
  constructor(manifest: IExtensionManifest, methods: IExtensionLifeCycle<T, string>) {
    super(ExtensionType.Tool, manifest, methods);
  }
}

export interface ImageExtensionData {
  dataUrl: string;
  width: number;
  height: number;
}

export class ImageExtension<T = string> extends AbstractExtension<T, ImageExtensionData> {
  constructor(manifest: IExtensionManifest, methods: IExtensionLifeCycle<T, ImageExtensionData>) {
    super(ExtensionType.Image, manifest, methods);
  }
}

export interface SerializedExtensionWithId extends SerializedExtension {
  id: string;
  router: string;
}
