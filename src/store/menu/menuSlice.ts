import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { defaultPagingParams } from '@/common/define';
import { MenuResponse, MenusPagingResponse } from '@/services/MenuService';
import { menus } from '@/fakeData';

interface MenuState {
  menus?: MenusPagingResponse;
  selectedMenu?: MenuResponse;
  queryParams: any;
}

const initialState: MenuState = {
  queryParams: defaultPagingParams,
  menus: {
    page: 1,
    pageCount: 1,
    pageSize: 20,
    queryCount: menus.length,
    firstRowIndex: 0,
    lastRowIndex: menus.length,
    results: menus,
  },
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedMenu: (state, action) => {
      state.selectedMenu = action.payload;
    },
    setQueryParams: (state, action) => {
      state.queryParams = action.payload;
    },
    getMenusRequest: (_, _action: PayloadAction<any>) => {},
    createMenuRequest: (_, _action: PayloadAction<any>) => {},
    updateMenuRequest: (_, _action: PayloadAction<any>) => {},
    removeMenuRequest: (_, _action: PayloadAction<any>) => {},
    setMenus: (state, action) => {
      state.menus = action.payload;
    },
  },
});

export const menuActions = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
