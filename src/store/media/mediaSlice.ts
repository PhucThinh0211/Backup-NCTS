import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FolderResponse, MediaType } from '@/services/FileService';

interface MediaState {
  folders: FolderResponse[];
  mediaType?: MediaType;
}

const initialState: MediaState = {
  folders: [],
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
  },
});

export const mediaActions = mediaSlice.actions;
export const mediaReducer = mediaSlice.reducer;
