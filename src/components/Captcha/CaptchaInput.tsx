import { GettingCaptchaLoadingKey } from '@/common';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { getCaptcha, publicCmsActions } from '@/store/publicCms';
import Utils from '@/utils';
import { Form, Row, Input, Space, Spin, Tooltip, Button } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CaptchaInputProps {
  name?: string;
}

export const CaptchaInput = ({ name }: CaptchaInputProps) => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();

  const fetchingCaptcha = useAppSelector(getLoading(GettingCaptchaLoadingKey));
  const captcha = useAppSelector(getCaptcha());

  const refreshCaptcha = () => {
    dispatch(publicCmsActions.getCaptchaRequest());
  };

  const getCaptchaNeeded = () => {
    const now = Date();
    const expiresIn = captcha ? new Date(captcha.expirationTime) : now;
    if (!captcha || now >= expiresIn) {
      dispatch(publicCmsActions.getCaptchaRequest());
    }
  };

  useEffect(() => {
    getCaptchaNeeded();
  }, [captcha]);

  

  return (
    <Form.Item
      label={t('Verification codes', { ns: 'common' })}
      name={name || 'verificationCode'}
      required
      rules={[{ required: true }]}>
      <Row align="stretch">
        <div style={{ flex: 1, marginRight: 8 }}>
          <Form.Item>
            <Input
              placeholder={t('Enter verification codes', {
                ns: 'common',
              })}
              onFocus={getCaptchaNeeded}
            />
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
            <Button onClick={refreshCaptcha} shape="circle" disabled={fetchingCaptcha}>
              <i className="fa-solid fa-rotate"></i>
            </Button>
          </Tooltip>
        </Space>
      </Row>
    </Form.Item>
  );
};
