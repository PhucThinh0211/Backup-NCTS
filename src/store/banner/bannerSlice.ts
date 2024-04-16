import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { defaultPagingParams } from '@/common/define';
import {
  BannerResponse,
  BannersPagingResponse,
  CreateUpdateBannerPayload,
} from '@/services/BannerService';

interface BannerState {
  banners?: BannersPagingResponse;
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
      state.bannerPhotoUrl = action.payload?.photoUrl || undefined;
    },
    setBannerPhotoUrl: (state, action: PayloadAction<string | undefined>) => {
      state.bannerPhotoUrl = action.payload;
    },
    setSelectedBannerDetail: (state, action: PayloadAction<BannerResponse | undefined>) => {
      state.selectedBannerDetail = action.payload;
    },
    setQueryParams: (state, action) => {
      state.queryParams = action.payload;
    },
    getBannersRequest: (_, _action: PayloadAction<any>) => {},
    getBannerRequest: (_, _action: PayloadAction<{ bannerId: string}>) => {},
    createBannerRequest: (
      _,
      _action: PayloadAction<{ banner: CreateUpdateBannerPayload }>
    ) => {},
    updateBannerRequest: (
      _,
      _action: PayloadAction<{
        banner: CreateUpdateBannerPayload;
        bannerId: string;
      }>
    ) => {},
    removeBannerRequest: (
      _,
      _action: PayloadAction<{ bannerId: string }>
    ) => {},
    setBanners: (state, action) => {
      state.banners = action.payload;
    },
  },
});

export const bannerActions = bannerSlice.actions;
export const bannerReducer = bannerSlice.reducer;
