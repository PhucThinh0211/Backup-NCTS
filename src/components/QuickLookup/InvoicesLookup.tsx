import { Button, DatePicker, Form, Input, Radio, Row } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export const InvoicesLookup = () => {
  const { t } = useTranslation(['common']);

  return (
    <div className='custom-container'>
      <h5 className="my-4 mb-5"> {t('Lookup Flight', { ns: 'common' })}</h5>
    <Form requiredMark className="d-flex flex-row gap-4" layout="vertical" initialValues={{ dateFlight: dayjs(), routing: 'di' }} autoComplete="off">
      <Form.Item rules={[{ required: true }]} className="d-flex flex-column form-item-left">
        <Form.Item
          label={t('Carrier', { ns: 'common' })}
          required
          rules={[{ required: true }]}
          style={{
            display: "inline-block",
            width: "calc(100%)",
            marginBottom: 0,
          }}>
          <Input style={{
                height: "40px",
                borderRadius: 10
              }}/>
          <Form.Item
            name="dateFlight"
            label={t('Flight date', { ns: 'common' })}
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(100%)",
              marginBottom: 0,
            }}>
            <DatePicker  style={{
                height: "40px",
                width: "100%",
                borderRadius: 10
              }} />
          </Form.Item>
          <Form.Item
            name="routine"
            label={t('Routine', { ns: 'common' })}
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(100%)', marginLeft: 8 }}>
             <Radio.Group >
              <Radio value={"di"}>{t('Arrival', { ns: 'common' })}</Radio>
              <Radio value={"den"}>{t('Departure', { ns: 'common' })}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item 
          style={{marginTop:50}}
          >
            <Row justify="start">
              <Button type="primary" htmlType="submit" style={{
                fontWeight:600,
                fontSize: "18px",
                height:"48px",
                }}>
                {t('Log in', { ns: 'home' })}
              </Button>
            </Row>
          </Form.Item>
        </Form.Item>
      </Form.Item>
        <div
          className="d-none d-md-flex justify-content-center form-item-right">  
            <img src="https://sit.ntcs.hicas.vn/api/photo/dowload/6e9e0536-e0f6-6ecd-f117-3a12634d56ac.png" alt="1" width='80%'/>
          </div>
    </Form></div>
  );
};
