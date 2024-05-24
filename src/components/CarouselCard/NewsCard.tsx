import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import '@/pages/Home/HomeStyle.css';
import { Skeleton } from 'antd';

type Props = {
  img?: string;
  date?: string;
  author?: string;
  title?: string;
  desc?: any;
  loading?: boolean;
};

export const NewsCard = ({
  img,
  date,
  author,
  title,
  desc,
  loading,
}: Props) => {
  return (
    <div className='cardNews'>
      {loading ? (
        <>
          <Skeleton.Image active />
          <Skeleton active />
        </>
      ) : (
        <>
          <div className='cardImg'>
            <img src={img} alt={title} />
          </div>
          <div className='d-flex flex-column gap-2'>
            <div className='d-flex flex-row gap-1 flex-wrap '>
              {date && (
                <div className='d-flex flex-row gap-1'>
                  {' '}
                  <CalendarOutlined /> {date}{' '}
                </div>
              )}
              {author && (
                <div className='d-flex flex-row gap-1'>
                  {' '}
                  <UserOutlined /> {author}{' '}
                </div>
              )}
            </div>
            <div>
              {title && <h5 className='cardTitle'>{title}</h5>}
              {desc && (
                <div
                  className='cardDesc'
                  dangerouslySetInnerHTML={{
                    __html: desc,
                  }}
                ></div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
