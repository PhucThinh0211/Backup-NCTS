import { Button, Form, Input, Segmented } from "antd";
import { useTranslation } from "react-i18next";

export const OnlineCheckin = () => {
  const { t } = useTranslation(["common"]);

  return (
    <div>
      <div className="d-flex justify-content-center onlineCheckin mb-3">
        <Segmented
          defaultValue="center"
          // onChange={()}
          options={[
            t("Declare export goods information", { ns: "common" }),
            t("Online delivery procedures", { ns: "common" }),
          ]}
        />
      </div>
      <Form className="onlineCheckin-form" layout="vertical" autoComplete="off">
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
          <Input
            style={{
              height: "40px",
              borderRadius: 10,
            }}
            placeholder={t("Enter password", { ns: "common" })}
          />
        </Form.Item>
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
            style={{ display: "inline-block", width: "calc(80% - 4px)" }}
          >
            <Input
              style={{
                height: "40px",
                borderRadius: 10,
              }}
              placeholder={t("Enter verification codes", { ns: "common" })}
            />
          </Form.Item>
          <Form.Item
            name="awbNum"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(20% - 4px)",
              marginLeft: 8,
            }}
          >
            <Input
              style={{
                height: "40px",
                borderRadius: 10,
              }}
              placeholder="AWB#"
            />
          </Form.Item>
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
