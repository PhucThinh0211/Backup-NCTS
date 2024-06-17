import { Button, Col, DatePicker, Form, Input, Radio, Row, Space, Spin, Tooltip } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { LookupButton } from "./components/LookupButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCaptcha, publicCmsActions } from "@/store/publicCms";
import { GettingCaptchaLoadingKey, bootstrapBreakpoints } from "@/common";
import { getLoading } from "@/store/loading";
import { useWindowSize } from "@/hooks/useWindowSize";

export const FlightLookup = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["common"]);
  const [innerWidth] = useWindowSize();
  const fetchingCaptcha = useAppSelector(getLoading(GettingCaptchaLoadingKey));
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
        initialValues={{ dateFlight: dayjs(), flightDirection: "di",  }}
      >
        <Row
          gutter={[8, 0]}
          className="flight-lookup"
        >
          <Col xs={{ flex: '100%'}} md={{ flex: 'auto'}}>
            <Row gutter={[8, 0]}>
              <Col  span={24} sm={14}>
                <Form.Item
                  label={t("Carrier", { ns: "common" })}
                  required
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} sm={10}>
                <Form.Item
                  name="dateFlight"
                  label={t("Flight date", { ns: "common" })}
                  rules={[{ required: true }]}
                >
                  <DatePicker className="w-100"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col>
            <Form.Item className=" py-2 py-md-0" name={'flightDirection'} label={innerWidth > bootstrapBreakpoints.md ? <div className="invisible d-none">flightDirection</div> : undefined}>
              <Radio.Group className="" options={options}  optionType="button" buttonStyle="solid"/>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label={t('Verification codes', { ns: 'common' })}
          name='verificationCode'
          required
          rules={[{ required: true }]}
        >
          <Row align='stretch'>
            <div style={{ flex: 1, marginRight: 8 }}>
              <Form.Item>
                <Input
                  placeholder={t('Enter verification codes', {
                    ns: 'common',
                  })}
                />
              </Form.Item>
            </div>
            <Space>
              {fetchingCaptcha ? (
                <Spin size='small' style={{ width: 110 }} />
              ) : (
                <img
                  // prettier-ignore
                  src={captcha?.captchBase64Data ? `data:image/png;base64,${captcha?.captchBase64Data}` : ''}
                  alt='captcha code'
                  className='border rounded'
                  style={{ height: 32 }}
                />
              )}
              <Tooltip title={t('Refresh captcha', { ns: 'common' })}>
                <Button
                  onClick={refreshCaptcha}
                  shape='circle'
                  disabled={fetchingCaptcha}
                >
                  <i className='fa-solid fa-rotate'></i>
                </Button>
              </Tooltip>
            </Space>
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
