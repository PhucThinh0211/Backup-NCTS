import { useEffect } from 'react';

import { QuickLookup } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { getTabLookupActive } from '@/store/persistState';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

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
