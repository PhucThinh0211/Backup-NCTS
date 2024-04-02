import { Modal, Form, Row, Col, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { CreateUpdateMenuModalName, SavingMenu } from '@/common/define';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { getModalVisible, hideModal } from '@/store/modal';

export const CreateUpdateMenuModal = () => {
  const { t } = useTranslation('menu');
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(
    getModalVisible(CreateUpdateMenuModalName)
  );
  const isSaving = useAppSelector(getLoading(SavingMenu));
  const [form] = Form.useForm();

  const handleCancel = () => {
    // dispatch(menuActions.setSelectedMenu(undefined));
    dispatch(hideModal({ key: CreateUpdateMenuModalName }));
  };

  const handleOk = () => form.submit();

  const handleSaveMenu = (values: any) => {
    console.log(values);

    // if (selectedProject) {
    //   const inputData = {
    //     projectId: selectedProject.id,
    //     ...values,
    //   };
    //   if (selectedMenu) {
    //     // prettier-ignore
    //     dispatch(menuActions.updateMenuRequest({ menuId: selectedMenu.id, menu: { ...selectedMenu, ...inputData }}));
    //     return;
    //   }
    //   dispatch(menuActions.createMenuRequest({ menu: inputData }));
    // }
  };

  return (
    <Modal
      title={false ? t('Update menu') : t('Add new menu')}
      open={isModalOpen}
      okText={t('okText')}
      onOk={handleOk}
      cancelText={t('cancelText')}
      onCancel={handleCancel}
      confirmLoading={isSaving}
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={{}}
        onFinish={handleSaveMenu}
      >
        <Row>
          <Col span={24} md={24}>
            <Form.Item
              label={t('Name')}
              name='name'
              rules={[{ required: true, message: t('Name required') }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('Url')}
              name='code'
              rules={[{ required: true, message: t('Url required') }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
