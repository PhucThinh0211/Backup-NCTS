import { Button, DatePicker, Form, Input } from "antd";
import { useTranslation } from "react-i18next";

export const InvoicesLookup = () => {
  const { t } = useTranslation(["common"]);

  return (
    <div className="w-xl-50">
    <Form
      requiredMark
      layout='vertical'
      autoComplete="off"
    >
      <Form.Item  style={{
            display: "inline-block",
            width: "calc(100%)",
          }}>
        <Form.Item 
          label={t('E-invoice number', { ns: 'common' })}
          required
          rules={[{ required: true }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            marginBottom: 0,
          }}>
          <Input style={{
                height: "40px",
                borderRadius: 10
              }}/>
        </Form.Item>
        <Form.Item
            name="dateInvoice"
            label={t('Invoice date', { ns: 'common' })}
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px) ",
              marginLeft: 8,
            }}>
            <DatePicker  style={{
                height: "40px",
                width: "100%",
                borderRadius: 10
              }} />
        </Form.Item>
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
            name="verificationCodes"
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
              <img src="https://sit.ntcs.hicas.vn/api/photo/dowload/64bbc359-c083-cdce-83aa-3a128d8ed489.png" alt="" />
            </div>
        </Form.Item>
        {/* Submit button */}
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
      
    </Form>
  </div>
);
};