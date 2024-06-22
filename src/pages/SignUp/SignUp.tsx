
import { useRef } from 'react';

import { Button, Form, Input, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { CaptchaInput, SEO } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { getCurrentCompany } from '@/store/publicCms';

export const SignUp = () => {
  const { t } = useTranslation();
  const company = useAppSelector(getCurrentCompany());
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <SEO title={t('Member registration', { ns: 'common' }) + ' - NCTS'} description={company?.name || t('NctsTitle', {ns: 'common'})} />
      <div className="d-flex justify-content-center bg-wave p-3 p-lg-5 clearfix" ref={scrollRef}>
        <div className="col-12 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
          <p className="h6 text-orange">{t('Member registration', { ns: 'common' })}</p>
          <Form layout="vertical" autoComplete="off">
            <Form.Item
              label={t('Attachment', { ns: 'common' })}
              required
              extra={
                <div
                  dangerouslySetInnerHTML={{
                    __html: t('downloadFileToRegisMemeber', {
                      ns: 'common',
                      link: 'link download',
                    }),
                  }}
                />
              }>
              <Input />
            </Form.Item>
            <Form.Item>
              <div className="row g-2">
                <div className="col-12 col-md-6">
                  <Form.Item
                    label={t('First name', { ns: 'common' })}
                    name="firstname"
                    required
                    rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-12 col-md-6">
                  <Form.Item
                    label={t('Last name', { ns: 'common' })}
                    name="lastname"
                    required
                    rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </div>
              </div>
            </Form.Item>
            <Form.Item>
              <div className="row g-2">
                <div className="col-6 col-md-6">
                  <Form.Item
                    label={t('Birthday', { ns: 'common' })}
                    name="birthday"
                    required
                    rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-6 col-md-6">
                  <Form.Item
                    label={t('Gender', { ns: 'common' })}
                    name="gender"
                    required
                    rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </div>
              </div>
            </Form.Item>
            <Form.Item
              label={t('Company name', { ns: 'common' })}
              name="company"
              required
              rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label={t('Address', { ns: 'common' })}
              name="address"
              required
              rules={[{ required: true }]}>
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              label={t('TaxCode', { ns: 'common' })}
              name="taxtId"
              required
              rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <div className="row g-2">
                <div className="col-12 col-md-6">
                  <Form.Item
                    label={t('Phone', { ns: 'common' })}
                    name="phone"
                    required
                    rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-12 col-md-6">
                  <Form.Item
                    label={t('Email address', { ns: 'common' })}
                    name="email"
                    required
                    rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </div>
              </div>
            </Form.Item>
            <Form.Item label={t('Purpose', { ns: 'common' })}>
              <Input />
            </Form.Item>
            <Form.Item noStyle>
              <CaptchaInput />
            </Form.Item>
            <Form.Item className="d-flex justify-content-start mt-3">
              <Space>
                <Link to="/dang-nhap">
                  <Button>{t('Sign In', { ns: 'common' })}</Button>
                </Link>
                <Button type="primary" htmlType="submit">
                  {t('Sign Up', { ns: 'common' })}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
