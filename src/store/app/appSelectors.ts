import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/store/types";

export const getAppState = (state: RootState) => state.app;

export function getActiveMenu() {
  return createSelector([getAppState], (state) => state.activeMenu);
}
