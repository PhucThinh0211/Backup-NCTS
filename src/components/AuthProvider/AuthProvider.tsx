import * as React from 'react';

import { AuthContext } from '@/context';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { appActions, getAuthenticated, getCurrentUser } from '@/store/app';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getCurrentUser());
  const auth = useAppSelector(getAuthenticated());

  const signin = (input: any, callback: VoidFunction) => {
    dispatch(appActions.loginRequest({ input, callback }));
  };

  const signout = (callback: VoidFunction) => {
    dispatch(appActions.logout({ callback }));
  };

  const value = {
    user,
    token: auth?.token,
    refresh_token: auth?.refresh_token,
    remember: auth?.remember,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
