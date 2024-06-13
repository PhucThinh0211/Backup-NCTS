import { Form, Modal, Input, Typography } from 'antd';

import { CreateUpdateFolderModalName, SavingMediaLoadingKey } from '@/common';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getModalVisible, hideModal } from '@/store/modal';
import { useTranslation } from 'react-i18next';
import { getFolderPath, getMediaType, mediaActions } from '@/store/media';
import { getLoading } from '@/store/loading';

export const CreateUpdateFolderModal = () => {
  const { t } = useTranslation(['media']);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const isSaving = useAppSelector(getLoading(SavingMediaLoadingKey));
  const isOpen = useAppSelector(getModalVisible(CreateUpdateFolderModalName));
  const mediaType = useAppSelector(getMediaType());
  const folderPath = useAppSelector(getFolderPath());
  const currentPath = folderPath[folderPath.length - 1];

  const handleOk = () => form.submit();

  const handleCancel = () => {
    dispatch(hideModal({ key: CreateUpdateFolderModalName }));
  };

  const handleSaveFolder = (values: any) => {
    const inputValues = {
      ...values,
      type: mediaType,
      parentId: currentPath?.id,
    };
    dispatch(mediaActions.createFolderRequest(inputValues));
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={isSaving}
    >
      <p className='h5 text-orange'>{t('Create folder')}</p>
      <Form
        form={form}
        onFinish={handleSaveFolder}
        initialValues={{ name: 'Untitled' }}
        layout='vertical'
      >
        <Form.Item
          label={t('Name')}
          name={'name'}
          rules={[{ required: true, message: t('Required') }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
