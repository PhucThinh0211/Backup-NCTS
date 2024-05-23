import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  NewsTypeResponse,
  NewsTypesPagingResponse,
  CreateUpdateNewsTypePayload,
} from '@/services/NewsTypeService';

interface NewsTypeState {
  newsTypes?: NewsTypesPagingResponse;
  selectedNewsType?: NewsTypeResponse;
  selectedNewsTypeDetail?: NewsTypeResponse;
  queryParams: any;
}

const initialState: NewsTypeState = {
  queryParams: {},
};

const newsTypeSlice = createSlice({
  name: 'newsType',
  initialState,
  reducers: {
    setSelectedNewsType: (
      state,
      action: PayloadAction<NewsTypeResponse | undefined>
    ) => {
      state.selectedNewsType = action.payload;
    },
    setSelectedNewsTypeDetail: (
      state,
      action: PayloadAction<NewsTypeResponse | undefined>
    ) => {
      state.selectedNewsTypeDetail = action.payload;
    },
    setQueryParams: (state, action) => {
      state.queryParams = action.payload;
    },
    getNewsTypesRequest: (state, action: PayloadAction<any>) => {},
    getNewsTypeRequest: (
      state,
      action: PayloadAction<{ newsTypeId: string }>
    ) => {},
    createNewsTypeRequest: (
      state,
      action: PayloadAction<{ newsType: CreateUpdateNewsTypePayload }>
    ) => {},
    updateNewsTypeRequest: (
      state,
      action: PayloadAction<{
        newsType: CreateUpdateNewsTypePayload;
        newsTypeId: string;
      }>
    ) => {},
    removeNewsTypeRequest: (
      state,
      action: PayloadAction<{ newsTypeId: string }>
    ) => {},
    setNewsTypes: (state, action) => {
      state.newsTypes = action.payload;
    },
  },
});

export const newsTypeActions = newsTypeSlice.actions;
export const newsTypeReducer = newsTypeSlice.reducer;
