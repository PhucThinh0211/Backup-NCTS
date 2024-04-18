import {
  catchError,
  concat,
  filter,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs';

import { contentActions } from './contentSlice';
import { startLoading, stopLoading } from '../loading';
import { RootEpic } from '../types';
import { defaultPagingParams } from '@/common/define';
import {
  GettingContentListLoadingKey,
  RemovingContentLoadingKey,
  SavingContentLoadingKey,
  GettingContentLoadingKey,
} from '@/common/loadingKey';
import { ContentService } from '@/services/ContentService';
import Utils from '@/utils';

const getContentsRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(contentActions.getContentsRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { params } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.content.queryParams,
        ...params,
      };

      return concat(
        [startLoading({ key: GettingContentListLoadingKey })],
        ContentService.Get.getAllContents({
          search,
        }).pipe(
          mergeMap((contents) => {
            return [
              contentActions.setQueryParams(search),
              contentActions.setContents(contents),
            ];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [contentActions.setContents(undefined)];
          })
        ),
        [stopLoading({ key: GettingContentListLoadingKey })]
      );
    })
  );
};

const createContentRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(contentActions.createContentRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { content } = action.payload;
      const { locale } = state.persistApp;
      const totalCount = state.menu.menus?.totalCount || 0;
      const search = {
        ...defaultPagingParams,
        ...state.content.queryParams,
      };
      return concat(
        [startLoading({ key: SavingContentLoadingKey })],
        ContentService.Post.createContent({
          ...content,
          sortSeq: totalCount + 1,
        }).pipe(
          switchMap((createdContent) => {
            const createTranslationInput = {
              language: locale,
              title: createdContent.title,
              description: createdContent.description,
              body: createdContent.body,
            };
            return ContentService.Post.createContentTranslations(
              createdContent.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return ContentService.Get.getAllContents({
                  search,
                }).pipe(
                  mergeMap((contentsResult) => {
                    Utils.successNotification();
                    return [
                      contentActions.setContents(contentsResult),
                      contentActions.setSelectedContent(undefined),
                    ];
                  }),
                  catchError((errors) => {
                    Utils.errorHandling(errors);
                    return [contentActions.setContents(undefined)];
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
        [stopLoading({ key: SavingContentLoadingKey })]
      );
    })
  );
};

const updateContentRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(contentActions.updateContentRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { contentId, content } = action.payload;
      const { locale } = state.persistApp;
      const search = {
        ...defaultPagingParams,
        ...state.content.queryParams,
      };
      return concat(
        [startLoading({ key: SavingContentLoadingKey })],
        ContentService.Put.updateContent(contentId, content).pipe(
          switchMap((updatedContent) => {
            const createTranslationInput = {
              language: locale,
              title: content.title,
              description: content.description,
              body: content.body,
            };
            return ContentService.Post.createContentTranslations(
              updatedContent.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return ContentService.Get.getAllContents({
                  search,
                }).pipe(
                  mergeMap((contentsResult) => {
                    Utils.successNotification();
                    return [contentActions.setContents(contentsResult)];
                  }),
                  catchError((errors) => {
                    Utils.errorHandling(errors);
                    return [contentActions.setContents(undefined)];
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
        [stopLoading({ key: SavingContentLoadingKey })]
      );
    })
  );
};

const removeContentRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(contentActions.removeContentRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { contentId } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.content.queryParams,
        page: 1,
      };
      return concat(
        [startLoading({ key: RemovingContentLoadingKey })],
        ContentService.delete.removeContent(contentId).pipe(
          switchMap(() => {
            return ContentService.Get.getAllContents({
              search,
            }).pipe(
              mergeMap((contentsResult) => {
                Utils.successNotification('Removed successfully');
                return [
                  contentActions.setContents(contentsResult),
                  contentActions.setSelectedContent(undefined),
                ];
              }),
              catchError((errors) => {
                Utils.errorHandling(errors);
                return [contentActions.setContents(undefined)];
              })
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: RemovingContentLoadingKey })]
      );
    })
  );
};

const getContentRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(contentActions.getContentRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { contentId } = action.payload;
      const { locale } = state.persistApp;
      const options = {
        headers: {
          'Accept-Language': locale || 'vi',
        },
      };
      return concat(
        [startLoading({ key: GettingContentLoadingKey })],
        ContentService.Get.getContentById(contentId, options).pipe(
          mergeMap((content) => {
            return [contentActions.setSelectedContentDetail(content)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: GettingContentLoadingKey })]
      );
    })
  );
};

export const contentEpics = [
  getContentsRequest$,
  createContentRequest$,
  updateContentRequest$,
  removeContentRequest$,
  getContentRequest$,
];
