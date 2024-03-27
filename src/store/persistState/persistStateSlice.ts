import { LanguageType } from '@/common';
import { createSlice } from '@reduxjs/toolkit';

interface PersistAppState {
  language: LanguageType;
}

const initialState: PersistAppState = {
  language: 'vi',
};

const persistStateSlice = createSlice({
  name: 'persistState',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const persistStateActions = persistStateSlice.actions;
export const persistStateReducer = persistStateSlice.reducer;
