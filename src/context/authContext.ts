import * as React from 'react';

interface AuthContextType {
  user: any;
  signin: (input: any, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);