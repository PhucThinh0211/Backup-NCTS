import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Col, Row } from 'antd';

import SessionTitle from '@/components/SessionTitle/SessionTitle';
import { CompanySection } from './components/CompanySection';
import { ContactForm } from './components/ContactForm';
import { DepartmentsSection } from './components/DepartmentsSection';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLanguage } from '@/store/persistState';
import { getCurrentCompany, publicCmsActions } from '@/store/publicCms';
import { largePagingParams } from '@/common';

export const ContactPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const lang = useAppSelector(getLanguage());
  const company = useAppSelector(getCurrentCompany());

  useEffect(() => {
    dispatch(publicCmsActions.getDepartmentsRequest({ params: largePagingParams }));
  }, [lang]);

  return (
    <div
      className="px-3 px-lg-5 py-2 pb-4 py-lg-4 mx-auto"
      style={{ maxWidth: 1920, backgroundColor: 'white' }}>
      <SessionTitle title={t('Contact us', { ns: 'common' })} titleLayer="NCTS" />
      <div className="container mt-2 mt-lg-4">
        <div className="row">
          <div className="col-12 col-lg-5">
            <div>
              <CompanySection />
            </div>
          </div>
          <div className="col-12 col-lg-7">
            {company?.googleMapsEmbed && (
              <div className="h-100 pb-0 pb-lg-2 px-2">
                <div
                  className="google-maps rounded-2 my-3 mt-lg-0 h-100"
                  dangerouslySetInnerHTML={{ __html: company.googleMapsEmbed || '' }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <DepartmentsSection />
        </div>
      </div>
    </div>
  );
};
