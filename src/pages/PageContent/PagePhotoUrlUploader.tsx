import { Button, Upload, UploadProps, Image, UploadFile } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { getEnvVars } from '@/enviroment';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Utils from '@/utils';
import { UploadChangeParam } from 'antd/es/upload';
import { uploadedPhotoUrl } from '@/common';
import { getPagePhotoUrl, pageContentActions } from '@/store/pageContent';
const { apiUrl } = getEnvVars();

interface PagePhotoUrlUploaderProps {
  onImageDelete?: () => void;
  fileList?: UploadFile[];
  onChange?: (info: UploadChangeParam<UploadFile<any>>) => void;
}

export const PagePhotoUrlUploader = ({
  onImageDelete,
  fileList,
  onChange,
}: PagePhotoUrlUploaderProps) => {
  const dispatch = useAppDispatch();

  const pagePhotoUrl = useAppSelector(getPagePhotoUrl());

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
        dispatch(pageContentActions.setPagePhotoUrl(`${info.file.response}`));
      } else if (status === 'error') {
        dispatch(pageContentActions.setPagePhotoUrl(undefined));
        Utils.errorHandling(info.file.response);
      }
    },
  };
  return pagePhotoUrl ? (
    <div className='d-flex align-items-center justify-content-center position-relative'>
      <Image
        src={`${uploadedPhotoUrl(pagePhotoUrl)}`}
        style={{
          backgroundColor: '#00000073',
          maxHeight: 300,
          objectFit: 'cover',
        }}
      />
      {onImageDelete && (
        <DeleteOutlined
          className='position-absolute top-0 end-0 text-danger text-lg'
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
