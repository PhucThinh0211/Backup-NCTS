import { Button, DatePicker, Form, Input, Radio, Row, Segmented } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export const FlightLookup = () => {
  const { t } = useTranslation(['common']);

  return (
    <div className="w-75">
    <Form
      requiredMark
      autoComplete="off"
    >
      <Form.Item
      className="d-flex flex-column flight-lookup">
       <Form.Item
          label={t('Carrier', { ns: 'common' })}
          required
          rules={[{ required: true }]}
          style={{
            display: "inline-block",
            width: "calc(40% - 4px)",
            marginBottom: 0,
          }}>
          <Input style={{
                height: "40px",
                borderRadius: 10
              }}/>
          </Form.Item>
          <Form.Item
            name="dateFlight"
            label={t('Flight date', { ns: 'common' })}
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(40% - 4px)",
              marginBottom: 0,
            }}>
            <DatePicker  style={{
                height: "40px",
                width: "100%",
                borderRadius: 10
              }} />
          </Form.Item>
          <Segmented
          className=''
          style={{width: "calc(20% - 4px)",
            display: "inline-block"
          }}
          // onChange={()}
          options={[
            t("Arrival", { ns: "common" }),
            t("Departure", { ns: "common" }),
          ]}
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
      
    </Form>
  </div>
);
};

//     <div className='w-75'>
//     <Form requiredMark className="d-flex flex-row gap-4" layout="vertical" initialValues={{ dateFlight: dayjs(), routing: 'di' }} autoComplete="off">
//         <Form.Item
//           label={t('Carrier', { ns: 'common' })}
//           required
//           rules={[{ required: true }]}
//           style={{
//             display: "inline-block",
//             width: "calc(100%)",
//             marginBottom: 0,
//           }}>
//           <Input style={{
//                 height: "40px",
//                 borderRadius: 10
//               }}/>
//           <Form.Item
//             name="dateFlight"
//             label={t('Flight date', { ns: 'common' })}
//             rules={[{ required: true }]}
//             style={{
//               display: "inline-block",
//               width: "calc(100%)",
//               marginBottom: 0,
//             }}>
//             <DatePicker  style={{
//                 height: "40px",
//                 width: "100%",
//                 borderRadius: 10
//               }} />
//           </Form.Item>
//           <Form.Item
//             name="routine"
//             label={t('Routine', { ns: 'common' })}
//             rules={[{ required: true }]}
//             style={{ display: 'inline-block', width: 'calc(100%)', marginLeft: 8 }}>
//              <Radio.Group >
//               <Radio value={"di"}>{t('Arrival', { ns: 'common' })}</Radio>
//               <Radio value={"den"}>{t('Departure', { ns: 'common' })}</Radio>
//             </Radio.Group>
//           </Form.Item>
//           <Form.Item 
//           style={{marginTop:50}}
//           >
//             <Row justify="start">
//               <Button type="primary" htmlType="submit" style={{
//                 fontWeight:600,
//                 fontSize: "18px",
//                 height:"48px",
//                 }}>
//                 {t('Log in', { ns: 'home' })}
//               </Button>
//             </Row>
//           </Form.Item>
//         </Form.Item>
//     </Form></div>
//   );
// };