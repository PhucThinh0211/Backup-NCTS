import React from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';

type Props = {
  img?: string;
  date?: string;
  author?: string;
  title?: string;
  desc?: any;
  loading?: boolean;
  url: string;
  style?: React.CSSProperties;
};

export const MiniNewsCard = ({
  img,
  date,
  author,
  title,
  desc,
  loading,
  url,
  style,
}: Props) => {
  return loading ? (
    <div>
      <Skeleton.Image active />
      <Skeleton active />
    </div>
  ) : (
    <Link to={url}>
      <div className='cardNewsMini' style={style}>
        <div className='cardImg'>
          <img src={img} alt={title} />
        </div>
        <div className='d-flex flex-column gap-2 py-1 py-md-3 px-1'>
          <div>
            {title && (
              <Link to={url} className='text-dark'>
                <h5 className='cardTitle'>{title}</h5>
              </Link>
            )}
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
    </Link>
  );
};
