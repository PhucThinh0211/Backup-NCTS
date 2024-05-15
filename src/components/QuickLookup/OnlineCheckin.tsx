import { Button, Form, Input, Radio } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {EyeTwoTone, EyeInvisibleOutlined} from "@ant-design/icons";

export const OnlineCheckin = () => {
  const { t } = useTranslation(["common"]);

  const [value, setValue] = useState(1);

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="custom-container">
      <div className="d-flex justify-content-center mb-2">
      <Radio.Group value={value} onChange={handleOnChange} className='d-flex justify-content-center pb-5'>
        <Radio value={1}>{t('Online delivery procedures', { ns: 'common' })}</Radio>
        <Radio value={2}>{t('Declare export goods information', { ns: 'common' })}</Radio>
      </Radio.Group>
      </div>
      <Form className="onlineCheckin" layout="vertical" autoComplete="off">
        <Form.Item
          label={t("Account", { ns: "common" })}
          required
          rules={[{ required: true }]}
          style={{ display: "" }}
        >
          <Input
            style={{
              height: "40px",
              borderRadius: 10,
            }}
            placeholder={t("Enter account name", { ns: "common" })}
          />
        </Form.Item>
        <Form.Item
          label={t("Password", { ns: "common" })}
          required
          rules={[{ required: true }]}
          style={{ display: "" }}
        >
          <Input.Password
          type="password"
            style={{
              height: "40px",
              borderRadius: 10,
            }}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            placeholder={t("Enter password", { ns: "common" })}/>
        </Form.Item>
          {/* Verification codes */}
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
            name={t("Verification codes", { ns: "common" })}
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
        <Button type="primary" htmlType="submit" 
            style={{
              fontWeight:600,
              fontSize: "18px",
              height:"48px",
              width : "calc(100%)"
              }}>
              {t("Log in", { ns: "home" })}
            </Button>
      </Form>
    </div>
  );
};
