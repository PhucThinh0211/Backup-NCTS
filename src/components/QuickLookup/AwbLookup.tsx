import { Button, Col, Form, Input, Row} from "antd";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "@/store/hooks";
import { startLoading } from "@/store/loading";
import { LookupButton } from "./components/LookupButton";

export const AwbLookup = () => {
  const { t } = useTranslation(["common"]);
  const dispatch = useAppDispatch();

  const handleLookup = () => {
    dispatch(startLoading({ key: "testLoadingKey" }));
  };

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
