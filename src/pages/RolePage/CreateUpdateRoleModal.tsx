import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  IdentityLoadingEnum,
  IdentityModalEnum,
  createRoleSelectedSelector,
  identityActions,
} from '@/store/identity';
import { getLoading } from '@/store/loading';
import { getModalVisible, hideModal } from '@/store/modal';
import { Checkbox, Col, Form, Input, Modal, Row } from 'antd';
import { useTranslation } from 'react-i18next';

export const CreateUpdateRoleModal = () => {
  const { t } = useTranslation(['common']);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const selectedRole = useAppSelector(createRoleSelectedSelector());
  const isModalOpen = useAppSelector(
    getModalVisible(IdentityModalEnum.createUpdateRoleModal)
  );
  const isSaving = useAppSelector(
    getLoading([IdentityLoadingEnum.createRole, IdentityLoadingEnum.updateRole])
  );

  const handleCancel = () => {
    dispatch(identityActions.setRoleSelected(undefined));
    dispatch(hideModal({ key: IdentityModalEnum.createUpdateRoleModal }));
  };

  const handleOk = () => form.submit();

  const handleSaveRole = (values: any) => {
    if (selectedRole) {
      dispatch(
        identityActions.updateRoleRequest({
          id: selectedRole.id,
          input: values,
        })
      );
      return;
    }
    dispatch(identityActions.createRoleRequest(values));
  };

  return (
    <Modal
      title={
        selectedRole
          ? t('Update', { ns: 'common' })
          : t('Add new', { ns: 'common' })
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
          ...selectedRole,
        }}
        onFinish={handleSaveRole}
      >
        <Row>
          <Col span={24} md={24}>
            <Form.Item
              label={t('Role name', { ns: 'common' })}
              name='name'
              rules={[
                {
                  required: true,
                  message: t('Enter role name', { ns: 'common' }),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <div>
              <Form.Item name='isDefault' valuePropName='checked'>
                <Checkbox>{t('_Default')}</Checkbox>
              </Form.Item>
              <Form.Item name='isPublic' valuePropName='checked'>
                <Checkbox>{t('Public')}</Checkbox>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
