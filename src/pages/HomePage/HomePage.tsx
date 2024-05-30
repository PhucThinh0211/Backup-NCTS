import { useEffect } from 'react';

import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

import { QuickLookup, SEO } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { getTabLookupActive } from '@/store/persistState';
import { NewsSection } from '@/components/NewsSection';
import { useTranslation } from 'react-i18next';
import { getCurrentCompany } from '@/store/publicCms';
import { ServicesSection } from './ServicesSection';
import { IntroduceSection } from './IntroduceSection';

export const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const company = useAppSelector(getCurrentCompany());
  const tabLookupActive = useAppSelector(getTabLookupActive());

  useEffect(() => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        tab: tabLookupActive,
      }).toString(),
    });
  }, [tabLookupActive]);

  return (
    <div>
      <SEO title={t('Home', { ns: 'common' }) + '- NCTS'} description={company?.name || "NCTS"} />
      <div className="w-full">
        <QuickLookup />
        <NewsSection />
        <ServicesSection />
        <IntroduceSection />
      </div>
    </div>
  );
};
