import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store/types';

export const getAppState = (state: RootState) => state.app;

export function getActiveMenu() {
  return createSelector([getAppState], (state) => state.activeMenu);
}

export function getAuthenticated() {
  return createSelector([getAppState], (state) => state.auth);
}

export function getAppConfig() {
  return createSelector([getAppState], (state) => state.appConfig);
}

export function getCurrentUser() {
  return createSelector([getAppState], (state) => state.currentUser);
}

export function getActiveLookup() {
  return createSelector([getAppState], (state) => state.activeLookup);
}

export function getGrantedPolicies() {
  return createSelector([getAppState], state => state?.appConfig?.auth?.grantedPolicies ?? {});
}

export function createGrantedPolicySelector(key: string) {
  return createSelector([getAppState], state => state?.appConfig?.auth?.grantedPolicies[key] ?? false);
}
