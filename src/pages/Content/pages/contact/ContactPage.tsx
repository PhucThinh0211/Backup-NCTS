import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Col, Row } from 'antd';

import SessionTitle from '@/components/SessionTitle/SessionTitle';
import { CompanySection } from './components/CompanySection';
import { ContactForm } from './components/ContactForm';
import { DepartmentsSection } from './components/DepartmentsSection';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLanguage } from '@/store/persistState';
import { publicCmsActions } from '@/store/publicCms';
import { bootstrapBreakpoints, largePagingParams } from '@/common';

export const ContactPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const lang = useAppSelector(getLanguage());

  useEffect(() => {
    dispatch(
      publicCmsActions.getDepartmentsRequest({ params: largePagingParams })
    );
  }, [lang]);

  return (
    <div
      className='px-3 px-lg-5 py-2 pb-4 py-lg-4 mx-auto'
      style={{ maxWidth: 1920, backgroundColor: 'white' }}
    >
      <SessionTitle title={t('Contact us')} />
      <div className=' my-2 my-lg-5'>
        <Row gutter={[80, 10]}>
          <Col
            xs={{
              span: 24,
              order: 1,
            }}
            md={{
              span: 10,
              order: 1,
            }}
          >
            <CompanySection />
          </Col>
          <Col
            xs={{
              span: 24,
              order: 3,
            }}
            md={{
              span: 14,
              order: 2,
            }}
          >
            <ContactForm />
          </Col>
          <Col
            xs={{
              span: 24,
              order: 2,
            }}
            md={{
              span: 24,
              order: 3,
            }}
          >
            <DepartmentsSection />
          </Col>
        </Row>
      </div>
    </div>
  );
};
