import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../types';

const getLoadingState = (state: RootState) => state.loading;

export function getLoading(key?: string | string[]) {
  return createSelector([getLoadingState], state => {
    if (!key) {
      return state.loading;
    }
    if (typeof key === 'string') {
      return !!state.activeLoadings[key]?.value;
    }
    return key.filter(x => state.activeLoadings[x]?.value).length > 0;
  });
}
