import { createSelector } from '@reduxjs/toolkit';

import { defaultPagingParams } from '@/common/define';
import { RootState } from '@/store/types';

export const getBannerState = (state: RootState) => state.banner;

export function getSelectedBanner() {
  return createSelector([getBannerState], (state) => state.selectedBanner);
}

export function getBanners() {
  return createSelector([getBannerState], (state) => state.banners);
}

export function getBannerQueryParams() {
  return createSelector(
    [getBannerState],
    (state) => state.queryParams || defaultPagingParams
  );
}
