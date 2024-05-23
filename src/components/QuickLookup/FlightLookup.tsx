import { Button, Col, DatePicker, Form, Input, Radio, Row, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { LookupButton } from "./components/LookupButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCaptcha, publicCmsActions } from "@/store/publicCms";

export const FlightLookup = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["common"]);
  const captcha = useAppSelector(getCaptcha());
  const options = [
    { label: t("Arrival", { ns: "common" }), value: 'di' },
    { label: t("Departure", { ns: "common" }), value: 'den' },
  ];

  const refreshCaptcha = () => {
    dispatch(publicCmsActions.getCaptchaRequest());
  }

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
            <Col flex='180px'>
              <div
                className='verification w-100'
                style={{
                  height: '40px',
                  borderRadius: 10,
                  alignContent: 'center',
                }}
              >
                <Space>
                  <img
                    src={`data:image/png;base64,${captcha?.captchBase64Data}`}
                    alt=''
                    className='border rounded'
                  />
                  <Tooltip title={t('Refresh captcha', {ns: 'common'})}>
                    <Button onClick={refreshCaptcha} shape='circle'>
                      <i className="fa-solid fa-rotate"></i>
                    </Button>
                  </Tooltip>
                </Space>
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
