import { Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { LookupButton } from './components/LookupButton';

export const InvoicesLookup = () => {
  const { t } = useTranslation(['common']);

  return (
    <Form requiredMark layout='vertical' autoComplete='off'>
      <Form.Item
        label={t('E-invoice number', { ns: 'common' })}
        required
        rules={[{ required: true }]}
      >
        <Input
          style={{
            height: '40px',
            borderRadius: 10,
          }}
        />
      </Form.Item>
      {/* Verification codes */}
      <Form.Item label={t('Verification codes', { ns: 'common' })} required>
        <Row gutter={[10, 10]}>
          <Col flex='auto'>
            <Form.Item name='verificationCodes' rules={[{ required: true }]}>
              <Input
                style={{
                  height: '40px',
                  borderRadius: 10,
                }}
                placeholder={t('Enter verification codes', { ns: 'common' })}
              />
            </Form.Item>
          </Col>
          <Col flex='140px'>
            <div
              className='verification w-100'
              style={{
                height: '40px',
                borderRadius: 10,
                alignContent: 'center',
              }}
            >
              <img
                src='https://ncts.hicas.vn/api/photo/dowload/7d2cc5be-d112-f84f-8c63-3a12926fd666.png'
                alt=''
              />
            </div>
          </Col>
        </Row>
      </Form.Item>
      {/* Submit button */}
      <Form.Item noStyle>
        <div className='w-100 align-self-end pt-1'>
          <LookupButton>{t('Lookup', { ns: 'common' })}</LookupButton>
        </div>
      </Form.Item>
    </Form>
  );
};
