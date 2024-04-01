import React, { Suspense } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { getAuthRouters } from './AuthRoute';
import { routers } from './routers';
import { Loading } from '@/components';
import { useAuth } from '@/hooks';
import { NotAuth } from '@/pages';

export const AppRouter = () => {
  const auth = useAuth();

  const _routers = getAuthRouters({
    routers,
    noAuthElement: () => <NotAuth />,
    auth: auth.user?.roles || [],
  });

  return (
    <Suspense fallback={null}>
      <RouterProvider
        router={createBrowserRouter(_routers, { basename: '/' })}
        // route loader loading
        fallbackElement={<Loading />}
      />
    </Suspense>
  );
};
