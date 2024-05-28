import { createSelector } from '@reduxjs/toolkit';

import { defaultPagingParams } from '@/common/define';
import { RootState } from '@/store/types';

export const getPageContentState = (state: RootState) => state.pageContent;

export function getSelectedPageContent() {
  return createSelector(
    [getPageContentState],
    (state) => state.selectedPageContent
  );
}

export function getPageContents() {
  return createSelector([getPageContentState], (state) => state.pageContents);
}

export function getPageContentQueryParams() {
  return createSelector(
    [getPageContentState],
    (state) => state.queryParams || defaultPagingParams
  );
}

export function getSelectedPageContentDetail() {
  return createSelector(
    [getPageContentState],
    (state) => state.selectedPageContentDetail
  );
}

export function getNewsTypes() {
  return createSelector([getPageContentState], (state) => state.newsTypes);
}
export function getPagePhotoUrl() {
  return createSelector([getPageContentState], (state) => state.pagePhotoUrl);
}
