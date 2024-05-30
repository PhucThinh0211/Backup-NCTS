import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/store/hooks';
import { getCurrentCompany } from '@/store/publicCms';
interface SeoProps {
  title?: string;
  description?: string;
}

export const SEO = ({ title, description }: SeoProps) => {
  const {t} = useTranslation('common');
  const company = useAppSelector(getCurrentCompany());

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title || company?.name || t('NctsTitle')}</title>
      <meta name="description" content={description || company?.name || t('NctsTitle')} />
      {/* End standard metadata tags */}
    </Helmet>
  );
};
