import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  CreateUpdateFolderPayload,
  FolderResponse,
  MediaType,
} from '@/services/FileService';
import { DocumentTypesPagingResponse } from '@/services/DocumentTypeService';

interface MediaState {
  folders: FolderResponse[];
  folderPath: FolderResponse[];
  mediaType?: MediaType;
  documentTypes?: DocumentTypesPagingResponse;
}

const initialState: MediaState = {
  folders: [],
  folderPath: [],
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
    getFoldersRequest: (state, action: PayloadAction<any>) => {},
    setMediaType: (state, action: PayloadAction<MediaType | undefined>) => {
      state.mediaType = action.payload;
    },
    setFolderPath: (state, action) => {
      state.folderPath = action.payload;
    },
    createFolderRequest: (
      state,
      action: PayloadAction<CreateUpdateFolderPayload>
    ) => {},
    uploadFileRequest: (
      state,
      action: PayloadAction<{ body: FormData; params: any }>
    ) => {},
    getDocumentTypesRequest: (state, action: PayloadAction<any>) => {},
    setDocumentTypes: (state, action) => {
      state.documentTypes = action.payload;
    },
    deleteFileRequest: (state, action: PayloadAction<any>) => {},
  },
});

export const mediaActions = mediaSlice.actions;
export const mediaReducer = mediaSlice.reducer;
