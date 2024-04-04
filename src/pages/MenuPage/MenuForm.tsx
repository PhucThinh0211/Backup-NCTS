import { getSelectedMenu } from '@/store/menu';
import { useAppSelector } from '@/store/hooks';
import { Col, Form, Input, Row } from 'antd';
import { t } from 'i18next';

export const MenuForm = () => {
  const [form] = Form.useForm();
  const selectedMenu = useAppSelector(getSelectedMenu());
  return (
    <div className='w-full border-b-gray-500 rounded-md bg-white p-4 shadow-sm'>
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          ...selectedMenu,
        }}
      >
        <Row>
          <Col span={24} md={24}>
            <Form.Item
              label={t('Name', { ns: 'menu' })}
              name='label'
              rules={[
                { required: true, message: t('Name required', { ns: 'menu' }) },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('Url', { ns: 'menu' })}
              name='url'
              rules={[
                { required: true, message: t('Url required', { ns: 'menu' }) },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
