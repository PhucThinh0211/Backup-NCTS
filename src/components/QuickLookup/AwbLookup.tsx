import { useRef } from 'react';
import { Col, Form, Input, InputRef, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { getCaptcha } from '@/store/publicCms';
import { bootstrapBreakpoints, lookupAwbLoadingKey } from '@/common';
import { useWindowSize } from '@/hooks';
import { getLookupAwbPayload, webTrackActions } from '@/store/webTrack';
import { CaptchaInput } from '../Captcha/CaptchaInput';
import { LookupButton } from './components/LookupButton';

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
  const [innerWidth] = useWindowSize();

  const lookupAwbPayload = useAppSelector(getLookupAwbPayload());
  const captcha = useAppSelector(getCaptcha());
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
      <Row gutter={[10, 10]}>
        <Col span={24} md={10}>
          <Form.Item label={t('AWB number', { ns: 'common' })} required>
            <Row gutter={[10, 10]}>
              <Col span={8} sm={10}>
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
              <Col span={16} sm={14}>
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
        </Col>
        <Col span={24} md={10}>
          <CaptchaInput inputRef={captchaInputRef} />
        </Col>
        <Col span={24} md={4}>
          <div className='d-flex justify-content-center'>
            <Form.Item
              label={
                innerWidth > bootstrapBreakpoints.md ? (
                  <p className='invisible m-0'>Button</p>
                ) : undefined
              }
            >
              <LookupButton loading={lookupLoading}>
                {t('Lookup', { ns: 'common' })}
              </LookupButton>
            </Form.Item>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
