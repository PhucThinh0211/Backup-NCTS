import {
  AwbResponse,
  CarrierResponse,
  ClassResponse,
  FlightLookupPagingResponse,
  FreightEstimateResponse,
} from '@/services/WebTrackService';
import { createSlice } from '@reduxjs/toolkit';

interface WebTrackState {
  carriers: CarrierResponse[];
  loopkupawbResults?: AwbResponse[];
  lookupawbPayload?: any;
  lookupFlightResults?: FlightLookupPagingResponse;
  lookupFlightPayload?: any;
  classList: ClassResponse[];
  freightEstimateResults?: FreightEstimateResponse;
  freightEstimatePayload?: any;
}

const initialState: WebTrackState = {
  carriers: [],
  classList: [],
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
    estimateFreightRequest: (state, action) => {},
    setFreightEstimateResults: (state, action) => {
      state.freightEstimateResults = action.payload;
    },
    setFreightEstimatePayload: (state, action) => {
      state.freightEstimatePayload = action.payload;
    },
    getClassListRequest: (state) => {},
    setClassList: (state, action) => {
      state.classList = action.payload;
    },
  },
});

export const webTrackActions = webTrackSlice.actions;
export const webTrackReducer = webTrackSlice.reducer;
