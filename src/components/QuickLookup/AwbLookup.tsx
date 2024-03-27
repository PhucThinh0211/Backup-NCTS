import { Button, Form, Input, Row } from 'antd';

export const AwbLookup = () => {
  return (
    <Form layout="vertical" requiredMark>
      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          label="Tên hãng"
          required
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 4px)' }}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Số vận đơn"
          required
          style={{
            marginBottom: 0,
            display: 'inline-block',
            width: 'calc(50% - 4px)',
            marginLeft: 8,
          }}>
          <Form.Item
            name="awbPfx"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 4px)' }}>
            <Input placeholder="XXX" />
          </Form.Item>
          <Form.Item
            name="awbNum"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 4px)', marginLeft: 8 }}>
            <Input placeholder="XXXXXXXX" />
          </Form.Item>
        </Form.Item>
      </Form.Item>
      <Form.Item noStyle>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            Tra cứu
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};
