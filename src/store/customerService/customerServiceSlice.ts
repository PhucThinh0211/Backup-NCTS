import { createSlice } from '@reduxjs/toolkit';

interface CustomerServiceState {
  pvkh_activeMenu?: any;
}

const initialState: CustomerServiceState = {};

const customerServiceSlice = createSlice({
  name: 'pvkhCustomerService',
  initialState,
  reducers: {
    setPVKHActiveMenu: (state, action) => {
      state.pvkh_activeMenu = action.payload;
    },
  },
});

export const customerServiceActions = customerServiceSlice.actions;
export const customerServiceReducer = customerServiceSlice.reducer;
