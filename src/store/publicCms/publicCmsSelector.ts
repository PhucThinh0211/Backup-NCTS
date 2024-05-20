import { RootState } from '@/store/types';
import { createSelector } from '@reduxjs/toolkit';

export const getState = (state: RootState) => state.publicCms;

export function getMenuList() {
  return createSelector([getState], (state) => state.menuList);
}

export function getCurrentCompany() {
  return createSelector([getState], (state) => state.company);
}
export function getBanners() {
  return createSelector([getState], (state) => state.banners);
}
