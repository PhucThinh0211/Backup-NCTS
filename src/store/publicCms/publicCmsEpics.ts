import { catchError, concat, filter, switchMap } from 'rxjs';
import { RootEpic } from '../types';
import { publicCmsActions } from './publicCmsSlice';
import { startLoading, stopLoading } from '../loading';
import {
  GettingBannerListLoadingKey,
  GettingCaptchaLoadingKey,
  GettingCompanyLoadingKey,
  GettingMenuListLoadingKey,
} from '@/common';
import { PublicCmsService } from '@/services/PublicCmsService';
import Utils from '@/utils';

const getCompanyRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(publicCmsActions.getCompanyRequest.match),
    switchMap(() => {
      return concat(
        [startLoading({ key: GettingCompanyLoadingKey, type: 'top' })],
        PublicCmsService.Get.getCompany().pipe(
          switchMap((company) => {
            return [publicCmsActions.setCompany(company)];
          }),
          catchError(() => {
            return [publicCmsActions.setCompany(undefined)];
          })
        ),
        [stopLoading({ key: GettingCompanyLoadingKey })]
      );
    })
  );
};

const getMenuListRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(publicCmsActions.getMenuListRequest.match),
    switchMap(() => {
      return concat(
        [startLoading({ key: GettingMenuListLoadingKey, type: 'top' })],
        PublicCmsService.Get.getMenuList().pipe(
          switchMap((menus) => {
            return [publicCmsActions.setMenuList(menus)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [publicCmsActions.setMenuList(undefined)];
          })
        ),
        [stopLoading({ key: GettingMenuListLoadingKey })]
      );
    })
  );
};

const getBannerListRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(publicCmsActions.getBannerListRequest.match),
    switchMap((action) => {
      const { params } = action.payload;
      const search = {
        ...params,
      };
      return concat(
        [startLoading({ key: GettingBannerListLoadingKey, type: 'top' })],
        PublicCmsService.Get.getBannerList({ search }).pipe(
          switchMap((banners) => {
            return [publicCmsActions.setBannerList(banners)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [publicCmsActions.setBannerList([])];
          })
        ),
        [stopLoading({ key: GettingBannerListLoadingKey })]
      );
    })
  );
};

const getCaptchaRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(publicCmsActions.getCaptchaRequest.match),
    switchMap(() => {
      return concat(
        [startLoading({ key: GettingCaptchaLoadingKey })],
        PublicCmsService.Get.getCaptcha().pipe(
          switchMap((captcha) => {
            return [publicCmsActions.setCaptcha(captcha)];
          }),
          catchError(() => {
            return [publicCmsActions.setCaptcha(undefined)];
          })
        ),
        [stopLoading({ key: GettingCaptchaLoadingKey })]
      );
    })
  );
};

export const publicCmsEpics = [
  getMenuListRequest$,
  getCompanyRequest$,
  getBannerListRequest$,
  getCaptchaRequest$
];
