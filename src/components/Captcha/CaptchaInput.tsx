import { GettingCaptchaLoadingKey } from '@/common';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { getCaptcha, publicCmsActions } from '@/store/publicCms';
import { Form, Row, Input, Space, Spin, Tooltip, Button, InputRef } from 'antd';
import { RefObject, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CaptchaInputProps {
  name?: string;
  inputRef?: RefObject<InputRef>;
}

export const CaptchaInput = ({ name, inputRef }: CaptchaInputProps) => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();

  const fetchingCaptcha = useAppSelector(getLoading(GettingCaptchaLoadingKey));
  const captcha = useAppSelector(getCaptcha());

  const refreshCaptcha = () => {
    dispatch(publicCmsActions.getCaptchaRequest());
  };

  useEffect(() => {
    dispatch(publicCmsActions.getCaptchaRequest());
  }, []);

  return (
    <Form.Item
      label={t('Verification codes', { ns: 'common' })}
      name={name || 'verificationCode'}
      required
      rules={[{ required: true }]}
    >
      <Row align='stretch'>
        <div style={{ flex: 1, marginRight: 8 }}>
          <Form.Item>
            <Input
              ref={inputRef}
              placeholder={t('Enter verification codes', {
                ns: 'common',
              })}
            />
          </Form.Item>
        </div>
        <Space>
          {fetchingCaptcha ? (
            <Spin size='small' style={{ width: 110 }} />
          ) : (
            <img
              // prettier-ignore
              src={captcha?.captchBase64Data ? `data:image/png;base64,${captcha?.captchBase64Data}` : ''}
              alt='captcha code'
              className='border rounded'
              style={{ height: 32 }}
            />
          )}
          <Tooltip title={t('Refresh captcha', { ns: 'common' })}>
            <Button
              onClick={refreshCaptcha}
              shape='circle'
              disabled={fetchingCaptcha}
            >
              <i className='fa-solid fa-rotate'></i>
            </Button>
          </Tooltip>
        </Space>
      </Row>
    </Form.Item>
  );
};
