import React, { Suspense } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { getAuthRouters } from './AuthRoute';
import { routers } from './routers';
import { Loading, Startup } from '@/components';
import { NotAuth } from '@/pages';
import { useAppSelector } from '@/store/hooks';
import { getGrantedPolicies } from '@/store/app';

export const AppRouter = () => {
  const grantedPolicies = useAppSelector(getGrantedPolicies());

  const _routers = getAuthRouters({
    routers,
    noAuthElement: () => <NotAuth />,
    auth: Object.keys(grantedPolicies) || [],
  });

  return (
    <Suspense fallback={<Startup />}>
      <RouterProvider
        router={createBrowserRouter(_routers, { basename: '/' })}
        // route loader loading
        fallbackElement={<Loading />}
      />
    </Suspense>
  );
};
