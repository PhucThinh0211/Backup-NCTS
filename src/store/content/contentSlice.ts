import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  ContentResponse,
  ContentsPagingResponse,
  CreateUpdateContentPayload,
} from '@/services/ContentService';
import { MenusPagingResponse } from '@/services/MenuService';

interface ContentState {
  contents?: ContentsPagingResponse;
  menus?: MenusPagingResponse;
  selectedContent?: ContentResponse;
  contentPhotoUrl?: string;
  selectedContentDetail?: ContentResponse;
  queryParams: any;
}

const initialState: ContentState = {
  queryParams: {},
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSelectedContent: (
      state,
      action: PayloadAction<ContentResponse | undefined>
    ) => {
      state.selectedContent = action.payload;
    },
    setContentPhotoUrl: (state, action: PayloadAction<string | undefined>) => {
      state.contentPhotoUrl = action.payload;
    },
    setSelectedContentDetail: (
      state,
      action: PayloadAction<ContentResponse | undefined>
    ) => {
      state.selectedContentDetail = action.payload;
      state.contentPhotoUrl = action.payload?.photoUrl || undefined;
    },
    setQueryParams: (state, action) => {
      state.queryParams = action.payload;
    },
    getContentsRequest: (state, action: PayloadAction<any>) => {},
    getContentRequest: (
      state,
      action: PayloadAction<{ contentId: string }>
    ) => {},
    createContentRequest: (
      state,
      action: PayloadAction<{ content: CreateUpdateContentPayload }>
    ) => {},
    updateContentRequest: (
      state,
      action: PayloadAction<{
        content: CreateUpdateContentPayload;
        contentId: string;
      }>
    ) => {},
    removeContentRequest: (
      state,
      action: PayloadAction<{ contentId: string }>
    ) => {},
    setContents: (state, action) => {
      state.contents = action.payload;
    },
  },
});

export const contentActions = contentSlice.actions;
export const contentReducer = contentSlice.reducer;
