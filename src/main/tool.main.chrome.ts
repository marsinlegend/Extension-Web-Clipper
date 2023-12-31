import 'regenerator-runtime/runtime';
import 'reflect-metadata';
import { ILocaleService } from '@/service/common/locale';
import Container from 'typedi';
import { IWebRequestService } from '@/service/common/webRequest';
import { WebRequestChannelClient } from '@/service/webRequest/common/webRequestIPC';
import { IContentScriptService } from '@/service/common/contentScript';
import { ContentScriptChannelClient } from '@/service/contentScript/common/contentScriptIPC';
import { ITabService } from '@/service/common/tab';
import { PopupIpcClient, PopupContentScriptIPCClient } from '@/service/ipc/browser/popup/ipcClient';
import '@/service/request/tool/basic';
import '@/service/config/browser/configService';
import localeService from '@/common/locales';
Container.set(ILocaleService, localeService);
import '@/service/extension/browser/extensionService';
import '@/service/extension/browser/extensionContainer';
import '@/service/permissions/chrome/permissionsService';
import { TabChannelClient } from '@/service/tab/common/tabIpc';
import app from '@/pages/app';
import { CookieChannelClient } from '@/service/cookie/common/cookieIpc';
import { ICookieService } from '@/service/common/cookie';

const ipcClient = new PopupIpcClient();

const tabChanel = ipcClient.getChannel('tab');
Container.set(ITabService, new TabChannelClient(tabChanel));

const contentScriptIPCClient = new PopupContentScriptIPCClient(Container.get(ITabService));
const contentScriptChannel = contentScriptIPCClient.getChannel('contentScript');
Container.set(IContentScriptService, new ContentScriptChannelClient(contentScriptChannel));

const webRequestChannel = ipcClient.getChannel('webRequest');
Container.set(IWebRequestService, new WebRequestChannelClient(webRequestChannel));

const cookieChannel = ipcClient.getChannel('cookies');
Container.set(ICookieService, new CookieChannelClient(cookieChannel));

app();
