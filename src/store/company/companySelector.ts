import { createSelector } from '@reduxjs/toolkit';

import { defaultPagingParams } from '@/common/define';
import { RootState } from '@/store/types';

export const getCompanyState = (state: RootState) => state.company;

export function getCompanies() {
  return createSelector([getCompanyState], (state) => state.companys);
}
export function getCompanyMenus() {
  return createSelector([getCompanyState], (state) => state.menus);
}

export function getCompanyQueryParams() {
  return createSelector(
    [getCompanyState],
    (state) => state.queryParams || defaultPagingParams
  );
}
export function getCompanyPhotoUrl() {
  return createSelector([getCompanyState], (state) => state.companyPhotoUrl);
}
export function getSelectedCompanyDetail() {
  return createSelector(
    [getCompanyState],
    (state) => state.selectedCompanyDetail
  );
}
