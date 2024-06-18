import React from 'react';

import { useLocation, Navigate } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';
import { getAuthenticated } from '@/store/app';

interface RequireAuthProps {
  children: JSX.Element;
}
export const RequireAuth = ({ children }: RequireAuthProps) => {
  const auth = useAppSelector(getAuthenticated());
  const location = useLocation();

  if (!auth?.token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
  }

  return children;
}; 
