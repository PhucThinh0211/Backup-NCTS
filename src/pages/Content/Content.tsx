import { Carousel } from 'antd';

import { Outlet, useParams } from 'react-router-dom';

export const Content = () => {
  const { '*': slug} = useParams();

  console.log(slug);

  return (
    <>
      <div>
        Noi dung
        <Outlet />
      </div>
    </>
  );
};
