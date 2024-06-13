import {
  Form,
  Input,
  Modal,
  Select,
  UploadProps,
  Upload,
  Button,
  GetProp,
} from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import { CreateUpdateFileModalName, SavingMediaLoadingKey } from '@/common';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getModalVisible, hideModal } from '@/store/modal';
import {
  getDocumentTypes,
  getFolderPath,
  getMediaType,
  mediaActions,
} from '@/store/media';
import { getLoading } from '@/store/loading';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { MediaType } from '@/services/FileService';
import { UploadFile } from 'antd/lib';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const CreateUpdateFileModal = () => {
  const { t } = useTranslation(['media']);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const isSaving = useAppSelector(getLoading(SavingMediaLoadingKey));
  const isOpen = useAppSelector(getModalVisible(CreateUpdateFileModalName));
  const mediaType = useAppSelector(getMediaType());
  const documentTypes = useAppSelector(getDocumentTypes());
  const folderPath = useAppSelector(getFolderPath());
  const currentPath = folderPath[folderPath.length - 1];

  const handleOk = () => {};

  const handleCancel = () => {
    dispatch(hideModal({ key: CreateUpdateFileModalName }));
    form.resetFields();
    setFileList([]);
  };

  const handleUpload = (values: any) => {
    const foundDocumentType = (documentTypes?.items || []).find(
      (item) => item.id === values.Category
    );

    const params = {
      ...values,
      Type: mediaType,
      FolderContentId: currentPath?.id,
      Category: mediaType === MediaType.DOCUMENTS ? values.Category : mediaType,
      Code:
        mediaType === MediaType.DOCUMENTS ? foundDocumentType?.code : mediaType,
    };
    const formData = new FormData();
    formData.append('Content', fileList[0] as FileType);
    dispatch(
      mediaActions.uploadFileRequest({
        body: formData,
        params,
      })
    );
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    maxCount: 1,
    multiple: false,
  };

  const renderForm = (type: MediaType) => {
    switch (type) {
      case MediaType.DOCUMENTS:
        return (
          <>
            <Form.Item
              label={t('Category')}
              name={'Category'}
              rules={[{ required: true, message: t('Required') }]}
            >
              <Select
                options={(documentTypes?.items || []).map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
          </>
        );

      default:
        break;
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={isSaving}
      destroyOnClose
    >
      <p className='h5 text-orange'>{t('Upload file')}</p>
      <Form form={form} onFinish={handleUpload} layout='vertical'>
        <Form.Item
          label={t('Name')}
          name={'Name'}
          rules={[{ required: true, message: t('Required') }]}
        >
          <Input />
        </Form.Item>
        {mediaType && renderForm(mediaType)}
        <Form.Item
          label={t('File')}
          name={'File'}
          rules={[{ required: true, message: t('Required') }]}
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
