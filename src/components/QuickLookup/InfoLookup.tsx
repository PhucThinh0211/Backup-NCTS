import { Button, Form, Input, Row } from 'antd';

export const InfoLookup = () => {
  return (
    <Form layout="vertical" requiredMark>
      <Form.Item label="Nhập từ tìm kiếm" required>
        <Input />
      </Form.Item>
      <Form.Item noStyle>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            Tìm kiếm
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};
