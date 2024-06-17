import { AwbResponse } from '@/services/WebTrackService';
import { createSlice } from '@reduxjs/toolkit';

interface WebTrackState {
  carriers: any[];
  loopkupawbResults?: AwbResponse[];
  lookupawbPayload?: any;
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
    },
    setLookupAwbPayload: (state, action) => {
      state.lookupawbPayload = action.payload;
    },
    getCarriersRequest: (state, action) => {},
    setCarriers: (state, action) => {
      state.carriers = action.payload;
    },
  },
});

export const webTrackActions = webTrackSlice.actions;
export const webTrackReducer = webTrackSlice.reducer;
