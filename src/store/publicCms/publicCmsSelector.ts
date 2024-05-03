import { RootState } from "@/store/types";
import { createSelector } from "@reduxjs/toolkit";

export const getState = (state: RootState) => state.home;

export function getMenuList() {
  return createSelector([getState], (state) => state.menuList);
}