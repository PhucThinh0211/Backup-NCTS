import { LanguageType } from '@/common';
import { createSlice } from '@reduxjs/toolkit';

interface PersistAppState {
  language: LanguageType;
  locale: LanguageType;
}

const initialState: PersistAppState = {
  language: 'vi',
  locale: 'vi',
};

const persistStateSlice = createSlice({
  name: 'persistState',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
  },
});

export const persistStateActions = persistStateSlice.actions;
export const persistStateReducer = persistStateSlice.reducer;
