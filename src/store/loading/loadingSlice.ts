import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import Utils from '@/utils';

type LoadingType = 'top' | 'middle'; 

interface loadingState {
  loading: boolean;
  activeLoadings: any;
}

const initialState: loadingState = {
  loading: false,
  activeLoadings: {},
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<{ key: string, type?: LoadingType }>) => {
      const { key, type } = action.payload;
      state.loading = true;
      const actives = { ...state.activeLoadings, [key]: {value: true, type: type || 'middle'}};
      state.activeLoadings = actives;
    },
    stopLoading: (state, action: PayloadAction<{ key: string }>) => {
      const actives = Utils.deepClone(state.activeLoadings);
      delete actives[action.payload.key];
      state.activeLoadings = actives;
      state.loading = !!Object.keys(actives).length;
    },
    clearLoading: state => {
      state.activeLoadings = {};
      state.loading = false;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  clearLoading,
} = loadingSlice.actions;

export const loadingReducer = loadingSlice.reducer;
