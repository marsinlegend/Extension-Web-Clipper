import * as React from 'react';
import * as styles from './index.scss';
import {
  asyncChangeAccount,
  asyncCreateDocument,
  selectRepository,
  updateTitle,
  asyncRunExtension,
  asyncHideTool,
} from '../../store/actions';
import { Avatar, Button, Icon, Input, Select } from 'antd';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { ToolContainer } from '../../components/container';
import { isEqual } from 'lodash';
import {
  SerializedExtensionWithId,
  ExtensionType,
  InitContext,
} from '../../extensions/interface';
import ClipExtensions from './clipExtensions';
import ToolExtensions from './toolExtensions';
import { GlobalStore } from '../../store/reducers/interface';

const useActions = {
  asyncHideTool: asyncHideTool.started,
  asyncRunExtension: asyncRunExtension.started,
  asyncChangeAccount: asyncChangeAccount.started,
  asyncCreateDocument: asyncCreateDocument.started,
  updateTitle,
  selectRepository: selectRepository,
  push,
};

const Option = Select.Option;

const mapStateToProps = ({
  clipper: {
    currentAccountId,
    title,
    url,
    creatingDocument,
    currentRepository,
    repositories,
    loadingRepositories,
    currentImageHostingService,
  },
  userPreference: { accounts, extensions },
  router: {
    location: { pathname },
  },
}: GlobalStore) => {
  const currentAccount = accounts.find(o => o.id === currentAccountId);
  const usePlugin = pathname.startsWith('/plugins');
  const disableCreateDocument = !usePlugin || creatingDocument;
  return {
    accounts,
    extensions,
    currentImageHostingService,
    url,
    pathname,
    creatingDocument,
    loadingRepositories,
    currentAccountId,
    title,
    currentRepository,
    currentAccount,
    repositories,
    usePlugin,
    disableCreateDocument,
  };
};
type PageStateProps = ReturnType<typeof mapStateToProps>;
type PageDispatchProps = typeof useActions;
type PageOwnProps = {};
type PageProps = PageStateProps & PageDispatchProps & PageOwnProps;
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators<PageDispatchProps, PageDispatchProps>(
    useActions,
    dispatch
  );

class Page extends React.Component<PageProps> {
  shouldComponentUpdate = (nextProps: PageProps) => {
    const selector = ({
      creatingDocument,
      repositories,
      currentAccount,
      currentRepository,
      loadingRepositories,
      title,
      pathname,
    }: PageProps) => {
      return {
        currentRepository,
        creatingDocument,
        loadingRepositories,
        repositories,
        currentAccount,
        title,
        pathname,
      };
    };
    if (!isEqual(selector(nextProps), selector(this.props))) {
      return true;
    }
    return false;
  };

  onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateTitle({
      title: e.target.value,
    });
  };

  onRepositorySelect = (repositoryId: string) => {
    this.props.selectRepository({ repositoryId });
  };

  onFilterOption = (select: any, option: React.ReactElement<any>) => {
    const title: string = option.props.children;
    return title.indexOf(select) !== -1;
  };

  handleCreateDocument = () => this.props.asyncCreateDocument();

  render() {
    const {
      creatingDocument,
      title,
      repositories,
      currentAccount,
      currentRepository,
      loadingRepositories,
      extensions,
      url,
      pathname,
      disableCreateDocument,
      currentImageHostingService,
    } = this.props;

    let repositoryId;
    if (
      currentAccount &&
      repositories.some(o => o.id === currentAccount.defaultRepositoryId)
    ) {
      repositoryId = currentAccount.defaultRepositoryId;
    }

    if (currentRepository) {
      repositoryId = currentRepository.id;
    }

    const enableExtensions: SerializedExtensionWithId[] = extensions.filter(
      (o: SerializedExtensionWithId) => {
        if (o.init) {
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const context: InitContext = {
            accountInfo: {
              type: currentAccount && currentAccount.type,
            },
            url,
            pathname,
            currentImageHostingService,
          };
          // eslint-disable-next-line no-eval
          return eval(o.init);
        }
        return true;
      }
    );

    const toolExtensions: SerializedExtensionWithId[] = enableExtensions.filter(
      o => o.type === ExtensionType.Tool
    );

    const clipExtensions: SerializedExtensionWithId[] = enableExtensions.filter(
      o => o.type !== ExtensionType.Tool
    );

    return (
      <ToolContainer
        onClickCloseButton={() => {
          this.props.asyncHideTool();
        }}
      >
        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>笔记标题</h1>
          <Input value={title} onChange={this.onTitleChange} />
          <Button
            className={styles.saveButton}
            style={{ marginTop: 16 }}
            size="large"
            type="primary"
            loading={creatingDocument}
            disabled={disableCreateDocument}
            onClick={this.handleCreateDocument}
            block
          >
            保存内容
          </Button>
        </section>
        <ToolExtensions
          extensions={toolExtensions}
          onClick={extension => this.props.asyncRunExtension({ extension })}
        />
        <ClipExtensions
          extensions={clipExtensions}
          onClick={router => this.props.push(router)}
          pathname={pathname}
        />
        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>保存的知识库</h1>
          <Select
            loading={loadingRepositories}
            disabled={loadingRepositories}
            onSelect={this.onRepositorySelect}
            style={{ width: '100%' }}
            showSearch
            optionFilterProp="children"
            filterOption={this.onFilterOption}
            dropdownMatchSelectWidth={true}
            value={repositoryId}
          >
            {repositories.map(o => {
              return (
                <Option key={o.id.toString()} value={o.id}>
                  {o.name}
                </Option>
              );
            })}
          </Select>
        </section>
        <section className={`${styles.toolbar} ${styles.sectionLine}`}>
          <Button
            className={`${styles.toolbarButton} `}
            onClick={() => {
              if (pathname === '/preference') {
                this.props.push('/');
              } else {
                this.props.push('/preference');
              }
            }}
          >
            <Icon type="setting" />
          </Button>
          <Select
            value={this.props.currentAccountId}
            style={{ width: '75px' }}
            onSelect={value => {
              this.props.asyncChangeAccount({ id: value });
            }}
          >
            {this.props.accounts.map(o => (
              <Select.Option key={o.id || '1'}>
                <Avatar size="small" src={o.avatar} />
              </Select.Option>
            ))}
          </Select>
        </section>
      </ToolContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page as React.ComponentType<PageProps>);
