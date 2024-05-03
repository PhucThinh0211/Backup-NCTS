import { createSlice } from "@reduxjs/toolkit";

import { MenuResponse } from "@/services/MenuService";

interface HomeState {
  menuList: MenuResponse[];
}

const initialState: HomeState = {
  menuList: []
}

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getMenuListRequest: (state, action) => {},
    setMenuList: (state, action) => {
      state.menuList = action.payload;
    }
  }
});

export const homeActions = HomeSlice.actions;
export const homeReducer = HomeSlice.reducer;