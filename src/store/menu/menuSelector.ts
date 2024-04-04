import { createSelector } from '@reduxjs/toolkit';

import { defaultPagingParams } from '@/common/define';
import { RootState } from '@/store/types';

export const getMenuState = (state: RootState) => state.menu;

export function getSelectedMenu() {
  return createSelector([getMenuState], (state) => state.selectedMenu);
}

export function getMenus() {
  return createSelector([getMenuState], (state) => state.menus);
}

export function getMenuQueryParams() {
  return createSelector(
    [getMenuState],
    (state) => state.queryParams || defaultPagingParams
  );
}
