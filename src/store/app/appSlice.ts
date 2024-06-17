import { JwtDecoded } from '@/common';
import { setToken } from '@/services/HttpClient';
import { ILoginInput } from '@/services/IdentityService';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export enum LookupType {
  AWB = 1,
  FLIGHT = 2,
  INVOICE = 3,
}
interface AppState {
  activeMenu?: any;
  activeLookup?: LookupType;
  auth?: {
    remember?: boolean;
    user?: any;
    token?: string;
    refresh_token?: string;
    roles?: any;
    orgRoles?: any;
    orgId?: string;
    companyId?: number;
  };
  appConfig?: any;
  currentUser?: any;
}

const initialState: AppState = {
  activeLookup: LookupType.AWB,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    loginRequest: (
      state,
      action: PayloadAction<{ input: ILoginInput; callback?: VoidFunction }>
    ) => {},
    loginSuccess: (state, action) => {
      const { loginResponse, loginData } = action.payload;
      const { access_token, refresh_token } = loginResponse;
      console.log(action.payload, access_token);

      const decoded: JwtDecoded = jwtDecode(access_token);
      setToken(access_token);
      const auth = {
        remember: loginData.remember,
        // user: JSON.parse(decoded.profile),
        token: access_token,
        refresh_token,
        // roles: decoded.role,
        // orgRoles: decoded.orgRoles,
        // orgId: decoded.orgId,
        // companyId: decoded.CompanyId,
      };
      state.auth = auth;
    },
    logout: (state, action: PayloadAction<{ callback?: VoidFunction }>) => {
      const { callback } = action.payload;
      setToken(null);
      if (callback) {
        callback();
      }
    },
    setAppConfig: (state, action) => {
      state.appConfig = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setActiveLookup: (state, action) => {
      state.activeLookup = action.payload;
    },
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
