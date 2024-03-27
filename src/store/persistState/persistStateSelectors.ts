import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store/types';

export const getState = (state: RootState) => state.persist;

export function getLanguage() {
  return createSelector([getState], (state) => state.language || 'vi');
}
