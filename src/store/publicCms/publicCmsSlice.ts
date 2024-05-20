import { createSlice } from "@reduxjs/toolkit";

import { MenuResponse } from "@/services/MenuService";
import { CompanyResponse } from "@/services/CompanyService";

interface publicCmsState {
  company?: CompanyResponse;
  menuList: MenuResponse[];
  
}

const initialState: publicCmsState = {
  menuList: []
}

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
    }
  }
});

export const publicCmsActions = publicCmsSlice.actions;
export const publicCmsReducer = publicCmsSlice.reducer;