import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { LookupButton } from './components/LookupButton';
import { CaptchaInput } from '../Captcha';

export const OnlineCheckin = () => {
  const { t } = useTranslation(['common']);

  return (
    <div className='onlineCheckin'>
      <div className='d-flex justify-content-center container-md'>
        <Form
          layout='vertical'
          autoComplete='off'
          className='col-12 col-md-7 col-lg-5 col-xl-4 col-xxl-3 w-100'
        >
          <p className='h6 text-orange'>
            {t('Please fill in your login information', { ns: 'common' })}
          </p>
          <Form.Item
            label={t('username', { ns: 'common' })}
            name='username'
            required
            rules={[{ required: true }]}
          >
            <Input
              placeholder={t('Enter user name', { ns: 'common' })}
            />
          </Form.Item>
          <Form.Item
            label={t('Password', { ns: 'common' })}
            name='password'
            required
            rules={[{ required: true }]}
          >
            <Input placeholder={t('Enter password', { ns: 'common' })} />
          </Form.Item>
          <Form.Item noStyle>
            <CaptchaInput />
          </Form.Item>
          <div className='mt-2'>
            <LookupButton>{t('Sign In', { ns: 'common' })}</LookupButton>
          </div>
        </Form>
      </div>
    </div>
  );
};
