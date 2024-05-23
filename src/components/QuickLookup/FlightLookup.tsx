import { Button, Col, DatePicker, Form, Input, Radio, Row } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { LookupButton } from "./components/LookupButton";

export const FlightLookup = () => {
  const { t } = useTranslation(["common"]);
  const options = [
    { label: t("Arrival", { ns: "common" }), value: 'di' },
    { label: t("Departure", { ns: "common" }), value: 'den' },
  ];

  return (
      <Form
        requiredMark
        layout="vertical"
        autoComplete="off"
        initialValues={{ dateFlight: dayjs(), routing: "di" }}
      >
        <Row
          gutter={[8, 0]}
          className="flight-lookup d-flex align-items-center"
        >
          <Col xs={24} sm={24} md={8} lg={8}>
            <Form.Item
              label={t("Carrier", { ns: "common" })}
              required
              rules={[{ required: true }]}
            >
              <Input
                style={{
                  height: "40px",
                  borderRadius: 10,
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={10} sm={14} md={8} lg={7}>
            <Form.Item
              name="dateFlight"
              label={t("Flight date", { ns: "common" })}
              rules={[{ required: true }]}
            >
              <DatePicker
                style={{
                  height: "40px",
                  width: "100%",
                  borderRadius: 10,
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={14} sm={10} md={8} lg={9}>
            <Radio.Group className="" options={options}  optionType="button" buttonStyle="solid"/>
          </Col>
        </Row>
        <Form.Item
          label={t('Verification codes', { ns: 'common' })}
          required
        >
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
        <Form.Item noStyle>
          <div className="w-100 align-self-end pt-1">
            <LookupButton>{t("Lookup", { ns: "common" })}</LookupButton>
          </div>
        </Form.Item>
      </Form>
  );
};
