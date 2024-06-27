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
export function getNewsList() {
  return createSelector([getState], (state) => state.news);
}
export function getNewsParams() {
  return createSelector([getState], (state) => state.newsParams);
}
export function getInvestorNewsList() {
  return createSelector([getState], (state) => state.investorNews);
}
export function getInvestorNewsParams() {
  return createSelector([getState], (state) => state.investorNewsParams);
}
export function getNewsTypeList() {
  return createSelector([getState], (state) => state.newsTypes);
}
export function getDocumentTypeList() {
  return createSelector([getState], (state) => state.documentTypes);
}
export function getDocumentList() {
  return createSelector([getState], (state) => state.documentList);
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
export function getPhotos() {
  return createSelector([getState], (state) => state.photos);
}
export function getVideos() {
  return createSelector([getState], (state) => state.videos);
}
export function getLogos() {
  return createSelector([getState], (state) => state.logos);
}
export function getVideoAlbumPath() {
  return createSelector([getState], (state) => state.videosAlbumPath);
}
export function getPhotoAlbumPath() {
  return createSelector([getState], (state) => state.photoAlbumPath);
}
