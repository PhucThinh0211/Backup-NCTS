import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store/types';

export const getAppState = (state: RootState) => state.webTrack;

export function getCarriers() {
  return createSelector([getAppState], (state) => state.carriers || []);
}

export function getLookupAwbPayload() {
  return createSelector([getAppState], (state) => state.lookupawbPayload);
}
export function getLookupAwbResult() {
  return createSelector(
    [getAppState],
    (state) => state.loopkupawbResults || []
  );
}

export function getLookupFlightPayload() {
  return createSelector([getAppState], (state) => state.lookupFlightPayload);
}
export function getLookupFlightResult() {
  return createSelector([getAppState], (state) => state.lookupFlightResults);
}
