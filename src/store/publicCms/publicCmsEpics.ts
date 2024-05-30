import { catchError, concat, filter, switchMap } from 'rxjs';

import { RootEpic } from '../types';
import { publicCmsActions } from './publicCmsSlice';
import { startLoading, stopLoading } from '../loading';
import {
  GettingBannerListLoadingKey,
  GettingCaptchaLoadingKey,
  GettingCompanyLoadingKey,
  GettingContentListLoadingKey,
  GettingIntroducePageLoadingKey,
  GettingMenuListLoadingKey,
  GettingNewsTypeListLoadingKey,
  GettingPageDetailBySlugLoadingKey,
  GettingServicePagesLoadingKey,
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

const getNewsListRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(publicCmsActions.getNewsListRequest.match),
    switchMap((action) => {
      const { params } = action.payload;
      const search = {
        ...params,
      };
      return concat(
        [startLoading({ key: GettingContentListLoadingKey, type: 'top' })],
        PublicCmsService.Get.getNewsList({ search }).pipe(
          switchMap((news) => {
            return [publicCmsActions.setNewsList(news)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [publicCmsActions.setNewsList(undefined)];
          })
        ),
        [stopLoading({ key: GettingContentListLoadingKey })]
      );
    })
  );
};

const getNewsTypesRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(publicCmsActions.getNewsTypesRequest.match),
    switchMap((action) => {
      const { params } = action.payload;
      const search = {
        ...params,
      };
      return concat(
        [startLoading({ key: GettingNewsTypeListLoadingKey, type: 'top' })],
        PublicCmsService.Get.getNewsTypeList({ search }).pipe(
          switchMap((newsTypes) => {
            return [publicCmsActions.setNewsTypes(newsTypes)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [publicCmsActions.setNewsTypes(undefined)];
          })
        ),
        [stopLoading({ key: GettingNewsTypeListLoadingKey })]
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

const getServicePagesRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(publicCmsActions.getServicePagesRequest.match),
    switchMap(() => {
      return concat(
        [startLoading({ key: GettingServicePagesLoadingKey, type: 'top' })],
        PublicCmsService.Get.getServicePages().pipe(
          switchMap((pages) => {
            return [publicCmsActions.setServicePages(pages)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [publicCmsActions.setServicePages([])];
          })
        ),
        [stopLoading({ key: GettingServicePagesLoadingKey })]
      );
    })
  );
};

const getIntroducePageRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(publicCmsActions.getIntroducePageRequest.match),
    switchMap(() => {
      return concat(
        [startLoading({ key: GettingIntroducePageLoadingKey, type: 'top' })],
        PublicCmsService.Get.getIntroducePage().pipe(
          switchMap((pages) => {
            return [publicCmsActions.setIntroducePage(pages)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [publicCmsActions.setIntroducePage(undefined)];
          })
        ),
        [stopLoading({ key: GettingIntroducePageLoadingKey })]
      );
    })
  );
};

const getPageDetailBySlugRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(publicCmsActions.getPageDetailBySlugRequest.match),
    switchMap((action) => {
      return concat(
        [startLoading({ key: GettingPageDetailBySlugLoadingKey, type: 'top' })],
        PublicCmsService.Get.getPageDetailBySlug(action.payload).pipe(
          switchMap((page) => {
            return [publicCmsActions.setSelectedPageDetail(page)];
          }),
          catchError(() => {
            return [publicCmsActions.setSelectedPageDetail(undefined)];
          })
        ),
        [stopLoading({ key: GettingPageDetailBySlugLoadingKey })]
      );
    })
  );
};

export const publicCmsEpics = [
  getMenuListRequest$,
  getCompanyRequest$,
  getBannerListRequest$,
  getCaptchaRequest$,
  getNewsListRequest$,
  getNewsTypesRequest$,
  getServicePagesRequest$,
  getIntroducePageRequest$,
  getPageDetailBySlugRequest$
];
