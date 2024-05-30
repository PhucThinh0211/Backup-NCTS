import {
  catchError,
  concat,
  filter,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs';

import { documentTypeActions } from './documentTypeSlice';
import { startLoading, stopLoading } from '../loading';
import { RootEpic } from '../types';
import { defaultPagingParams } from '@/common/define';
import {
  GettingDocumentTypeListLoadingKey,
  RemovingDocumentTypeLoadingKey,
  SavingDocumentTypeLoadingKey,
  GettingDocumentTypeLoadingKey,
} from '@/common/loadingKey';
import { DocumentTypeService } from '@/services/DocumentTypeService';
import Utils from '@/utils';

const getDocumentTypesRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(documentTypeActions.getDocumentTypesRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { params } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.documentType.queryParams,
        ...params,
      };
      return concat(
        [startLoading({ key: GettingDocumentTypeListLoadingKey })],
        DocumentTypeService.Get.getAllDocumentTypes({
          search,
        }).pipe(
          mergeMap((documentTypes) => {
            return [
              documentTypeActions.setQueryParams(search),
              documentTypeActions.setDocumentTypes(documentTypes),
            ];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [documentTypeActions.setDocumentTypes(undefined)];
          })
        ),
        [stopLoading({ key: GettingDocumentTypeListLoadingKey })]
      );
    })
  );
};

const createDocumentTypeRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(documentTypeActions.createDocumentTypeRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { documentType } = action.payload;
      const { locale } = state.persistApp;
      const totalCount = state.menu.menus?.totalCount || 0;
      const search = {
        ...defaultPagingParams,
        ...state.documentType.queryParams,
      };
      return concat(
        [startLoading({ key: SavingDocumentTypeLoadingKey })],
        DocumentTypeService.Post.createDocumentType({
          ...documentType,
          sortSeq: totalCount + 1,
        }).pipe(
          switchMap((createdDocumentType) => {
            const createTranslationInput = {
              language: locale,
              name: createdDocumentType.name,
            };
            return DocumentTypeService.Post.createDocumentTypeTranslations(
              createdDocumentType.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return DocumentTypeService.Get.getAllDocumentTypes({
                  search,
                }).pipe(
                  mergeMap((documentTypesResult) => {
                    Utils.successNotification();
                    return [
                      documentTypeActions.setDocumentTypes(documentTypesResult),
                      documentTypeActions.setSelectedDocumentType(createdDocumentType),
                    ];
                  }),
                  catchError((errors) => {
                    Utils.errorHandling(errors);
                    return [documentTypeActions.setDocumentTypes(undefined)];
                  })
                );
              }),
              catchError((errors) => {
                Utils.errorHandling(errors);
                return [];
              })
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: SavingDocumentTypeLoadingKey })]
      );
    })
  );
};

const updateDocumentTypeRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(documentTypeActions.updateDocumentTypeRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { documentTypeId, documentType } = action.payload;
      const { locale } = state.persistApp;
      const search = {
        ...defaultPagingParams,
        ...state.documentType.queryParams,
      };
      return concat(
        [startLoading({ key: SavingDocumentTypeLoadingKey })],
        DocumentTypeService.Put.updateDocumentType(
          documentTypeId,
          documentType
        ).pipe(
          switchMap((updatedDocumentType) => {
            const createTranslationInput = {
              language: locale,
              name: documentType.name,
            };
            return DocumentTypeService.Post.createDocumentTypeTranslations(
              updatedDocumentType.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return DocumentTypeService.Get.getAllDocumentTypes({
                  search,
                }).pipe(
                  mergeMap((documentTypesResult) => {
                    Utils.successNotification();
                    return [
                      documentTypeActions.setDocumentTypes(documentTypesResult),
                    ];
                  }),
                  catchError((errors) => {
                    Utils.errorHandling(errors);
                    return [documentTypeActions.setDocumentTypes(undefined)];
                  })
                );
              }),
              catchError((errors) => {
                Utils.errorHandling(errors);
                return [];
              })
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: SavingDocumentTypeLoadingKey })]
      );
    })
  );
};

const removeDocumentTypeRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(documentTypeActions.removeDocumentTypeRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { documentTypeId } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.documentType.queryParams,
        page: 1,
      };
      return concat(
        [startLoading({ key: RemovingDocumentTypeLoadingKey })],
        DocumentTypeService.delete.removeDocumentType(documentTypeId).pipe(
          switchMap(() => {
            return DocumentTypeService.Get.getAllDocumentTypes({
              search,
            }).pipe(
              mergeMap((documentTypesResult) => {
                Utils.successNotification('Removed successfully');
                return [
                  documentTypeActions.setDocumentTypes(documentTypesResult),
                  documentTypeActions.setSelectedDocumentType(undefined),
                ];
              }),
              catchError((errors) => {
                Utils.errorHandling(errors);
                return [documentTypeActions.setDocumentTypes(undefined)];
              })
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: RemovingDocumentTypeLoadingKey })]
      );
    })
  );
};

const getDocumentTypeRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(documentTypeActions.getDocumentTypeRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { documentTypeId } = action.payload;
      const { locale } = state.persistApp;
      const options = {
        headers: {
          'Accept-Language': locale || 'vi',
        },
      };
      return concat(
        [startLoading({ key: GettingDocumentTypeLoadingKey })],
        DocumentTypeService.Get.getDocumentTypeById(
          documentTypeId,
          options
        ).pipe(
          mergeMap((documentType) => {
            return [
              documentTypeActions.setSelectedDocumentTypeDetail(documentType),
            ];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: GettingDocumentTypeLoadingKey })]
      );
    })
  );
};

export const documentTypeEpics = [
  getDocumentTypesRequest$,
  createDocumentTypeRequest$,
  updateDocumentTypeRequest$,
  removeDocumentTypeRequest$,
  getDocumentTypeRequest$,
];
