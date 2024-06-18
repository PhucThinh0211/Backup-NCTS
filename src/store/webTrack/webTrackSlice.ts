import {
  AwbResponse,
  CarrierResponse,
  FlightLookupPagingResponse,
} from '@/services/WebTrackService';
import { createSlice } from '@reduxjs/toolkit';

interface WebTrackState {
  carriers: CarrierResponse[];
  loopkupawbResults?: AwbResponse[];
  lookupawbPayload?: any;
  lookupFlightResults?: FlightLookupPagingResponse;
  lookupFlightPayload?: any;
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
    lookupFlightRequest: (state, action) => {},
    setLookupFlightResults: (state, action) => {
      state.lookupFlightResults = action.payload;
    },
    setLookupFlightPayload: (state, action) => {
      state.lookupFlightPayload = action.payload;
    },
    getCarriersRequest: (state, action) => {},
    setCarriers: (state, action) => {
      state.carriers = action.payload;
    },
  },
});

export const webTrackActions = webTrackSlice.actions;
export const webTrackReducer = webTrackSlice.reducer;
