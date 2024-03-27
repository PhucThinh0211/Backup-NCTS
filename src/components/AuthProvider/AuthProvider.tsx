import * as React from 'react';

import { AuthContext } from '@/context';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = { id: 1 };

  const signin = (input: any, callback?: VoidFunction) => {
    console.log(input);
    if (callback) {
      console.log('Callback');
    }
  };

  const signout = (callback?: VoidFunction) => {
    console.log('Sign out');
    if (callback) {
      console.log('Callback');
    }
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
