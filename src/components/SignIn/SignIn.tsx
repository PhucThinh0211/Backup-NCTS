import { useEffect, useState } from 'react';

import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { rememberMe } from '@/common';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { getCaptcha, getCurrentCompany } from '@/store/publicCms';
import { SEO } from '../Seo';
import { appActions } from '@/store/app';
import { reconfigurePersistor } from '@/store/reconfigurePersistor';
import { defaultPersistConfig, persistConfigStorage } from '@/store';
import { CaptchaInput } from '../Captcha';

export const SignIn = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const captcha = useAppSelector(getCaptcha());
  const loading = useAppSelector(getLoading('login'));
  const company = useAppSelector(getCurrentCompany());
  const navigate = useNavigate();
  const location = useLocation();
  const [settingPersistConfig, setSettingPersistConfig] = useState(false);

  const signInSubmit = (values: any) => {
    dispatch(
      appActions.loginRequest({
        input: {
          ...values,
          captchaId: captcha?.captchaId,
          captchaCode: values.verificationCode,
        },
        callback: (pathname?: string) => {
          navigate(location?.state?.from?.pathname || pathname || '/phuc-vu-khach-hang', {
            replace: true,
          });
        },
      })
    );
  };

  const [intervalId, setIntervalId] = useState<any>();
  useEffect(() => {
    if (intervalId && !settingPersistConfig) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId, settingPersistConfig]);

  const rememberChange = (evt: any) => {
    const remember = evt.target.checked;
    setSettingPersistConfig(true);
    // kiểm tra localstorage
    const intvalId = setInterval(() => {
      const persistState = JSON.parse(localStorage.getItem('persist:root') || '{}');
      if ((remember && persistState.app) || (!remember && !persistState.app)) {
        setSettingPersistConfig(false);
      }
    }, 200);
    setIntervalId(intvalId);

    localStorage.setItem(rememberMe, remember);
    remember
      ? reconfigurePersistor(persistConfigStorage.whitelist)
      : reconfigurePersistor(defaultPersistConfig.whitelist);
  };

  return (
    <Spin spinning={settingPersistConfig}>
      <div className="d-flex justify-content-center bg-wave p-3 p-lg-5">
        <SEO
          title={t('Sign In', { ns: 'common' }) + ' - NCTS'}
          description={company?.name || t('NctsTitle', { ns: 'common' })}
        />
        <Form
          layout="vertical"
          onFinish={signInSubmit}
          autoComplete="off"
          initialValues={{
            remember: localStorage.getItem(rememberMe) === 'true' || false,
          }}
          className="col-12 col-md-7 col-lg-5 col-xl-4 col-xxl-3">
          <p className="h6 text-orange">
            {t('Please fill in your login information', { ns: 'common' })}
          </p>
          <Form.Item
            label={t('username', { ns: 'common' })}
            name="username"
            required
            rules={[{ required: true }]}>
            <Input placeholder={t('Enter user name', { ns: 'common' })} />
          </Form.Item>
          <Form.Item
            label={t('Password', { ns: 'common' })}
            name="password"
            required
            rules={[{ required: true }]}>
            <Input.Password placeholder={t('Enter password', { ns: 'common' })} />
          </Form.Item>
          <Form.Item noStyle>
            <CaptchaInput />
          </Form.Item>
          <Form.Item>
            <div className="d-flex justify-content-between align-items-center ant-form-item-label">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox onChange={rememberChange}>{t('Remember', { ns: 'common' })}</Checkbox>
              </Form.Item>
              <Link to="/quen-mat-khau">{t('Forgot password', { ns: 'common' })}</Link>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="d-flex justify-content-between align-items-center ant-form-item-label">
              <span>
                {t('Not a member', { ns: 'common' })}{' '}
                <Link to="/dang-ky">{t('Sign Up', { ns: 'common' })}</Link>
              </span>
              <Button
                type="primary"
                htmlType="submit"
                size="middle"
                className="rounded-5"
                loading={loading}>
                {t('Sign In', { ns: 'common' })}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};
