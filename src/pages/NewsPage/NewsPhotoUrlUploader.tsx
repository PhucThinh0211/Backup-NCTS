import { Button, Upload, UploadProps, Image, UploadFile } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { getEnvVars } from '@/enviroment';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { contentActions, getContentPhotoUrl } from '@/store/content';
import Utils from '@/utils';
import { UploadChangeParam } from 'antd/es/upload';
import { uploadedPhotoUrl } from '@/common';
const { apiUrl } = getEnvVars();

interface NewsPhotoUrlUploaderProps {
  onImageDelete?: () => void;
  fileList?: UploadFile[];
  onChange?: (info: UploadChangeParam<UploadFile<any>>) => void;
}

export const NewsPhotoUrlUploader = ({
  onImageDelete,
  fileList,
  onChange,
}: NewsPhotoUrlUploaderProps) => {
  const dispatch = useAppDispatch();

  const contentPhotoUrl = useAppSelector(getContentPhotoUrl());

  const uploadProps: UploadProps = {
    fileList,
    name: 'File',
    multiple: false,
    maxCount: 1,
    accept: 'image/*',
    action: `${apiUrl}/api/photo/upload`,
    showUploadList: false,
    headers: {
      // Authorization: auth.token ? `Bearer ${auth.token}` : '',
      Authorization: '',
    },
    onChange(info) {
      onChange && onChange(info);
      const { status } = info.file;
      if (status === 'done') {
        dispatch(contentActions.setContentPhotoUrl(`${info.file.response}`));
      } else if (status === 'error') {
        dispatch(contentActions.setContentPhotoUrl(undefined));
        Utils.errorHandling(info.file.response);
      }
    },
  };
  return contentPhotoUrl ? (
    <div className='flex items-center justify-center relative'>
      <Image
        src={`${uploadedPhotoUrl(contentPhotoUrl)}`}
        style={{
          backgroundColor: '#00000073',
          maxHeight: 300,
          objectFit: 'cover',
        }}
      />
      {onImageDelete && (
        <DeleteOutlined
          className='absolute top-0 right-0 text-red-600 text-lg'
          onClick={onImageDelete}
        />
      )}
    </div>
  ) : (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Click to upload</Button>
    </Upload>
  );
};
