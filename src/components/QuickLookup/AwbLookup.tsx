import { Button, Col, Form, Input, Row, Space, Tooltip} from "antd";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { startLoading } from "@/store/loading";
import { LookupButton } from "./components/LookupButton";
import { getCaptcha, publicCmsActions } from "@/store/publicCms";

export const AwbLookup = () => {
  const { t } = useTranslation(["common"]);
  const dispatch = useAppDispatch();
  const captcha = useAppSelector(getCaptcha());

  const handleLookup = () => {
    dispatch(startLoading({ key: "testLoadingKey" }));
  };

  const refreshCaptcha = () => {
    dispatch(publicCmsActions.getCaptchaRequest());
  }

  return (
      <Form
        requiredMark
        layout="vertical"
        autoComplete="off"
        onFinish={handleLookup}
        className="w-100"
      >
        <Form.Item className="d-flex flex-column ">
          <Form.Item
            label={t("AWB number", { ns: "common" })}
            required
          >
            <Form.Item
              name="awbPfx"
              style={{ 
                display: "inline-block",
                 width: "calc(30% - 4px)",
                 marginBottom: 0
                }}
              rules={[
                {
                  pattern: /^[\d]{0,3}$/,
                  message: "Value must be 3 numbers",
                }
              ]}
              validateTrigger="onBlur"
            >
              <Input
                placeholder="Prefix"
                type="number"
                style={{
                  height: "40px",
                  borderRadius: 10,
                }}
              />
            </Form.Item>
            <Form.Item
              name="awbNum"
              rules={[
                {
                  pattern: /^[\d]{0,8}$/,
                  message: "Value must be 8 numbers",
                }
              ]}
              validateTrigger="onBlur"
              style={{
                display: "inline-block",
                width: "calc(70% - 4px)",
                marginLeft: 8,
                marginBottom: 0
              }}
            >
              <Input
                placeholder="AWB#"
                type="number"
                style={{
                  height: "40px",
                  borderRadius: 10,
                }}
              />
            </Form.Item>
          </Form.Item>
        </Form.Item>
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
