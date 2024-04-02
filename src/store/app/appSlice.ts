import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  activeMenu?: any;
}

const initialState: AppState = {};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
