import {
  catchError,
  concat,
  filter,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs';

import { mediaActions } from '.';
import { startLoading, stopLoading } from '../loading';
import { RootEpic } from '../types';
import {
  GettingDocumentTypeListLoadingKey,
  GettingMediaListLoadingKey,
  SavingMediaLoadingKey,
} from '@/common/loadingKey';
import Utils from '@/utils';
import { FileService, FolderResponse } from '@/services/FileService';
import { hideModal } from '../modal';
import {
  CreateUpdateFileModalName,
  CreateUpdateFolderModalName,
  defaultPagingParams,
} from '@/common';
import { DocumentTypeService } from '@/services/DocumentTypeService';

const getFoldersRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(mediaActions.getFoldersRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { params } = action.payload;
      const search = {
        ...params,
      };
      const folderPath = state.media.folderPath;

      return concat(
        [startLoading({ key: GettingMediaListLoadingKey })],
        FileService.Get.getAllFolders({
          search,
        }).pipe(
          mergeMap((folders: FolderResponse[]) => {
            const rootFolder = folders.find((folder) => !folder.parentId);

            const setRootFolderPathActions = !folderPath?.length
              ? [mediaActions.setFolderPath([rootFolder])]
              : [];
            return [
              mediaActions.setFolders(
                (folders || []).map((folder) => ({
                  ...folder,
                  isFolder: true,
                  files: folder.files.map((file) => ({
                    ...file,
                    isFolder: false,
                  })),
                }))
              ),
              ...setRootFolderPathActions,
            ];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [mediaActions.setFolders([])];
          })
        ),
        [stopLoading({ key: GettingMediaListLoadingKey })]
      );
    })
  );
};

const createFolderRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(mediaActions.createFolderRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const inputs = action.payload;
      const search = {
        Type: state.media.mediaType,
      };
      return concat(
        [startLoading({ key: SavingMediaLoadingKey })],
        FileService.Post.createFolder(inputs).pipe(
          mergeMap(() => {
            Utils.successNotification();
            return [
              mediaActions.getFoldersRequest({ params: search }),
              hideModal({ key: CreateUpdateFolderModalName }),
            ];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: SavingMediaLoadingKey })]
      );
    })
  );
};

const uploadFileRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(mediaActions.uploadFileRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { body, params } = action.payload;
      const search = {
        Type: state.media.mediaType,
      };

      return concat(
        [startLoading({ key: SavingMediaLoadingKey })],
        FileService.Post.uploadFile(body, { search: params }).pipe(
          mergeMap(() => {
            Utils.successNotification();
            return [
              mediaActions.getFoldersRequest({ params: search }),
              hideModal({ key: CreateUpdateFileModalName }),
            ];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: SavingMediaLoadingKey })]
      );
    })
  );
};

const getDocumentTypesRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(mediaActions.getDocumentTypesRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { params } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...params,
      };
      return concat(
        [startLoading({ key: GettingDocumentTypeListLoadingKey })],
        DocumentTypeService.Get.getAllDocumentTypes({
          search,
        }).pipe(
          mergeMap((documentTypes) => {
            return [mediaActions.setDocumentTypes(documentTypes)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [mediaActions.setDocumentTypes(undefined)];
          })
        ),
        [stopLoading({ key: GettingDocumentTypeListLoadingKey })]
      );
    })
  );
};

export const mediaEpics = [
  getFoldersRequest$,
  uploadFileRequest$,
  createFolderRequest$,
  getDocumentTypesRequest$,
];
