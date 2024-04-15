import { Button, Upload, UploadProps, Image, UploadFile } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { getEnvVars } from '@/enviroment';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { bannerActions, getBannerPhotoUrl } from '@/store/banner';
import Utils from '@/utils';
import { UploadChangeParam } from 'antd/es/upload';
import { uploadedPhotoUrl } from '@/common';
const { apiUrl } = getEnvVars();

interface BannerPhotoUrlUploaderProps {
  onImageDelete?: () => void;
  fileList?: UploadFile[];
  onChange?: (info: UploadChangeParam<UploadFile<any>>) => void;
}

export const BannerPhotoUrlUploader = ({
  onImageDelete,
  fileList,
  onChange,
}: BannerPhotoUrlUploaderProps) => {
  const dispatch = useAppDispatch();

  const bannerPhotoUrl = useAppSelector(getBannerPhotoUrl());

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
        dispatch(bannerActions.setBannerPhotoUrl(`${info.file.response}`));
      } else if (status === 'error') {
        dispatch(bannerActions.setBannerPhotoUrl(undefined));
        Utils.errorHandling(info.file.response);
      }
    },
  };
  return bannerPhotoUrl ? (
    <div className='flex items-center justify-center relative'>
      <Image
        src={`${uploadedPhotoUrl(bannerPhotoUrl)}`}
        style={{
          backgroundColor: '#00000073',
        }}
      />
      {onImageDelete && (
        <DeleteOutlined
          className='absolute top-0 right-0 text-red-600'
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
