import { createSlice } from '@reduxjs/toolkit';

interface HomeState {
  showMenu: boolean;
  showSearch: boolean;
  activeLookupTab?: any;
}

const initialState: HomeState = {
  showMenu: false,
  showSearch: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      return {
        ...state,
        showMenu: !state.showMenu,
        showSearch: false,
      };
    },
    toggleSearch: (state) => {
      return {
        ...state,
        showSearch: !state.showSearch,
        showMenu: false,
      };
    },
    closeMenu: (state) => {
      return {
        ...state,
        showMenu: false,
      };
    },
    closeSearch: (state) => {
      return {
        ...state,
        showSearch: false,
      };
    },
    setActiveLookupTab: (state, action) => {
      state.activeLookupTab = action.payload;
    },
  },
});
export const homeActions = homeSlice.actions;
export const homeReducers = homeSlice.reducer;
