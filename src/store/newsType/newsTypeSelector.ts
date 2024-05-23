import { createSelector } from '@reduxjs/toolkit';

import { defaultPagingParams } from '@/common/define';
import { RootState } from '@/store/types';

export const getNewsTypeState = (state: RootState) => state.newsType;

export function getSelectedNewsType() {
  return createSelector([getNewsTypeState], (state) => state.selectedNewsType);
}

export function getNewsTypes() {
  return createSelector([getNewsTypeState], (state) => state.newsTypes);
}

export function getNewsTypeQueryParams() {
  return createSelector(
    [getNewsTypeState],
    (state) => state.queryParams || defaultPagingParams
  );
}
export function getSelectedNewsTypeDetail() {
  return createSelector(
    [getNewsTypeState],
    (state) => state.selectedNewsTypeDetail
  );
}
