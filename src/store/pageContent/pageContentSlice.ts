import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  PageContentResponse,
  PageContentsPagingResponse,
  CreateUpdatePageContentPayload,
} from '@/services/PageContentService';
import { NewsTypesPagingResponse } from '@/services/NewsTypeService';

interface PageContentState {
  pageContents?: PageContentsPagingResponse;
  selectedPageContent?: PageContentResponse;
  selectedPageContentDetail?: PageContentResponse;
  queryParams: any;
  newsTypes?: NewsTypesPagingResponse;
}

const initialState: PageContentState = {
  queryParams: {},
};

const pageContentSlice = createSlice({
  name: 'pageContent',
  initialState,
  reducers: {
    setSelectedPageContent: (
      state,
      action: PayloadAction<PageContentResponse | undefined>
    ) => {
      state.selectedPageContent = action.payload;
    },
    setSelectedPageContentDetail: (
      state,
      action: PayloadAction<PageContentResponse | undefined>
    ) => {
      state.selectedPageContentDetail = action.payload;
    },
    setQueryParams: (state, action) => {
      state.queryParams = action.payload;
    },
    getPageContentsRequest: (state, action: PayloadAction<any>) => {},
    getPageContentRequest: (
      state,
      action: PayloadAction<{ pageContentId: string }>
    ) => {},
    createPageContentRequest: (
      state,
      action: PayloadAction<{ pageContent: CreateUpdatePageContentPayload }>
    ) => {},
    updatePageContentRequest: (
      state,
      action: PayloadAction<{
        pageContent: CreateUpdatePageContentPayload;
        pageContentId: string;
      }>
    ) => {},
    removePageContentRequest: (
      state,
      action: PayloadAction<{ pageContentId: string }>
    ) => {},
    setPageContents: (state, action) => {
      state.pageContents = action.payload;
    },
    getNewsTypesRequest: (state, action: PayloadAction<any>) => {},
    setNewsTypes: (state, action) => {
      state.newsTypes = action.payload;
    },
    publishPageRequest: (state, action) => {},
    unpublishPageRequest: (state, action) => {}
  },
});

export const pageContentActions = pageContentSlice.actions;
export const pageContentReducer = pageContentSlice.reducer;
