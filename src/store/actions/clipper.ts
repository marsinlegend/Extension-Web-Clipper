import { Repository } from './../../common/backend/index';
import { CLIPPER } from './actionTypes';
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const asyncFetchRepository = actionCreator.async<
  void,
  {
    repositories: Repository[];
  },
  void
>(CLIPPER.ASYNC_FETCH_REPOSITORY);

export const updateTitle = actionCreator<{ title: string }>(
  CLIPPER.UPDATE_TITLE
);

export const asyncCreateDocument = actionCreator.async<
  void,
  {
    documentHref: string;
    repositoryId: string;
    documentId: string;
  },
  null
>(CLIPPER.ASYNC_CREATE_DOCUMENT);

export const asyncUploadImage = actionCreator.async<void, void, void>(
  CLIPPER.ASYNC_UPLOAD_IMAGE
);

export const selectRepository = actionCreator<{ repositoryId: string }>(
  CLIPPER.SELECT_REPOSITORY
);

export const initTabInfo = actionCreator<{ title: string; url: string }>(
  CLIPPER.INIT_TAB_INFO
);

export const asyncChangeAccount = actionCreator.async<
  {
    id: string;
  },
  {
    repositories: Repository[];
  },
  any
>(CLIPPER.ASYNC_CHANGE_ACCOUNT);

export const changeData = actionCreator<{ data: any; pathName: string }>(
  CLIPPER.CHANGE_DATA
);
