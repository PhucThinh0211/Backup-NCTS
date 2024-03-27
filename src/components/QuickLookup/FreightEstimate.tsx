import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  TimePicker,
  Typography,
} from 'antd';

export const FreightEstimate = () => {
  return (
    <Form layout="vertical" requiredMark>
      <Row style={{ marginBottom: 16 }}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          Tính thử phí hàng nhập
        </Typography.Title>
      </Row>
      <Row gutter={[8, 0]}>
        <Col span={6}>
          <Form.Item label="Giờ hàng về">
            <TimePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Ngày hàng về">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Giờ nhận hàng">
            <TimePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Ngày nhận hàng">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 0]}>
        <Col span={12}>
          <Form.Item label="Trọng lượng (kg)">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Row style={{ paddingLeft: 24 }}>
            <Col span={8}>
              <Form.Item name="radio-group" label=" ">
                <Radio.Group>
                  <Radio value="hangnoidia">Hàng nội địa</Radio>
                  <Radio value="hangquocte">Hàng quốc tế</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="radio-group" label=" ">
                <Radio.Group>
                  <Radio value="hangden">Hàng đến</Radio>
                  <Radio value="hangdi">Hàng đi</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="checkbox-group" label=" ">
                <Row>
                  <Col span={8}>
                    <Checkbox value="A" style={{ lineHeight: '32px' }}>
                      Xử lý hàng
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="B" style={{ lineHeight: '32px' }}>
                      Lưu kho
                    </Checkbox>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Form.Item label="Loại dịch vụ">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label=' '>
            <Row justify="center">
              <Button type="primary" htmlType="submit">
                Tra cứu
              </Button>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
