import { Col, Form, Input, Row} from 'antd';
import { useTranslation } from 'react-i18next';

import { LookupButton } from './components/LookupButton';
import { useAppDispatch } from '@/store/hooks';
import { bootstrapBreakpoints } from '@/common';
import { CaptchaInput } from '../Captcha/CaptchaInput';
import { useWindowSize } from '@/hooks';

export const InvoicesLookup = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common']);
  const [innerWidth] = useWindowSize();

  return (
    <Form requiredMark layout='vertical' autoComplete='off'>
      <Row gutter={[10, 10]}>
        <Col span={24} sm={8} md={8}>
          <Form.Item
            label={t('E-invoice number', { ns: 'common' })}
            required
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24} sm={16} md={12} lg={14}>
          {/* Verification codes */}
          <CaptchaInput />
        </Col>
        {/* Submit button */}
        <Col span={24} md={4} lg={2}>
          <div className='d-flex justify-content-center'>
            <Form.Item
              label={
                innerWidth > bootstrapBreakpoints.md ? (
                  <p className='invisible m-0'>Button</p>
                ) : undefined
              }
            >
              <LookupButton>{t('Lookup', { ns: 'common' })}</LookupButton>
            </Form.Item>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
