import {
  catchError,
  concat,
  filter,
  mergeMap,
  switchMap,
  withLatestFrom,
} from "rxjs";

import { newsTypeActions } from "./newsTypeSlice";
import { startLoading, stopLoading } from "../loading";
import { RootEpic } from "../types";
import { defaultPagingParams } from "@/common/define";
import {
  GettingNewsTypeListLoadingKey,
  RemovingNewsTypeLoadingKey,
  SavingNewsTypeLoadingKey,
  GettingNewsTypeLoadingKey,
} from "@/common/loadingKey";
import { NewsTypeService } from "@/services/NewsTypeService";
import Utils from "@/utils";

const getNewsTypesRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(newsTypeActions.getNewsTypesRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { params } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.newsType.queryParams,
        ...params,
      };
      return concat(
        [startLoading({ key: GettingNewsTypeListLoadingKey })],
        NewsTypeService.Get.getAllNewsTypes({
          search,
        }).pipe(
          mergeMap((newsTypes) => {
            return [
              newsTypeActions.setQueryParams(search),
              newsTypeActions.setNewsTypes(newsTypes),
            ];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [newsTypeActions.setNewsTypes(undefined)];
          })
        ),
        [stopLoading({ key: GettingNewsTypeListLoadingKey })]
      );
    })
  );
};

const createNewsTypeRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(newsTypeActions.createNewsTypeRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { newsType } = action.payload;
      const { locale } = state.persistApp;
      const totalCount = state.newsType.newsTypes?.totalCount || 0;
      const search = {
        ...defaultPagingParams,
        ...state.newsType.queryParams,
      };
      return concat(
        [startLoading({ key: SavingNewsTypeLoadingKey })],
        NewsTypeService.Post.createNewsType({
          ...newsType,
          sortSeq: totalCount + 1,
        }).pipe(
          switchMap((createdNewsType) => {
            const createTranslationInput = {
              language: locale,
              name: createdNewsType.name,
            };
            return NewsTypeService.Post.createNewsTypeTranslations(
              createdNewsType.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return NewsTypeService.Get.getAllNewsTypes({
                  search,
                }).pipe(
                  mergeMap((newsTypesResult) => {
                    Utils.successNotification();
                    return [
                      newsTypeActions.setNewsTypes(newsTypesResult),
                      newsTypeActions.setSelectedNewsType(createdNewsType),
                    ];
                  }),
                  catchError((errors) => {
                    Utils.errorHandling(errors);
                    return [newsTypeActions.setNewsTypes(undefined)];
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
        [stopLoading({ key: SavingNewsTypeLoadingKey })]
      );
    })
  );
};

const updateNewsTypeRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(newsTypeActions.updateNewsTypeRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { newsTypeId, newsType } = action.payload;
      const { locale } = state.persistApp;
      const search = {
        ...defaultPagingParams,
        ...state.newsType.queryParams,
      };
      return concat(
        [startLoading({ key: SavingNewsTypeLoadingKey })],
        NewsTypeService.Put.updateNewsType(newsTypeId, newsType).pipe(
          switchMap((updatedNewsType) => {
            const createTranslationInput = {
              language: locale,
              name: newsType.name,
            };
            return NewsTypeService.Post.createNewsTypeTranslations(
              updatedNewsType.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return NewsTypeService.Get.getAllNewsTypes({
                  search,
                }).pipe(
                  mergeMap((newsTypesResult) => {
                    Utils.successNotification();
                    return [newsTypeActions.setNewsTypes(newsTypesResult)];
                  }),
                  catchError((errors) => {
                    Utils.errorHandling(errors);
                    return [newsTypeActions.setNewsTypes(undefined)];
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
        [stopLoading({ key: SavingNewsTypeLoadingKey })]
      );
    })
  );
};

const removeNewsTypeRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(newsTypeActions.removeNewsTypeRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { newsTypeId } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.newsType.queryParams,
        page: 1,
      };
      return concat(
        [startLoading({ key: RemovingNewsTypeLoadingKey })],
        NewsTypeService.delete.removeNewsType(newsTypeId).pipe(
          switchMap(() => {
            return NewsTypeService.Get.getAllNewsTypes({
              search,
            }).pipe(
              mergeMap((newsTypesResult) => {
                Utils.successNotification("Removed successfully");
                return [
                  newsTypeActions.setNewsTypes(newsTypesResult),
                  newsTypeActions.setSelectedNewsType(undefined),
                ];
              }),
              catchError((errors) => {
                Utils.errorHandling(errors);
                return [newsTypeActions.setNewsTypes(undefined)];
              })
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: RemovingNewsTypeLoadingKey })]
      );
    })
  );
};

const getNewsTypeRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(newsTypeActions.getNewsTypeRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { newsTypeId } = action.payload;
      const { locale } = state.persistApp;
      const options = {
        headers: {
          "Accept-Language": locale || "vi",
        },
      };
      return concat(
        [startLoading({ key: GettingNewsTypeLoadingKey })],
        NewsTypeService.Get.getNewsTypeById(newsTypeId, options).pipe(
          mergeMap((newsType) => {
            return [newsTypeActions.setSelectedNewsTypeDetail(newsType)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: GettingNewsTypeLoadingKey })]
      );
    })
  );
};

export const newsTypeEpics = [
  getNewsTypesRequest$,
  createNewsTypeRequest$,
  updateNewsTypeRequest$,
  removeNewsTypeRequest$,
  getNewsTypeRequest$,
];
