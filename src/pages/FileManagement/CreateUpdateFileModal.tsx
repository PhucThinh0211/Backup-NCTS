import {
  Form,
  Input,
  Modal,
  Select,
  UploadProps,
  Upload,
  Button,
  GetProp,
  Space,
} from 'antd';

import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
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
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    form.resetFields();
    setFileList([]);
  }, [isOpen]);

  useEffect(() => {
    if (fileList.length) {
      form.setFieldsValue({
        Name: fileList[0]?.name,
      });
    }
  }, [fileList]);

  const handleOk = form.submit;

  const handleCancel = () => {
    dispatch(hideModal({ key: CreateUpdateFileModalName }));
  };

  const handleUpload = (values: any) => {
    const params = {
      ...values,
      Type: mediaType,
      FolderContentId: currentPath?.id,
      Category: mediaType === MediaType.DOCUMENTS ? values.Category : mediaType,
      Code: mediaType === MediaType.DOCUMENTS ? values.Code : mediaType,
      Name: values.Name || fileList[0]?.name,
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
              label={t('Document type')}
              name={'Category'}
              rules={[{ required: true, message: t('Document type required') }]}
            >
              <Select
                options={(documentTypes?.items || []).map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
            <Form.Item
              label={t('Code')}
              name={'Code'}
              rules={[{ required: true, message: t('Code required') }]}
            >
              <Input />
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
      <p className='h6 text-orange'>{t('Upload')}</p>
      <Form
        form={form}
        onFinish={handleUpload}
        layout='vertical'
        autoComplete='off'
        autoCorrect='off'
      >
        <Form.Item
          label={t('File')}
          name={'File'}
          rules={[{ required: true, message: t('File required') }]}
        >
          {fileList.length ? (
            <Space className='w-100' direction='vertical'>
              {fileList.map((file) => (
                <div className='d-flex justify-content-between' key={file.uid}>
                  <div>{file.name}</div>
                  <DeleteOutlined
                    className='text-danger '
                    onClick={() => props.onRemove && props.onRemove(file)}
                  />
                </div>
              ))}
            </Space>
          ) : (
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>
                {t('Select file', { ns: 'media' })}
              </Button>
            </Upload>
          )}
        </Form.Item>
        {mediaType && renderForm(mediaType)}
        {mediaType !== MediaType.CERTIFICATES && (
          <Form.Item
            label={t('Name')}
            name={'Name'}
            rules={[{ required: true, message: t('Name required') }]}
          >
            <Input />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};