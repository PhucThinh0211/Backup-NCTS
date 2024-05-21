import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store/types';

export const getState = (state: RootState) => state.persistApp;

export function getLanguage() {
  return createSelector([getState], (state) => state.language || 'vi');
}
export function getLocale() {
  return createSelector([getState], (state) => state.locale || 'vi');
}

export function getSearchVisibility() {
  return createSelector([getState], (state) => state.searchVisibility || false);
}

export function getPanelVisibility() {
  return createSelector([getState], (state) => state.panelNavVisibility || false);
}

export function getActiveMenuKey() {
  return createSelector([getState], (state) => state.activeMenuKey || '/');
}

