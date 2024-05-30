import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';

type Props = {
  img?: string;
  date?: string;
  author?: string;
  title?: string;
  desc?: any;
  loading?: boolean;
  url: string;
};

export const NewsCard = ({ img, date, author, title, desc, loading, url }: Props) => {
  return (
    <div className="cardNews">
      {loading ? (
        <>
          <Skeleton.Image active />
          <Skeleton active />
        </>
      ) : (
        <>
          <Link to={url}>
            <div className="cardImg">
              <img src={img} alt={title} />
            </div>
          </Link>
          <div className="d-flex flex-column gap-2 p-3">
            <div className="d-flex flex-row gap-1 flex-wrap news-meta">
              {date && (
                <div className="d-flex flex-row gap-1">
                  {' '}
                  <CalendarOutlined /> {date}{' '}
                </div>
              )}
              {author && (
                <div className="d-flex flex-row gap-1">
                  {' '}
                  <UserOutlined /> {author}{' '}
                </div>
              )}
            </div>
            <div>
              {title && (
                <Link to={url} className='text-dark'>
                  <h5 className="cardTitle">{title}</h5>
                </Link>
              )}
              {desc && (
                <div
                  className="cardDesc"
                  dangerouslySetInnerHTML={{
                    __html: desc,
                  }}></div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
