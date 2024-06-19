import {
  Button,
  Col,
  Form,
  Input,
  InputRef,
  Row,
  Space,
  Spin,
  Tooltip,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { LookupButton } from './components/LookupButton';
import { getCaptcha, publicCmsActions } from '@/store/publicCms';
import { useRef } from 'react';
import { GettingCaptchaLoadingKey, lookupAwbLoadingKey } from '@/common';
import { getLookupAwbPayload, webTrackActions } from '@/store/webTrack';

const INPUT_LENGTH = {
  AWB_PFX: {
    MAX: 3,
  },
  AWB_NUM: {
    MAX: 8,
  },
};

export const AwbLookup = () => {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const lookupAwbPayload = useAppSelector(getLookupAwbPayload());
  const captcha = useAppSelector(getCaptcha());
  const fetchingCaptcha = useAppSelector(getLoading(GettingCaptchaLoadingKey));
  const lookupLoading = useAppSelector(getLoading(lookupAwbLoadingKey));

  const awbInputRef = useRef<InputRef>(null);
  const captchaInputRef = useRef<InputRef>(null);

  const handleLookup = (values: any) => {
    const lookupPayload = {
      AWB_NO: `${values.awbPfx}${values.awbNum}`,
      CaptchaId: captcha?.captchaId,
      CaptchaCode: values.verificationCode,
    };
    dispatch(webTrackActions.setLookupAwbPayload(values));
    dispatch(
      webTrackActions.lookupAwbRequest({ lookupInput: lookupPayload, navigate })
    );
  };

  const refreshCaptcha = () => {
    dispatch(publicCmsActions.getCaptchaRequest());
  };

  const onAwbPfxKeyUp = (e: any) => {
    const value = e.target.value;
    if (value?.length >= INPUT_LENGTH.AWB_PFX.MAX) {
      if (awbInputRef.current) awbInputRef.current.focus();
    }
  };

  const onAwbNumKeyUp = (e: any) => {
    const value = e.target.value;

    if (value?.length >= INPUT_LENGTH.AWB_NUM.MAX) {
      if (captchaInputRef.current) captchaInputRef.current.focus();
    }
  };

  return (
    <Form
      requiredMark
      layout='vertical'
      autoComplete='off'
      initialValues={{
        ...lookupAwbPayload,
        verificationCode: undefined,
      }}
      onFinish={handleLookup}
      className='w-100'
    >
      <Form.Item className='d-flex flex-column '>
        <Form.Item label={t('AWB number', { ns: 'common' })} required>
          <Row gutter={[10, 10]}>
            <Col span={8} sm={8}>
              <Form.Item
                name='awbPfx'
                rules={[
                  {
                    pattern: /^[\d]{0,3}$/,
                    message: 'Value must be 3 numbers',
                  },
                ]}
              >
                <Input
                  placeholder='Prefix'
                  maxLength={INPUT_LENGTH.AWB_PFX.MAX}
                  onKeyUp={onAwbPfxKeyUp}
                />
              </Form.Item>
            </Col>
            <Col span={16} sm={16}>
              <Form.Item
                name='awbNum'
                rules={[
                  {
                    pattern: /^[\d]{0,8}$/,
                    message: 'Value must be 8 numbers',
                  },
                ]}
              >
                <Input
                  placeholder='AWB#'
                  ref={awbInputRef}
                  maxLength={INPUT_LENGTH.AWB_NUM.MAX}
                  onKeyUp={onAwbNumKeyUp}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form.Item>
      <Form.Item
        label={t('Verification codes', { ns: 'common' })}
        name='verificationCode'
        required
        rules={[{ required: true }]}
      >
        <Row align='stretch'>
          <div style={{ flex: 1, marginRight: 8 }}>
            <Form.Item>
              <Input
                placeholder={t('Enter verification codes', {
                  ns: 'common',
                })}
                ref={captchaInputRef}
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
      <Form.Item noStyle>
        <div className='w-100 align-self-end pt-1'>
          <LookupButton loading={lookupLoading}>
            {t('Lookup', { ns: 'common' })}
          </LookupButton>
        </div>
      </Form.Item>
    </Form>
  );
};
