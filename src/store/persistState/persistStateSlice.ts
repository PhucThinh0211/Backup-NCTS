import { LanguageType } from '@/common';
import { createSlice } from '@reduxjs/toolkit';

interface PersistAppState {
  language: LanguageType;
  locale: LanguageType;
  searchVisibility: boolean;
  panelNavVisibility: boolean;
  activeMenuKey: string;
}

const initialState: PersistAppState = {
  language: 'vi',
  locale: 'vi',
  searchVisibility: false,
  panelNavVisibility: false,
  activeMenuKey: '/'
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
    setSearchVisible: (state, action) => {
      state.searchVisibility = action.payload;
    },
    setPanelNavVisibility: (state, action) => {
      state.panelNavVisibility = action.payload;
    },
    setActiveMenuKey: (state, action) => {
      state.activeMenuKey = action.payload;
    }
  },
});

export const persistStateActions = persistStateSlice.actions;
export const persistStateReducer = persistStateSlice.reducer;
