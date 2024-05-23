import { createSlice } from '@reduxjs/toolkit';

import { MenuResponse } from '@/services/MenuService';
import { CompanyResponse } from '@/services/CompanyService';
import { BannerResponse } from '@/services/BannerService';
import { CaptchaResponse } from '@/services/PublicCmsService';

interface publicCmsState {
  company?: CompanyResponse;
  menuList: MenuResponse[];
  banners: BannerResponse[];
  captcha?: CaptchaResponse;
}

const initialState: publicCmsState = {
  menuList: [],
  banners: [],
};

const publicCmsSlice = createSlice({
  name: 'publicCms',
  initialState,
  reducers: {
    getCompanyRequest: (state, action) => {},
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    getMenuListRequest: (state, action) => {},
    setMenuList: (state, action) => {
      state.menuList = action.payload;
    },
    getBannerListRequest: (state, action) => {},
    setBannerList: (state, action) => {
      state.banners = action.payload;
    },
    getCaptchaRequest: (state) => {},
    setCaptcha: (state, action) => {
      state.captcha = action.payload;
    }
  },
});

export const publicCmsActions = publicCmsSlice.actions;
export const publicCmsReducer = publicCmsSlice.reducer;
