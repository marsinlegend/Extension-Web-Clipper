import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ExtensionType } from '../../extensions/interface';
import TextEditor from './TextEditor';
import ImageEditor from './ImageEditor';
import { GlobalStore } from '../../store/reducers/interface';

const useActions = {};

const mapStateToProps = ({ userPreference: { extensions }, routing }: GlobalStore) => {
  return { extensions, routing };
};
type PageProps = ReturnType<typeof mapStateToProps> & typeof useActions;

const ClipperPluginPage: React.FC<PageProps> = props => {
  const { pathname } = props.routing.location;

  const extension = props.extensions.find(o => `/plugins/${o.id}` === pathname);

  if (!extension) {
    return <div />;
  }
  if (extension.type === ExtensionType.Text) {
    return <TextEditor extension={extension} pathname={pathname} />;
  }
  if (extension.type === ExtensionType.Image) {
    return <ImageEditor extension={extension} pathname={pathname} />;
  }
  return <div />;
};

export default connect(
  mapStateToProps,
  (dispatch: Dispatch) =>
    bindActionCreators<typeof useActions, typeof useActions>(useActions, dispatch)
)(ClipperPluginPage);
