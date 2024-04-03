import { getSelectedBanner } from '@/store/banner';
import { useAppSelector } from '@/store/hooks';
import { Form, Input } from 'antd';

export const BannerForm = () => {
  const [form] = Form.useForm();
  const selectedBanner = useAppSelector(getSelectedBanner());
  return (
    <div className='w-full border-b-gray-500 rounded-md bg-white p-4 shadow-sm'>
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          ...selectedBanner,
        }}
      >
        <Form.Item label={'Title'} name='title' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label={'Description'}
          name='description'
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </div>
  );
};
