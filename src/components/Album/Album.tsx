import { uploadedFileUrl } from '@/common';
import { FolderResponse } from '@/services/FileService';
import { PlaySquareOutlined } from '@ant-design/icons';

interface AlbumProps {
  album: FolderResponse;
  onClick?: () => void;
  type?: 'photo' | 'video';
}
export const Album = ({ album, onClick, type = 'photo' }: AlbumProps) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      {type === 'photo' ? (
        <img
          src={uploadedFileUrl(
            `${album.files[0].location}/${album.files[0].fileName}`
          )}
          alt={album.files[0].fileName}
          className='w-100 h-auto object-fit-cover align-middle'
        />
      ) : (
        <div
          className='d-flex justify-content-center align-items-center rounded border'
          style={{ height: 192 }}
        >
          <PlaySquareOutlined style={{ fontSize: 100 }} />
        </div>
      )}
      <div className='d-flex justify-content-center py-2'>
        <span>{album.name}</span>
      </div>
    </div>
  );
};
