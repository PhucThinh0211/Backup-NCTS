import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  CompanyResponse,
  CompaniesPagingResponse,
  CreateUpdateCompanyPayload,
} from '@/services/CompanyService';
import { MenusPagingResponse } from '@/services/MenuService';

interface CompanyState {
  companys?: CompaniesPagingResponse;
  menus?: MenusPagingResponse;
  companyPhotoUrl?: string;
  selectedCompanyDetail?: CompanyResponse;
  queryParams: any;
}

const initialState: CompanyState = {
  queryParams: {},
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyPhotoUrl: (state, action: PayloadAction<string | undefined>) => {
      state.companyPhotoUrl = action.payload;
    },
    setSelectedCompanyDetail: (
      state,
      action: PayloadAction<CompanyResponse | undefined>
    ) => {
      state.selectedCompanyDetail = action.payload;
    },
    setQueryParams: (state, action) => {
      state.queryParams = action.payload;
    },
    getCompaniesRequest: (state, action: PayloadAction<any>) => {},
    getCompanyRequest: (
      state,
      action: PayloadAction<{ companyId: string }>
    ) => {},
    createCompanyRequest: (
      state,
      action: PayloadAction<{ company: CreateUpdateCompanyPayload }>
    ) => {},
    updateCompanyRequest: (
      state,
      action: PayloadAction<{
        company: CreateUpdateCompanyPayload;
        companyId: string;
      }>
    ) => {},
    removeCompanyRequest: (
      state,
      action: PayloadAction<{ companyId: string }>
    ) => {},
    setCompanies: (state, action) => {
      state.companys = action.payload;
    },
  },
});

export const companyActions = companySlice.actions;
export const companyReducer = companySlice.reducer;
