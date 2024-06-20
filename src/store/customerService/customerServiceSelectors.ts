import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store/types';

export const getAppState = (state: RootState) => state.pvkhCustomerService;

export function getActiveMenu() {
  return createSelector([getAppState], (state) => state.pvkh_activeMenu);
}
