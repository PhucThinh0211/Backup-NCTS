import { Button,  Form, Input } from "antd";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "@/store/hooks";
import { startLoading } from "@/store/loading";

export const AwbLookup = () => {
  const { t } = useTranslation(["common"]);
  const dispatch = useAppDispatch();

  const handleLookup = () => {
    dispatch(startLoading({ key: "testLoadingKey" }));
  };

  return (
    <div className="w-75">
      <Form
        requiredMark
        autoComplete="off"
        onFinish={handleLookup}
        className=""
      >
        <Form.Item
        className="d-flex flex-column ">
          <Form.Item
            label={t("AWB number", { ns: "common" })}
            required

            rules={[{ required: true }]}
            style={{ display: "" }}
          >
            <Input style={{
                height: "40px",
                borderRadius: 10
              }}
              placeholder="#AWB" 
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
        </Form.Item>
      </Form>
    </div>
  );
};
