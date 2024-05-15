import { Button, Form, Input, Tooltip } from "antd";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "@/store/hooks";
import { startLoading } from "@/store/loading";
import { InfoCircleOutlined } from "@ant-design/icons";

export const AwbLookup = () => {
  const { t } = useTranslation(["common"]);
  const dispatch = useAppDispatch();

  const handleLookup = () => {
    dispatch(startLoading({ key: "testLoadingKey" }));
  };

  return (
    <div className="w-xl-50">
      <Form
        requiredMark
        layout="vertical"
        autoComplete="off"
        onFinish={handleLookup}
        className=""
      >
        <Form.Item className="d-flex flex-column ">
          <Form.Item
            label={t("AWB number", { ns: "common" })}
            required
            style={{
              display: "inline-block",
              width: "calc(100%)",
            }}
          >
            <Form.Item
              name="awbPfx"
              style={{ display: "inline-block", width: "calc(30% - 4px)" }}
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
                suffix={
                  <Tooltip title="Value must be 3 numbers">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
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
              }}
            >
              <Input
                placeholder="AWB#"
                suffix={
                  <Tooltip title="Value must be 8 numbers">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
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
          label={t("Verification codes", { ns: "common" })}
          required
          style={{
            display: "inline-block",
            width: "calc(100%)",
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="Verification codes"
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "calc(70% - 4px)" }}
          >
            <Input
              style={{
                height: "40px",
                borderRadius: 10,
              }}
              placeholder={t("Enter verification codes", { ns: "common" })}
            />
          </Form.Item>
          <div
            className="verification"
            style={{
              display: "inline-block",
              height: "40px",
              width: "calc(30% - 4px)",
              borderRadius: 10,
              alignContent: "center",
              marginLeft: 8,
            }}
          >
            <img
              src="https://sit.ntcs.hicas.vn/api/photo/dowload/64bbc359-c083-cdce-83aa-3a128d8ed489.png"
              alt=""
            />
          </div>
        </Form.Item>
        <Form.Item noStyle>
          <div className="w-100 align-self-end">
            <Button
              type="primary"
              htmlType="submit"
              style={{
                fontWeight: 600,
                fontSize: "18px",
                height: "48px",
                width: "calc(100%)",
              }}
            >
              {t("Lookup", { ns: "common" })}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
