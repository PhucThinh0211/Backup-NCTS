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
    <Form
      requiredMark
      autoComplete="off"
      onFinish={handleLookup}
      className="d-flex flex-row gap-4"
    >
      <Form.Item
      className="d-flex flex-column form-item-left">
        <Form.Item
          label={t("Carrier", { ns: "common" })}
          required
          rules={[{ required: true }]}
          style={{ display: "" }}
        >
          <Input style={{
              height: "40px",
              borderRadius: 15
            }} />
        </Form.Item>
        <Form.Item
          label={t("AWB number", { ns: "common" })}
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
            width: "calc(50% - 4px)" 
          }}
          >
            <Input style={{
              height: "40px",
              borderRadius: 15
            }} placeholder="Prefix" />
          </Form.Item>
          <Form.Item
            name="awbNum"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 4px)",
              marginLeft: 8,
            }}
          >
            <Input
            style={{
              height: "40px",
              borderRadius: 15
            }}
             placeholder="AWB#" />
          </Form.Item>
        </Form.Item>
        <Form.Item noStyle>
          <div className="w-100 align-self-end">
            <Button type="primary" htmlType="submit" 
            style={{
              fontWeight:600,
              fontSize: "18px",
              height:"48px",
              width : "calc(30%)"
              }}>
              {t("Lookup", { ns: "common" })}
            </Button>
          </div>
        </Form.Item>
      </Form.Item>
        <div
         className="d-none d-md-flex justify-content-center form-item-right">  
          <img src="https://sit.ntcs.hicas.vn/api/photo/dowload/6e9e0536-e0f6-6ecd-f117-3a12634d56ac.png" alt="1" width='80%'/>
        </div>
    </Form>
  );
};
