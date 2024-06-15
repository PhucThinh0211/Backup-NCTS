import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/types';

export const getMediaState = (state: RootState) => state.media;

export function getFolders() {
  return createSelector([getMediaState], (state) => state.folders);
}
export function getMediaType() {
  return createSelector([getMediaState], (state) => state.mediaType);
}
export function getFolderPath() {
  return createSelector([getMediaState], (state) => state.folderPath);
}
export function getDocumentTypes() {
  return createSelector([getMediaState], (state) => state.documentTypes);
}
