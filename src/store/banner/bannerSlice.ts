import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { defaultPagingParams } from '@/common/define';
import {
  BannerResponse,
  BannersPagingResponse,
  CreateUpdateBannerPayload,
} from '@/services/BannerService';
import { MenusPagingResponse } from '@/services/MenuService';

interface BannerState {
  banners?: BannersPagingResponse;
  menus?: MenusPagingResponse;
  selectedBanner?: BannerResponse;
  bannerPhotoUrl?: string;
  selectedBannerDetail?: BannerResponse;
  queryParams: any;
}

const initialState: BannerState = {
  queryParams: defaultPagingParams,
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setSelectedBanner: (
      state,
      action: PayloadAction<BannerResponse | undefined>
    ) => {
      state.selectedBanner = action.payload;
    },
    setBannerPhotoUrl: (state, action: PayloadAction<string | undefined>) => {
      state.bannerPhotoUrl = action.payload;
    },
    setSelectedBannerDetail: (
      state,
      action: PayloadAction<BannerResponse | undefined>
    ) => {
      state.selectedBannerDetail = action.payload;
      state.bannerPhotoUrl = action.payload?.photoUrl || undefined;
    },
    setQueryParams: (state, action) => {
      state.queryParams = action.payload;
    },
    getMenusRequest: (state, action: PayloadAction<any>) => {},
    getBannersRequest: (state, action: PayloadAction<any>) => {},
    getBannerRequest: (
      state,
      action: PayloadAction<{ bannerId: string }>
    ) => {},
    createBannerRequest: (
      state,
      action: PayloadAction<{ banner: CreateUpdateBannerPayload }>
    ) => {},
    updateBannerRequest: (
      state,
      action: PayloadAction<{
        banner: CreateUpdateBannerPayload;
        bannerId: string;
      }>
    ) => {},
    removeBannerRequest: (
      state,
      action: PayloadAction<{ bannerId: string }>
    ) => {},
    setBanners: (state, action) => {
      state.banners = action.payload;
    },
    setMenus: (state, action) => {
      state.menus = action.payload;
    },
  },
});

export const bannerActions = bannerSlice.actions;
export const bannerReducer = bannerSlice.reducer;
