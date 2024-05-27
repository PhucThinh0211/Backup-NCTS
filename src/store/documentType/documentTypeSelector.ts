import { createSelector } from '@reduxjs/toolkit';

import { defaultPagingParams } from '@/common/define';
import { RootState } from '@/store/types';

export const getDocumentTypeState = (state: RootState) => state.documentType;

export function getSelectedDocumentType() {
  return createSelector(
    [getDocumentTypeState],
    (state) => state.selectedDocumentType
  );
}

export function getDocumentTypes() {
  return createSelector([getDocumentTypeState], (state) => state.documentTypes);
}

export function getDocumentTypeQueryParams() {
  return createSelector(
    [getDocumentTypeState],
    (state) => state.queryParams || defaultPagingParams
  );
}
export function getSelectedDocumentTypeDetail() {
  return createSelector(
    [getDocumentTypeState],
    (state) => state.selectedDocumentTypeDetail
  );
}
