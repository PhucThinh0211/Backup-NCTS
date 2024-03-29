import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export const FlightLookup = () => {
  const { t } = useTranslation(['common']);

  return (
    <Form layout="vertical" initialValues={{ dateFlight: dayjs(), routing: 'di' }}>
      <Form.Item style={{ marginBottom: 0 }} rules={[{ required: true }]}>
        <Form.Item
          label={t('Carrier', { ns: 'common' })}
          required
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 4px)' }}>
          <Input />
        </Form.Item>
        <Form.Item
          required
          style={{
            marginBottom: 0,
            display: 'inline-block',
            width: 'calc(50% - 4px)',
            marginLeft: 8,
          }}>
          <Form.Item
            name="dateFlight"
            label={t('Flight date', { ns: 'common' })}
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 4px)' }}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="routine"
            label={t('Routine', { ns: 'common' })}
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 4px)', marginLeft: 8 }}>
            <Select
              options={[
                { value: 'di', label: 'Đi' },
                { value: 'den', label: 'Đến' },
              ]}
            />
          </Form.Item>
          <Form.Item noStyle>
            <Row justify="end">
              <Button type="primary" htmlType="submit">
                {t('Lookup', { ns: 'common' })}
              </Button>
            </Row>
          </Form.Item>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};
