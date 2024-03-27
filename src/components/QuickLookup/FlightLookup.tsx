import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import dayjs from 'dayjs';

export const FlightLookup = () => {
  return (
    <Form layout="vertical" initialValues={{ dateFlight: dayjs(), routing: 'di' }}>
      <Form.Item style={{ marginBottom: 0 }} rules={[{ required: true }]}>
        <Form.Item
          label="Tên hãng"
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
            label="Ngày bay"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 4px)' }}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="routing"
            label="Lịch trình"
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
                Tra cứu
              </Button>
            </Row>
          </Form.Item>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};
