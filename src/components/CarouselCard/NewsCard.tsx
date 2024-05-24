import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import '@/pages/Home/HomeStyle.css';

type Props = {
  img: string;
  date?: string;
  author?: string;
  title?: string;
  desc: any;
};

export const NewsCard = ({ img, date, author, title, desc }: Props) => {
  return (
    <div className='cardNews'>
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
    </div>
  );
};
