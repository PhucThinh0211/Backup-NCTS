import { createSlice } from '@reduxjs/toolkit';

interface WebTrackState {
  carriers: any[];
  loopkupawbResults?: any[];
}

const initialState: WebTrackState = {
  carriers: [],
};

const webTrackSlice = createSlice({
  name: 'webTrack',
  initialState,
  reducers: {
    lookupAwbRequest: (state, action) => {},
    setLookupAwbResults: (state, action) => {
      state.loopkupawbResults = action.payload;
    }
  },
});

export const webTrackActions = webTrackSlice.actions;
export const webTrackReducer = webTrackSlice.reducer;