import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  DepartmentResponse,
  DepartmentsPagingResponse,
  CreateUpdateDepartmentPayload,
  ContactResponse,
  CreateUpdateContactPayload,
} from '@/services/DepartmentService';

interface DepartmentState {
  departments?: DepartmentsPagingResponse;
  selectedDepartment?: DepartmentResponse;
  selectedDepartmentDetail?: DepartmentResponse;
  selectedContact?: ContactResponse;
  queryParams: any;
}

const initialState: DepartmentState = {
  queryParams: {},
};

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setSelectedDepartment: (
      state,
      action: PayloadAction<DepartmentResponse | undefined>
    ) => {
      state.selectedDepartment = action.payload;
    },
    setSelectedContact: (
      state,
      action: PayloadAction<ContactResponse | undefined>
    ) => {
      state.selectedContact = action.payload;
    },
    setSelectedDepartmentDetail: (
      state,
      action: PayloadAction<DepartmentResponse | undefined>
    ) => {
      state.selectedDepartmentDetail = action.payload;
    },
    setQueryParams: (state, action) => {
      state.queryParams = action.payload;
    },
    getDepartmentsRequest: (state, action: PayloadAction<any>) => {},
    getDepartmentRequest: (
      state,
      action: PayloadAction<{ departmentId: string }>
    ) => {},
    createDepartmentRequest: (
      state,
      action: PayloadAction<{ department: CreateUpdateDepartmentPayload }>
    ) => {},
    updateDepartmentRequest: (
      state,
      action: PayloadAction<{
        department: CreateUpdateDepartmentPayload;
        departmentId: string;
      }>
    ) => {},
    removeDepartmentRequest: (
      state,
      action: PayloadAction<{ departmentId: string }>
    ) => {},
    createContactRequest: (
      state,
      action: PayloadAction<{
        contact: CreateUpdateContactPayload;
        departmentId: string;
      }>
    ) => {},
    updateContactRequest: (
      state,
      action: PayloadAction<{
        contact: CreateUpdateContactPayload;
        contactId: string;
        departmentId: string;
      }>
    ) => {},
    removeContactRequest: (
      state,
      action: PayloadAction<{ contactId: string; departmentId: string }>
    ) => {},
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
  },
});

export const departmentActions = departmentSlice.actions;
export const departmentReducer = departmentSlice.reducer;
