import { createSelector } from '@reduxjs/toolkit';

import { defaultPagingParams } from '@/common/define';
import { RootState } from '@/store/types';

export const getDepartmentState = (state: RootState) => state.department;

export function getSelectedDepartment() {
  return createSelector([getDepartmentState], (state) => state.selectedDepartment);
}

export function getDepartments() {
  return createSelector([getDepartmentState], (state) => state.departments);
}

export function getDepartmentQueryParams() {
  return createSelector(
    [getDepartmentState],
    (state) => state.queryParams || defaultPagingParams
  );
}
export function getSelectedDepartmentDetail() {
  return createSelector(
    [getDepartmentState],
    (state) => state.selectedDepartmentDetail
  );
}
