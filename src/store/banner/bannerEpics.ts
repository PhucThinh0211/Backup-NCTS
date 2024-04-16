import {
  catchError,
  concat,
  filter,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs';

import { bannerActions } from './bannerSlice';
import { startLoading, stopLoading } from '../loading';
import { RootEpic } from '../types';
import { defaultPagingParams } from '@/common/define';
import {
  GettingBannerListLoadingKey,
  RemovingBannerLoadingKey,
  SavingBannerLoadingKey,
  GettingBannerLoadingKey
} from '@/common/loadingKey';
import { BannerService } from '@/services/BannerService';
import Utils from '@/utils';

const getBannersRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(bannerActions.getBannersRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { params } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.banner.queryParams,
        ...params,
      };
      return concat(
        [startLoading({ key: GettingBannerListLoadingKey })],
        BannerService.Get.getAllBanners({
          search,
        }).pipe(
          mergeMap((banners) => {
            return [
              bannerActions.setQueryParams(search),
              bannerActions.setBanners(banners),
            ];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [bannerActions.setBanners(undefined)];
          })
        ),
        [stopLoading({ key: GettingBannerListLoadingKey })]
      );
    })
  );
};

const createBannerRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(bannerActions.createBannerRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { banner } = action.payload;
      const { locale } = state.persistApp;
      const search = {
        ...defaultPagingParams,
        ...state.banner.queryParams,
      };
      return concat(
        [startLoading({ key: SavingBannerLoadingKey })],
        BannerService.Post.createBanner(banner).pipe(
          switchMap((createdBanner) => {
            const createTranslationInput = {
              language: locale,
              title: createdBanner.title,
              photoUrl: createdBanner.photoUrl,
              description: createdBanner.description,
              buttonLable: createdBanner.buttonLable,
            };
            return BannerService.Post.createBannerTranslations(
              createdBanner.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return BannerService.Get.getAllBanners({
                  search,
                }).pipe(
                  mergeMap((bannersResult) => {
                    Utils.successNotification();
                    return [
                      bannerActions.setBanners(bannersResult),
                      bannerActions.setSelectedBanner(undefined),
                    ];
                  }),
                  catchError((errors) => {
                    Utils.errorHandling(errors);
                    return [bannerActions.setBanners(undefined)];
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
        [stopLoading({ key: SavingBannerLoadingKey })]
      );
    })
  );
};

const updateBannerRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(bannerActions.updateBannerRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { bannerId, banner } = action.payload;
      const { locale } = state.persistApp
      const search = {
        ...defaultPagingParams,
        ...state.banner.queryParams,
      };
      return concat(
        [startLoading({ key: SavingBannerLoadingKey })],
        BannerService.Put.updateBanner(bannerId, banner).pipe(
          switchMap((updatedBanner) => {
            const createTranslationInput = {
              language: locale,
              title: updatedBanner.title,
              photoUrl: updatedBanner.photoUrl,
              description: updatedBanner.description,
              buttonLable: updatedBanner.buttonLable,
            };
            return BannerService.Post.createBannerTranslations(
              updatedBanner.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return BannerService.Get.getAllBanners({
                  search,
                }).pipe(
                  mergeMap((bannersResult) => {
                    Utils.successNotification();
                    return [
                      bannerActions.setBanners(bannersResult),
                      bannerActions.setSelectedBanner(undefined),
                    ];
                  }),
                  catchError((errors) => {
                    Utils.errorHandling(errors);
                    return [bannerActions.setBanners(undefined)];
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
        [stopLoading({ key: SavingBannerLoadingKey })]
      );
    })
  );
};

const removeBannerRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(bannerActions.removeBannerRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { bannerId } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.banner.queryParams,
        page: 1,
      };
      return concat(
        [startLoading({ key: RemovingBannerLoadingKey })],
        BannerService.delete.removeBanner(bannerId).pipe(
          switchMap(() => {
            return BannerService.Get.getAllBanners({
              search,
            }).pipe(
              mergeMap((bannersResult) => {
                Utils.successNotification('Removed successfully');
                return [
                  bannerActions.setBanners(bannersResult),
                  bannerActions.setSelectedBanner(undefined),
                ];
              }),
              catchError((errors) => {
                Utils.errorHandling(errors);
                return [bannerActions.setBanners(undefined)];
              })
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: RemovingBannerLoadingKey })]
      );
    })
  );
};

const getBannerRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(bannerActions.getBannerRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { bannerId } = action.payload;
      const { locale } = state.persistApp;
      const options = {
        headers: {
          'Accept-Language': locale || 'vi',
        },
      };
      return concat(
        [startLoading({ key: GettingBannerLoadingKey })],
        BannerService.Get.getBannerById(bannerId, options).pipe(
          mergeMap((banner) => {
            return [bannerActions.setSelectedBannerDetail(banner)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: GettingBannerLoadingKey })]
      );
    })
  );
};

export const bannerEpics = [
  getBannersRequest$,
  createBannerRequest$,
  updateBannerRequest$,
  removeBannerRequest$,
  getBannerRequest$
];
