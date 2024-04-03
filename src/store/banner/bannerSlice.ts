import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { defaultPagingParams } from '@/common/define';
import {
  BannerResponse,
  BannersPagingResponse,
} from '@/services/BannerService';
import { banners } from '@/fakeData/banner';

interface BannerState {
  banners?: BannersPagingResponse;
  selectedBanner?: BannerResponse;
  queryParams: any;
}

const initialState: BannerState = {
  queryParams: defaultPagingParams,
  banners: {
    page: 1,
    pageCount: 1,
    pageSize: 20,
    queryCount: banners.length,
    firstRowIndex: 0,
    lastRowIndex: banners.length,
    results: banners,
  },
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setSelectedBanner: (state, action) => {
      state.selectedBanner = action.payload;
    },
    setQueryParams: (state, action) => {
      state.queryParams = action.payload;
    },
    getBannersRequest: (_, _action: PayloadAction<any>) => {},
    createBannerRequest: (_, _action: PayloadAction<any>) => {},
    updateBannerRequest: (_, _action: PayloadAction<any>) => {},
    removeBannerRequest: (_, _action: PayloadAction<any>) => {},
    setBanners: (state, action) => {
      state.banners = action.payload;
    },
  },
});

export const bannerActions = bannerSlice.actions;
export const bannerReducer = bannerSlice.reducer;
