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
import { useTranslation } from 'react-i18next';

export const FreightEstimate = () => {
  const { t } = useTranslation(['common']);

  return (
    <Form layout="vertical" requiredMark autoComplete="off">
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
          <Form.Item label="Loại dịch vụ">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <Form.Item name="radio-group">
                <Radio.Group>
                  <Radio value="hangnoidia">{t('Domestic', { ns: 'common' })}</Radio>
                  <Radio value="hangquocte">{t('International', { ns: 'common' })}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="radio-group">
                <Radio.Group>
                  <Radio value="hangden">{t('Inbound', { ns: 'common' })}</Radio>
                  <Radio value="hangdi">{t('Outbound', { ns: 'common' })}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <Form.Item name="checkbox-group">
            <Row>
              <Col span={8}>
                <Checkbox value="A" style={{ lineHeight: '32px' }}>
                  {t('Process items', { ns: 'common' })}
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="B" style={{ lineHeight: '32px' }}>
                  {t('Storage', { ns: 'common' })}
                </Checkbox>
              </Col>
            </Row>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Row justify="end">
              <Button type="primary" htmlType="submit">
                {t('Lookup', { ns: 'common' })}
              </Button>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
