import { Modal, Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { CreateUpdateContactModalName } from '@/common/modalName';
import { SavingContactLoadingKey } from '@/common/loadingKey';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { getModalVisible, hideModal } from '@/store/modal';
import {
  getSelectedContact,
  departmentActions,
  getSelectedDepartmentDetail,
} from '@/store/department';
import { getLocale } from '@/store/persistState';

export const CreateUpdateContactModal = () => {
  const { t } = useTranslation(['common', 'department']);
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(
    getModalVisible(CreateUpdateContactModalName)
  );
  const selectedDepartment = useAppSelector(getSelectedDepartmentDetail());
  const selectedContact = useAppSelector(getSelectedContact());
  const locale = useAppSelector(getLocale());
  const isSaving = useAppSelector(getLoading(SavingContactLoadingKey));
  const [form] = Form.useForm();

  const contactTypes = [
    {
      label: t('Phone', { ns: 'department' }),
      value: 'Phone',
    },
    {
      label: t('Ext', { ns: 'department' }),
      value: 'Ext',
    },
    {
      label: t('Fax', { ns: 'department' }),
      value: 'Fax',
    },
    {
      label: t('Email', { ns: 'department' }),
      value: 'Email',
    },
  ];

  const handleCancel = () => {
    dispatch(departmentActions.setSelectedContact(undefined));
    dispatch(hideModal({ key: CreateUpdateContactModalName }));
  };

  const handleOk = () => form.submit();

  const handleSaveContact = (values: any) => {
    if (!selectedDepartment) return;
    const inputData = {
      ...values,
      code: values.type,
    };
    if (selectedContact) {
      // prettier-ignore
      dispatch(departmentActions.updateContactRequest({ departmentId: selectedDepartment.id, contact: { ...selectedContact, ...inputData }, contactId: selectedContact.id}));
      return;
    }
    dispatch(
      departmentActions.createContactRequest({
        contact: inputData,
        departmentId: selectedDepartment.id,
      })
    );
  };

  return (
    <Modal
      title={
        selectedContact
          ? t('Update contact', { ns: 'department' })
          : t('Add new', { ns: 'department' })
      }
      open={isModalOpen}
      confirmLoading={isSaving}
      okText={t('OkText', { ns: 'common' })}
      cancelText={t('CancelText', { ns: 'common' })}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          ...selectedContact,
        }}
        onFinish={handleSaveContact}
      >
        <Form.Item
          label={t('Type', {
            ns: 'department',
          })}
          name={'type'}
          rules={[
            {
              required: true,
              message: t('Type required', {
                ns: 'department',
              }),
            },
          ]}
        >
          <Select options={contactTypes} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label={
            <div>
              <span>
                {t('Title', {
                  ns: 'department',
                })}
              </span>
              {' - '}
              <span className='text-uppercase text-danger'>{locale}</span>
            </div>
          }
          name={'title'}
          rules={[
            {
              required: true,
              message: t('Title required', {
                ns: 'department',
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('Contact num', {
            ns: 'department',
          })}
          name={'contactNum'}
          rules={[
            {
              required: true,
              whitespace: true,
              message: t('Contact num required', {
                ns: 'department',
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
