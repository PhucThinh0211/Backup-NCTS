import { createSelector } from '@reduxjs/toolkit';

import { defaultPagingParams } from '@/common/define';
import { RootState } from '@/store/types';

export const getContentState = (state: RootState) => state.content;

export function getSelectedContent() {
  return createSelector([getContentState], (state) => state.selectedContent);
}

export function getContents() {
  return createSelector([getContentState], (state) => state.contents);
}
export function getContentMenus() {
  return createSelector([getContentState], (state) => state.menus);
}

export function getContentQueryParams() {
  return createSelector(
    [getContentState],
    (state) => state.queryParams || defaultPagingParams
  );
}
export function getContentPhotoUrl() {
  return createSelector([getContentState], (state) => state.contentPhotoUrl);
}
export function getSelectedContentDetail() {
  return createSelector(
    [getContentState],
    (state) => state.selectedContentDetail
  );
}
