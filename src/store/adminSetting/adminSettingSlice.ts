import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  CreateUpdateEmailSettingPayload,
  EmailSettingResponse,
} from "@/services/EmailSettingService";

interface CompanyState {
  emailSetting?: EmailSettingResponse;
  queryParams: any;
}

const initialState: CompanyState = {
  queryParams: {},
};

const adminSettingSlice = createSlice({
  name: "adminSetting",
  initialState,
  reducers: {
    getEmailSettingRequest: (state, action) => {
      state.emailSetting = action.payload;
    },
    setEmailSetting: (state, action) => {
      state.emailSetting = action.payload;
    },
    setQueryParams: (state, action) => {
      state.queryParams = action.payload;
    },
    createEmailSettingRequest: (
      state,
      action: PayloadAction<{ input: CreateUpdateEmailSettingPayload }>
    ) => {},
  },
});

export const adminSettingActions = adminSettingSlice.actions;
export const adminSettingReducer = adminSettingSlice.reducer;
