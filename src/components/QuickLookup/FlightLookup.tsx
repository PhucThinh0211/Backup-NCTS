import { Button, Col, DatePicker, Form, Input, Radio, Row } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export const FlightLookup = () => {
  const { t } = useTranslation(["common"]);
  const options = [
    { label: t("Arrival", { ns: "common" }), value: 'di' },
    { label: t("Departure", { ns: "common" }), value: 'den' },
  ];

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
              style={{
                marginBottom: 0,
              }}
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
              style={{
                marginBottom: 0,
              }}
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
              className="w-100 fs-5 fw-semibold rounded-pill"
              style={{
                height: "48px",
              }}
            >
              {t("Lookup", { ns: "common" })}
            </Button>
          </div>
        </Form.Item>
      </Form>
  );
};
