import { useEffect, useRef } from 'react';

import { Button, Form, Input, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { SEO } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { getCurrentCompany } from '@/store/publicCms';

export const ForgotPassword = () => {
  const { t } = useTranslation();
  const company = useAppSelector(getCurrentCompany());
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const retrievePassword = (values: any) => {
    console.log(values);
  };

  return (
    <div className="d-flex justify-content-center bg-wave p-3 p-lg-5" ref={scrollRef}>
      <SEO
        title={t('Forgot password', { ns: 'common' }).replace('?', '') + ' - NCTS'}
        description={company?.name || t('NctsTitle', { ns: 'common' })}
      />
      <div className="clearfix">
        <p className="h6 text-orange">
          {t('Please enter your email to retrieve your password', { ns: 'common' })}
        </p>
        <p>{t('forgotPasswordDescription', { ns: 'common' })}</p>
        <Form layout="vertical" onFinish={retrievePassword} className="col-12 col-md-7 col-lg-6">
          <Form.Item
            label={t('Email address', { ns: 'common' })}
            name="email"
            required
            rules={[{ required: true }]}>
            <Input placeholder="example@domain.vn" />
          </Form.Item>
          <Form.Item className="d-flex justify-content-end">
            <Space>
              <Link to="/dang-nhap">
                <Button>{t('Sign In', { ns: 'common' })}</Button>
              </Link>
              <Button type="primary" htmlType="submit">
                {t('Send email', { ns: 'common' })}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
