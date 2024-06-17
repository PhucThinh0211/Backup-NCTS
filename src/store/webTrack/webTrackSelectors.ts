import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store/types';

export const getAppState = (state: RootState) => state.webTrack;

export function getCarriers() {
  return createSelector([getAppState], (state) => state.carriers || []);
}

export function getLookupAwbResult() {
  return createSelector([getAppState], (state) => state.loopkupawbResults || []);
}