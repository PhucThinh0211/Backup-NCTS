import { useEffect } from 'react';

import { Button, Checkbox, Form, Input, Row, Space, Spin, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { GettingCaptchaLoadingKey } from '@/common';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { getCaptcha, getCurrentCompany, publicCmsActions } from '@/store/publicCms';
import { SEO } from '../Seo';

export const SignIn = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const captcha = useAppSelector(getCaptcha());
  const fetchingCaptcha = useAppSelector(getLoading(GettingCaptchaLoadingKey));
  const company = useAppSelector(getCurrentCompany());

  useEffect(() => {
    dispatch(publicCmsActions.getCaptchaRequest());
  }, []);

  const getCaptchaCode = () => {
    dispatch(publicCmsActions.getCaptchaRequest());
  };

  const signInSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="d-flex justify-content-center bg-wave p-3 p-lg-5">
      <SEO title={t('Sign In', { ns: 'common' }) + ' - NCTS'} description={company?.name || t('NctsTitle', {ns: 'common'})} />
      <Form
        layout="vertical"
        onFinish={signInSubmit}
        autoComplete="off"
        className="col-12 col-md-7 col-lg-5 col-xl-4 col-xxl-3">
        <p className="h6 text-orange">
          {t('Please fill in your login information', { ns: 'common' })}
        </p>
        <Form.Item
          label={t('username', { ns: 'common' })}
          name="username"
          required
          rules={[{ required: true }]}>
          <Input placeholder={t('Enter user name', { ns: 'common' })} autoFocus />
        </Form.Item>
        <Form.Item
          label={t('Password', { ns: 'common' })}
          name="password"
          required
          rules={[{ required: true }]}>
          <Input placeholder={t('Enter password', { ns: 'common' })} />
        </Form.Item>
        <Form.Item
          label={t('Verification codes', { ns: 'common' })}
          name="captchaCode"
          required
          rules={[{ required: true }]}>
          <Row align="stretch">
            <div style={{ flex: 1, marginRight: 8 }}>
              <Form.Item>
                <Input placeholder={t('Enter verification codes', { ns: 'common' })} />
              </Form.Item>
            </div>
            <Space>
              {fetchingCaptcha ? (
                <Spin size="small" style={{ width: 110 }} />
              ) : (
                <img
                  // prettier-ignore
                  src={captcha?.captchBase64Data ? `data:image/png;base64,${captcha?.captchBase64Data}` : ''}
                  alt="captcha code"
                  className="border rounded"
                  style={{ height: 32 }}
                />
              )}
              <Tooltip title={t('Refresh captcha', { ns: 'common' })}>
                <Button onClick={getCaptchaCode} shape="circle" disabled={fetchingCaptcha}>
                  <i className="fa-solid fa-rotate"></i>
                </Button>
              </Tooltip>
            </Space>
          </Row>
        </Form.Item>
        <Form.Item>
          <div className="d-flex justify-content-between align-items-center ant-form-item-label">
            <Form.Item name='remember' valuePropName="checked">
              <Checkbox>{t('Remember', {ns: 'common'})}</Checkbox>
            </Form.Item>
            <Link to='/quen-mat-khau'>{t('Forgot password', { ns: 'common' })}</Link>
          </div>
        </Form.Item>
        <Form.Item>
          <div className="d-flex justify-content-between align-items-center ant-form-item-label">
            <span>
              {t('Not a member', { ns: 'common' })}{' '}
              <Link to='/dang-ky'>{t('Sign Up', { ns: 'common' })}</Link>
            </span>
            <Button type="primary" htmlType="submit" size="middle" className="rounded-5">
              {t('Sign In', { ns: 'common' })}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
