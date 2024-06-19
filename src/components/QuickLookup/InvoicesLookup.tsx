import { Button, Col, Form, Input, Row, Space, Spin, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { LookupButton } from './components/LookupButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCaptcha, publicCmsActions } from '@/store/publicCms';
import { GettingCaptchaLoadingKey } from '@/common';
import { getLoading } from '@/store/loading';
import { CaptchaInput } from '../Captcha/CaptchaInput';

export const InvoicesLookup = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common']);

  return (
    <Form requiredMark layout='vertical' autoComplete='off'>
      <Form.Item
        label={t('E-invoice number', { ns: 'common' })}
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      {/* Verification codes */}
      <CaptchaInput />
      {/* Submit button */}
      <Form.Item noStyle>
        <div className='w-100 align-self-end pt-1'>
          <LookupButton>{t('Lookup', { ns: 'common' })}</LookupButton>
        </div>
      </Form.Item>
    </Form>
  );
};
