import { RootState } from "@/store/types";
import { createSelector } from "@reduxjs/toolkit";

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
export function getNewsList() {
  return createSelector([getState], (state) => state.news);
}
export function getNewsParams() {
  return createSelector([getState], (state) => state.newsParams);
}
export function getNewsTypeList() {
  return createSelector([getState], (state) => state.newsTypes);
}
export function getSelectedNewsTypeId() {
  return createSelector([getState], (state) => state.selectedNewsTypeId);
}

export function getCaptcha() {
  return createSelector([getState], (state) => state.captcha);
}

export function getServicePages() {
  return createSelector([getState], (state) => state.servicePages || []);
}

export function getIntroducePage() {
  return createSelector([getState], (state) => state.introducePage);
}

export function getSelectedPageDetail() {
  return createSelector([getState], (state) => state.selectedPageDetail);
}

export function getSelectedNewsDetail() {
  return createSelector([getState], (state) => state.selectedNewsDetail);
}
export function getDepartments() {
  return createSelector([getState], (state) => state.departments);
}
export function getLatestNewsList() {
  return createSelector([getState], (state) => state.latestNews);
}
