import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  DocumentTypeResponse,
  DocumentTypesPagingResponse,
  CreateUpdateDocumentTypePayload,
} from '@/services/DocumentTypeService';

interface DocumentTypeState {
  documentTypes?: DocumentTypesPagingResponse;
  selectedDocumentType?: DocumentTypeResponse;
  selectedDocumentTypeDetail?: DocumentTypeResponse;
  queryParams: any;
}

const initialState: DocumentTypeState = {
  queryParams: {},
};

const documentTypeSlice = createSlice({
  name: 'documentType',
  initialState,
  reducers: {
    setSelectedDocumentType: (
      state,
      action: PayloadAction<DocumentTypeResponse | undefined>
    ) => {
      state.selectedDocumentType = action.payload;
    },
    setSelectedDocumentTypeDetail: (
      state,
      action: PayloadAction<DocumentTypeResponse | undefined>
    ) => {
      state.selectedDocumentTypeDetail = action.payload;
    },
    setQueryParams: (state, action) => {
      state.queryParams = action.payload;
    },
    getDocumentTypesRequest: (state, action: PayloadAction<any>) => {},
    getDocumentTypeRequest: (
      state,
      action: PayloadAction<{ documentTypeId: string }>
    ) => {},
    createDocumentTypeRequest: (
      state,
      action: PayloadAction<{ documentType: CreateUpdateDocumentTypePayload }>
    ) => {},
    updateDocumentTypeRequest: (
      state,
      action: PayloadAction<{
        documentType: CreateUpdateDocumentTypePayload;
        documentTypeId: string;
      }>
    ) => {},
    removeDocumentTypeRequest: (
      state,
      action: PayloadAction<{ documentTypeId: string }>
    ) => {},
    setDocumentTypes: (state, action) => {
      state.documentTypes = action.payload;
    },
  },
});

export const documentTypeActions = documentTypeSlice.actions;
export const documentTypeReducer = documentTypeSlice.reducer;
