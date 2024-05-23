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
    <div className=' container-md'>
      <Form layout='vertical' requiredMark autoComplete='off'>
        <Row style={{ marginBottom: 16 }}>
          <h5 className='pb-3' style={{ color: '#FFB629' }}>
            {'Tính thử phí hàng nhập'}
          </h5>
        </Row>
        <Row gutter={[8, 0]}>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label='Giờ hàng về'>
              <TimePicker
                style={{ height: '40px', borderRadius: 10, width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label='Ngày hàng về'>
              <DatePicker
                style={{ height: '40px', borderRadius: 10, width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label='Giờ nhận hàng'>
              <TimePicker
                style={{ height: '40px', borderRadius: 10, width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label='Ngày nhận hàng'>
              <DatePicker
                style={{ height: '40px', borderRadius: 10, width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item label='Trọng lượng (kg)'>
              <Input
                style={{ height: '40px', borderRadius: 10, width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label='Loại dịch vụ'>
              <Input
                style={{ height: '40px', borderRadius: 10, width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Row>
              <Col xs={24} sm={12}>
                <Form.Item name='radio-group'>
                  <Radio.Group>
                    <Radio value='hangnoidia'>
                      {t('Domestic', { ns: 'common' })}
                    </Radio>
                    <Radio value='hangquocte'>
                      {t('International', { ns: 'common' })}
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name='radio-group'>
                  <Radio.Group>
                    <Radio value='hangden'>
                      {t('Inbound', { ns: 'common' })}
                    </Radio>
                    <Radio value='hangdi'>
                      {t('Outbound', { ns: 'common' })}
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={16}>
            <Form.Item name='checkbox-group'>
              <Row>
                <Col span={8}>
                  <Checkbox value='A' style={{ lineHeight: '32px' }}>
                    {t('Process items', { ns: 'common' })}
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value='B' style={{ lineHeight: '32px' }}>
                    {t('Storage', { ns: 'common' })}
                  </Checkbox>
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item>
              <Row justify={window.innerWidth < 576 ? 'center' : 'end'}>
                <Button type='primary' htmlType='submit'>
                  {t('Lookup', { ns: 'common' })}
                </Button>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
