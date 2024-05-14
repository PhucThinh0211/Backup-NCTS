import { createSlice } from "@reduxjs/toolkit";

import { MenuResponse } from "@/services/MenuService";

interface publicCmsState {
  menuList: MenuResponse[];
}

const initialState: publicCmsState = {
  menuList: []
}

const publicCmsSlice = createSlice({
  name: 'publicCms',
  initialState,
  reducers: {
    getMenuListRequest: (state, action) => {},
    setMenuList: (state, action) => {
      state.menuList = action.payload;
    }
  }
});

export const publicCmsActions = publicCmsSlice.actions;
export const publicCmsReducer = publicCmsSlice.reducer;