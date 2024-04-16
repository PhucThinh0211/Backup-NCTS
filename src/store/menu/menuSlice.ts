import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestOptions } from '@/services/types';
// import { defaultPagingParams } from '@/common/define';
import {
  CreateUpdateMenuPayload,
  MenuResponse,
  MenusPagingResponse,
} from '@/services/MenuService';
import { TreeItem } from '@/common';

interface MenuState {
  menus?: MenusPagingResponse;
  selectedMenu?: TreeItem<MenuResponse>;
  selectedMenuDetail?: MenuResponse;
  queryParams: any;
}

const initialState: MenuState = {
  queryParams: {
    pageSize: 2000,
  },
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedMenu: (state, action) => {
      state.selectedMenu = action.payload;
    },
    setSelectedMenuDetail: (state, action) => {
      state.selectedMenuDetail = action.payload;
    },
    setQueryParams: (state, action) => {
      state.queryParams = action.payload;
    },
    getMenusRequest: (_, _action: PayloadAction<any>) => {},
    getMenuRequest: (
      _,
      _action: PayloadAction<{ menuId: string; options?: RequestOptions }>
    ) => {},
    createMenuRequest: (
      _,
      _action: PayloadAction<{
        menu: CreateUpdateMenuPayload;
      }>
    ) => {},
    updateMenuRequest: (
      _,
      _action: PayloadAction<{
        menuId: string;
        menu: CreateUpdateMenuPayload;
      }>
    ) => {},
    removeMenuRequest: (_, _action: PayloadAction<{ menuId: string }>) => {},
    setMenus: (state, action) => {
      state.menus = action.payload;
    },
  },
});

export const menuActions = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
