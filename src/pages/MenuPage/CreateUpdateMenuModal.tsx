import { Modal, Form, Row, Col, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { CreateUpdateMenuModalName } from '@/common/modalName';
import { SavingMenuLoadingKey } from '@/common/loadingKey';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { getModalVisible, hideModal } from '@/store/modal';
import { getSelectedMenu, menuActions } from '@/store/menu';

export const CreateUpdateMenuModal = () => {
  const { t } = useTranslation(['common', 'menu']);
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(
    getModalVisible(CreateUpdateMenuModalName)
  );
  const selectedMenu = useAppSelector(getSelectedMenu());
  const isSaving = useAppSelector(getLoading(SavingMenuLoadingKey));
  const [form] = Form.useForm();

  const handleCancel = () => {
    dispatch(menuActions.setSelectedMenu(undefined));
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
      title={
        selectedMenu
          ? t('Update menu', { ns: 'menu' })
          : t('Add new menu', { ns: 'menu' })
      }
      open={isModalOpen}
      okText={t('OkText', { ns: 'common' })}
      onOk={handleOk}
      cancelText={t('CancelText', { ns: 'common' })}
      onCancel={handleCancel}
      confirmLoading={isSaving}
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          ...selectedMenu,
        }}
        onFinish={handleSaveMenu}
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
    </Modal>
  );
};
