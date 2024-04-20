import {
  catchError,
  concat,
  filter,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs';

import { pageContentActions } from './pageContentSlice';
import { startLoading, stopLoading } from '../loading';
import { RootEpic } from '../types';
import { defaultPagingParams } from '@/common/define';
import {
  GettingPageContentListLoadingKey,
  RemovingPageContentLoadingKey,
  SavingPageContentLoadingKey,
  GettingPageContentLoadingKey,
} from '@/common/loadingKey';
import { PageContentService } from '@/services/PageContentService';
import Utils from '@/utils';
import { SeoService } from '@/services/SEOService';

const getPageContentsRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(pageContentActions.getPageContentsRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { params } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.pageContent.queryParams,
        ...params,
      };

      return concat(
        [startLoading({ key: GettingPageContentListLoadingKey })],
        PageContentService.Get.getAllPageContents({
          search,
        }).pipe(
          mergeMap((pageContents) => {
            return [
              pageContentActions.setQueryParams(search),
              pageContentActions.setPageContents(pageContents),
            ];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [pageContentActions.setPageContents(undefined)];
          })
        ),
        [stopLoading({ key: GettingPageContentListLoadingKey })]
      );
    })
  );
};

const createPageContentRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(pageContentActions.createPageContentRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { pageContent } = action.payload;
      const { locale } = state.persistApp;
      const search = {
        ...defaultPagingParams,
        ...state.pageContent.queryParams,
      };
      return concat(
        [startLoading({ key: SavingPageContentLoadingKey })],
        PageContentService.Post.createPageContent({
          ...pageContent,
        }).pipe(
          switchMap((createdPageContent) => {
            // const createTranslationInput = {
            //   language: locale,
            //   title: createdPageContent.title,
            //   description: createdPageContent.description,
            //   body: createdPageContent.body,
            // };
            // return PageContentService.Post.createPageContentTranslations(
            //   createdPageContent.id,
            //   createTranslationInput
            // ).pipe(
            //   mergeMap(() => {
                if (pageContent.seo) {
                  const createSeoTranslationInput = {
                    title: pageContent.seo.title,
                    description: pageContent.seo.description,
                    language: locale,
                  }
                  return SeoService.Post.createSeoTranslations(
                    createdPageContent.seoId, 
                    createSeoTranslationInput
                  ).pipe(
                    mergeMap(() => {
                      return PageContentService.Get.getAllPageContents({
                        search,
                      }).pipe(
                        mergeMap((pageContentsResult) => {
                          Utils.successNotification();
                          return [pageContentActions.setPageContents(pageContentsResult)];
                        }),
                        catchError((errors) => {
                          Utils.errorHandling(errors);
                          return [pageContentActions.setPageContents(undefined)];
                        })
                      );
                    }),
                    catchError((errors) => {
                      Utils.errorHandling(errors);
                      return [];
                    })
                  );
                }
                return PageContentService.Get.getAllPageContents({
                  search,
                }).pipe(
                  mergeMap((pageContentsResult) => {
                    Utils.successNotification();
                    return [
                      pageContentActions.setPageContents(pageContentsResult),
                      pageContentActions.setSelectedPageContent(undefined),
                    ];
                  }),
                  catchError((errors) => {
                    Utils.errorHandling(errors);
                    return [pageContentActions.setPageContents(undefined)];
                  })
                );
            //   }),
            //   catchError((errors) => {
            //     Utils.errorHandling(errors);
            //     return [];
            //   })
            // );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: SavingPageContentLoadingKey })]
      );
    })
  );
};

const updatePageContentRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(pageContentActions.updatePageContentRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { pageContentId, pageContent } = action.payload;
      const { locale } = state.persistApp;
      const search = {
        ...defaultPagingParams,
        ...state.pageContent.queryParams,
      };
      return concat(
        [startLoading({ key: SavingPageContentLoadingKey })],
        PageContentService.Put.updatePageContent(pageContentId, pageContent).pipe(
          switchMap((updatedPageContent) => {
            // const createTranslationInput = {
            //   language: locale,
            //   title: pageContent.title,
            //   description: pageContent.description,
            //   body: pageContent.body,
            // };
            // return PageContentService.Post.createPageContentTranslations(
            //   updatedPageContent.id,
            //   createTranslationInput
            // ).pipe(
            //   mergeMap(() => {
                if (pageContent.seo) {
                  const createSeoTranslationInput = {
                    title: pageContent.seo.title,
                    description: pageContent.seo.description,
                    language: locale,
                  }
                  return SeoService.Post.createSeoTranslations(
                    updatedPageContent.seoId, 
                    createSeoTranslationInput
                  ).pipe(
                    mergeMap(() => {
                      return PageContentService.Get.getAllPageContents({
                        search,
                      }).pipe(
                        mergeMap((pageContentsResult) => {
                          Utils.successNotification();
                          return [pageContentActions.setPageContents(pageContentsResult)];
                        }),
                        catchError((errors) => {
                          Utils.errorHandling(errors);
                          return [pageContentActions.setPageContents(undefined)];
                        })
                      );
                    }),
                    catchError((errors) => {
                      Utils.errorHandling(errors);
                      return [];
                    })
                  );
                }
                return PageContentService.Get.getAllPageContents({
                  search,
                }).pipe(
                  mergeMap((pageContentsResult) => {
                    Utils.successNotification();
                    return [pageContentActions.setPageContents(pageContentsResult)];
                  }),
                  catchError((errors) => {
                    Utils.errorHandling(errors);
                    return [pageContentActions.setPageContents(undefined)];
                  })
                );
            //   }),
            //   catchError((errors) => {
            //     Utils.errorHandling(errors);
            //     return [];
            //   })
            // );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: SavingPageContentLoadingKey })]
      );
    })
  );
};

const removePageContentRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(pageContentActions.removePageContentRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { pageContentId } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.pageContent.queryParams,
        page: 1,
      };
      return concat(
        [startLoading({ key: RemovingPageContentLoadingKey })],
        PageContentService.delete.removePageContent(pageContentId).pipe(
          switchMap(() => {
            return PageContentService.Get.getAllPageContents({
              search,
            }).pipe(
              mergeMap((pageContentsResult) => {
                Utils.successNotification('Removed successfully');
                return [
                  pageContentActions.setPageContents(pageContentsResult),
                  pageContentActions.setSelectedPageContent(undefined),
                ];
              }),
              catchError((errors) => {
                Utils.errorHandling(errors);
                return [pageContentActions.setPageContents(undefined)];
              })
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: RemovingPageContentLoadingKey })]
      );
    })
  );
};

const getPageContentRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(pageContentActions.getPageContentRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { pageContentId } = action.payload;
      const { locale } = state.persistApp;
      const options = {
        headers: {
          'Accept-Language': locale || 'vi',
        },
      };
      return concat(
        [startLoading({ key: GettingPageContentLoadingKey })],
        PageContentService.Get.getPageContentById(pageContentId, options).pipe(
          mergeMap((pageContent) => {
            return [pageContentActions.setSelectedPageContentDetail(pageContent)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: GettingPageContentLoadingKey })]
      );
    })
  );
};

export const pageContentEpics = [
  getPageContentsRequest$,
  createPageContentRequest$,
  updatePageContentRequest$,
  removePageContentRequest$,
  getPageContentRequest$,
];
