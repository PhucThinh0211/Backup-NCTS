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
  GettingNewsTypeListLoadingKey,
  PublishPageContentLoadingKey,
  GettingMenuListLoadingKey,
  GettingDocumentTypeListLoadingKey,
} from '@/common/loadingKey';
import { PageContentService } from '@/services/PageContentService';
import Utils from '@/utils';
import { SeoService } from '@/services/SEOService';
import { NewsTypeService } from '@/services/NewsTypeService';
import { MenuService } from '@/services/MenuService';
import { DocumentTypeService } from '@/services/DocumentTypeService';

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
            const createTranslationInput = {
              language: locale,
              title: createdPageContent.title,
              description: createdPageContent.description,
              content: createdPageContent.content,
              tags: createdPageContent.tags,
            };
            return PageContentService.Post.createPageContentTranslations(
              createdPageContent.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
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
                          return [pageContentActions.setPageContents(pageContentsResult), pageContentActions.setSelectedPageContent(createdPageContent)];
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
                      pageContentActions.setSelectedPageContent(createdPageContent),
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
            );
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
            const createTranslationInput = {
              language: locale,
              title: pageContent.title,
              description: pageContent.description,
              content: pageContent.content || null,
              tags: pageContent.tags || null,
            };
            return PageContentService.Post.createPageContentTranslations(
              updatedPageContent.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
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
const getNewsTypesRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(pageContentActions.getNewsTypesRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { params } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...params,
      };
      return concat(
        [startLoading({ key: GettingNewsTypeListLoadingKey })],
        NewsTypeService.Get.getAllNewsTypes({
          search,
        }).pipe(
          mergeMap((newsTypes) => {
            return [
              pageContentActions.setNewsTypes(newsTypes),
            ];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [pageContentActions.setNewsTypes(undefined)];
          })
        ),
        [stopLoading({ key: GettingNewsTypeListLoadingKey })]
      );
    })
  );
};
const publishPageRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(pageContentActions.publishPageRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { locale } = state.persistApp;
      const options = {
        headers: {
          'Accept-Language': locale || 'vi',
        }
      };
      const search = {
        ...defaultPagingParams,
        ...state.pageContent.queryParams
      }
      return concat(
        [startLoading({ key: PublishPageContentLoadingKey })],
        PageContentService.Post.publishPage(action.payload, options).pipe(
          switchMap(publishedPage => {
            return PageContentService.Get.getAllPageContents({
              search,
            }).pipe(
              mergeMap((pageContentsResult) => {
                Utils.successNotification();
                return [
                  pageContentActions.setPageContents(pageContentsResult),
                  pageContentActions.setSelectedPageContent(publishedPage),
                ];
              }),
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: PublishPageContentLoadingKey })]
      );
    })
  );
}
const unpublishPageRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(pageContentActions.unpublishPageRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { locale } = state.persistApp;
      const options = {
        headers: {
          'Accept-Language': locale || 'vi',
        }
      };
      const search = {
        ...defaultPagingParams,
        ...state.pageContent.queryParams
      }
      return concat(
        [startLoading({ key: PublishPageContentLoadingKey })],
        PageContentService.Post.unpublishPage(action.payload, options).pipe(
          switchMap(publishedPage => {
            return PageContentService.Get.getAllPageContents({
              search,
            }).pipe(
              mergeMap((pageContentsResult) => {
                Utils.successNotification();
                return [
                  pageContentActions.setPageContents(pageContentsResult),
                  pageContentActions.setSelectedPageContent(publishedPage),
                ];
              }),
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: PublishPageContentLoadingKey })]
      );
    })
  );
}

const getMenusRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(pageContentActions.getMenusRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { params } = action.payload;
      const search = {
        ...params,
      };
      return concat(
        [startLoading({ key: GettingMenuListLoadingKey })],
        MenuService.Get.getAllMenus({
          search,
        }).pipe(
          mergeMap((menus) => {
            return [pageContentActions.setMenus(menus)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [pageContentActions.setMenus(undefined)];
          })
        ),
        [stopLoading({ key: GettingMenuListLoadingKey })]
      );
    })
  );
};
const getDocumentTypesRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(pageContentActions.getDocumentTypesRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { params } = action.payload;
      const search = {
        ...params,
      };
      return concat(
        [startLoading({ key: GettingDocumentTypeListLoadingKey })],
        DocumentTypeService.Get.getAllDocumentTypes({
          search,
        }).pipe(
          mergeMap((documentTypes) => {
            return [pageContentActions.setDocumentTypes(documentTypes)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [pageContentActions.setDocumentTypes(undefined)];
          })
        ),
        [stopLoading({ key: GettingDocumentTypeListLoadingKey })]
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
  getNewsTypesRequest$,
  publishPageRequest$,
  unpublishPageRequest$,
  getMenusRequest$,
  getDocumentTypesRequest$,
];
