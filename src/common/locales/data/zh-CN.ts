import { LocaleModel } from '@/common/locales/interface';
import antd from 'antd/lib/locale-provider/zh_CN';

const messages = {
  'tool.title': '笔记标题',
  'tool.save': '保存内容',
  'tool.repository': '知识库',
  'tool.toolExtensions': '工具扩展',
  'tool.clipExtensions': '剪藏扩展',
  'preference.tab.account': '账户',
  'backend.services.yuque.name': '语雀',
  'backend.services.yuque.form.showAllRepository': '显示全部知识库',
  'backend.services.youdao.name': '有道云笔记',
  'backend.imageHosting.yuque.name': '语雀',
  'preference.tab.extensions': '扩展设置',
  'preference.tab.imageHost': '图床设置',
  'preference.tab.basic': '基础设置',
  'component.accountItem.edit': '编辑',
  'component.accountItem.delete': '删除',
  'preference.accountList.editAccount': '编辑账户',
  'preference.accountList.type': '类型',
  'backend.services.yuque.form.showSelfRepository': '显示自己的知识库',
  'preference.accountList.defaultRepository': '默认知识库',
  'preference.accountList.imageHost': '图床',
  'component.imageHostingSelectOption.noDescription': '没有备注',
  'preference.accountList.confirm': '确认',
  'backend.services.yuque.form.repositoryType': '知识库类型',
  'preference.accountList.addAccount': '添加账户',
  'preference.extensions.clipExtensions': '剪藏插件',
  'preference.extensions.toolExtensions': '工具插件',
  'backend.services.yuque.form.showGroupRepository': '显示团队的知识库',
  'preference.basic.showLineNumber.title': '显示行号',
  'preference.basic.showLineNumber.description': '开启后编辑器显示行号',
  'preference.basic.liveRendering.title': '所见即所得',
  'preference.basic.liveRendering.description': '开启后编辑器使用所见即所得模式',
  'preference.basic.configLanguage.title': '语言',
  'preference.basic.configLanguage.description': '欢迎在 GitHub 提交翻译',
  'preference.imageHosting.add': '添加图床',
  'component.imagehostingListItem.noDescription': '没有备注',
  'component.imagehostingListItem.edit': '编辑',
  'component.imagehostingListItem.delete': '删除',
  'preference.imageHosting.type': '类型',
  'preference.imageHosting.remark': '备注',
  'preference.imageHosting.edit': '编辑',
  'preference.account.add': '绑定账户',
  'preference.basic.update.title': '有更新',
  'preference.basic.update.button': '安装更新',
  'preference.accountList.login': '授权登录',
  'page.complete.error': '发生错误',
  'page.complete.success': '保存成功',
  'page.complete.message': '前往 {name} 查看',
  'backend.services.yuque_oauth.name': '语雀(一键授权)',
  'preference.tab.changelog': '更新日志',
  'preference.extensions.clipExtensions.tooltip': '点击 🌟选择默认插件',
  'preference.accountList.verify': '校验',
  'backend.services.youdao.unauthorizedErrorMessage': '授权失败，请登录网页版有道云笔记。',
  'backend.services.notion.unauthorizedErrorMessage': '授权失败，请登录网页版 Notion。',
  'preference.basic.update.description': '因为审核需要一周，所以 chrome 商店的版本会延迟几个版本。',
  'backend.services.onenote_oauth.name': 'One Note',
  'preference.extensions.no.Description': '没有描述',
  'preference.extensions.ConfiguredAsDefaultExtension': '设置成默认扩展',
  'preference.extensions.CancelSetting': '取消设置',
  'preference.extensions.Uninstall': '卸载',
  'preference.extensions.install': '安装',
  'preference.extensions.update': '更新',
  'preference.extensions.require.update': '需要剪藏更新到 {version} 版本',
  'preference.tab.powerpack': '加强包',
  'backend.services.mail.name': '邮件',
  'backend.services.mail.form.homepage.of.mail': '邮箱首页',
  'backend.services.mail.form.powerpack': '加强包',
  'backend.services.mail.form.buy.powerpack': '购买加强包',
  'backend.services.mail.form.send.to': '发送给',
  'backend.services.mail.form.send.html': '发送 Html',
  'backend.services.mail.form.send.html.or.markdown': '发送 Html 或 Markdown',
  'backend.services.mail.form.homepage': '邮箱首页',
  'preference.accountList.verifying': '校验中',
  'preference.powerpack.expiry': '过期时间',
  'preference.powerpack.logout': '登出',
  'preference.powerpack.upgrade': '购买',
  'preference.powerpack.activate': '购买加强包解锁更多功能',
  'preference.powerpack.free.trial': '免费试用7天',
  'preference.powerpack.login.github': '通过 Github 登录',
  'preference.powerpack.reload': '刷新',
  'backend.services.mail.form.address.is.required': '请填写邮件地址',
  'backend.services.mail.form.homepage.is.required': '请填写首页地址',
  'backend.services.mail.form.powerpack.is.expired': '加强包已过期',
  'backend.services.mail.form.powerpack.is.required': '需要购买加强包',
  'preference.tab.privacy': '隐私协议',
  'backend.services.bear.form.confirm': '请确认您安装了 Bear 客户端。',
  'preference.powerpack.feature.saveToEmail': '保存到邮件',
  'preference.powerpack.features': '功能',
  'preference.extensions.require.powerpack': '请购买加强包',
  'preference.extensions.runAutomaticOnSaving': '保存时自动运行',
  'preference.extensions.automaticOperationIsProhibited': '自动运行被禁止',
};

const model: LocaleModel = {
  antd,
  name: '简体中文',
  locale: 'zh-CN',
  messages,
  alias: ['zh'],
};

export default model;
