import { useEffect, useState } from 'react';

import { Outlet, useParams } from 'react-router-dom';

// import { SEO } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { getActiveMenuKey } from '@/store/persistState';
import { getMenuList } from '@/store/publicCms';
import { MenuResponse } from '@/services/MenuService';


export const Content = () => {
  const { '*': slug} = useParams();
  const activeMenuKey = useAppSelector(getActiveMenuKey());
  const menus = useAppSelector(getMenuList());
  const [currentMenu, setCurrentMenu] = useState<MenuResponse>();

  useEffect(() => {
    const activeMenu = menus?.find(x => x.id === activeMenuKey);
    setCurrentMenu(activeMenu);
  }, [activeMenuKey, menus]);
  
  console.log(slug, currentMenu);

  return (
    <>
      {/* <SEO title={`${currentMenu?.label || 'Noi Bai Cargo Terminal Services'} - NCTS`} description={currentMenu?.label || ''} /> */}
      <div>
        Noi dung
        <Outlet />
      </div>
    </>
  );
};
