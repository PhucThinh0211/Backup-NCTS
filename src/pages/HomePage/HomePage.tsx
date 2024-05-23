import { useEffect } from 'react';

import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

import { QuickLookup } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { getTabLookupActive } from '@/store/persistState';

export const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabLookupActive = useAppSelector(getTabLookupActive());

  useEffect(() => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
          tab: tabLookupActive
      }).toString()
  });
  }, [tabLookupActive]);

  return (
    <div>
      <div className='w-full'>
        <QuickLookup />
      </div>
    </div>
  );
};
