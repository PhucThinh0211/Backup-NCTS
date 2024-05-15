import { Button, Col, DatePicker, Form, Input, Row, Segmented } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export const FlightLookup = () => {
  const { t } = useTranslation(["common"]);

  return (
    <div className="w-xl-50">
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

          <Col xs={12} sm={12} md={8} lg={8}>
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

          <Col xs={12} sm={12} md={8} lg={8}>
            <Segmented
              style={{
                width: "100%",
              }}
              options={[
                t("Arrival", { ns: "common" }),
                t("Departure", { ns: "common" }),
              ]}
            />
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
