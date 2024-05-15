import { Button, Col, DatePicker, Form, Input, Radio, Row, Segmented } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export const FlightLookup = () => {
  const { t } = useTranslation(['common']);

  return (
    <div className="w-75">
    <Form
      requiredMark
      layout='vertical'
      autoComplete="off"
      initialValues={{ dateFlight: dayjs(), routing: "di" }}
    >
      <Row gutter={[8, 0]} className=" flight-lookup d-flex align-items-center">
        <Col xs={24} sm={12} md={9}>
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
          </Form.Item> </Col>
          <Col xs={24} sm={12} md={9}>
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
          </Form.Item></Col>
          <Col >
          <Segmented
          style={{width: "calc(100%)",
            display: "inline-block"
          }}
          // onChange={()}
          options={[
            t("Arrival", { ns: "common" }),
            t("Departure", { ns: "common" }),
          ]}
        /></Col>
        </Row>
        <Form.Item
          label={t("Verification codes", { ns: "common" })}
          required
          style={{
            display: "inline-block",
            width: "calc(100%)",
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="awbPfx"
            rules={[{ required: true }]}
            style={{ display: "inline-block", 
            width: "calc(70% - 4px)" 
          }}
          >
            <Input style={{
              height: "40px",
              borderRadius: 10
            }} placeholder={t("Enter verification codes", { ns: "common" })} />
          </Form.Item>
          <div className="verification" style={{
              display: "inline-block",
              height: "40px",
              width: "calc(30% - 4px)",
              borderRadius: 10,
              alignContent: "center",
              marginLeft: 8,
            }} >
              <img src="http://ncts.vn/images/ThuVien/Banner/vi/banner-cargo-5.jpg" alt="" />
            </div>
        </Form.Item>
        <Form.Item noStyle>
          <div className="w-100 align-self-end">
            <Button type="primary" htmlType="submit" 
            style={{
              fontWeight:600,
              fontSize: "18px",
              height:"48px",
              width : "calc(100%)",
              }}>
              {t("Lookup", { ns: "common" })}
            </Button>
          </div>
        </Form.Item>
      
    </Form>
  </div>
);
};