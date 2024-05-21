import { RootState } from "@/store/types";
import { createSelector } from "@reduxjs/toolkit";

export const getState = (state: RootState) => state.home;

export const getShowMenu = createSelector([getState], (state) => state.showMenu);
export const getShowSearch = createSelector([getState], (state) => state.showSearch);
export function getActiveLookupTab() {
    return createSelector([getState], (state) => state.activeLookupTab);
  }
  