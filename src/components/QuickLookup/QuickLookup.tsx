import { Tabs, TabsProps } from 'antd';
import {
  FileSearchOutlined,
  BarChartOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import { OnlineCheckin } from './OnlineCheckin';
import LookUp from './LookUp';
import { FreightEstimate } from './FreightEstimate';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getActiveLookupTab, homeActions } from '@/store/home';
import { Banner } from './components/Banner';
import '@/pages/Home/HomeStyle.css';
import './QuickLookup.scss';
import { getBanners, publicCmsActions } from '@/store/publicCms';
import { getLanguage } from '@/store/persistState';
import { uploadedPhotoUrl } from '@/common';

// const banners = [
//   {
//     key: 'onlineCheckin',
//     title: '',
//     desc: '',
//     btnTitle: '',
//     src: 'https://sit.ntcs.hicas.vn/api/photo/dowload/2098e797-9bf6-074b-c305-3a1269ac4545.png',
//   },
//   // {
//   //   key:'lookupAwb',
//   //   title:'',
//   //   desc: '',
//   //   btnTitle:'',
//   //   src: 'https://sit.ntcs.hicas.vn/api/photo/dowload/2098e797-9bf6-074b-c305-3a1269ac4545.png'
//   // },
//   // {
//   //   key:'lookupFlightSchedules',
//   //   title:'',
//   //   desc: '',
//   //   btnTitle:'',
//   //   src: 'http://ncts.vn/images/ThuVien/Banner/vi/3-01.png'
//   // },
//   {
//     key: 'freightEstimate',
//     title: '',
//     desc: '',
//     btnTitle: '',
//     src: 'http://ncts.vn/images/ThuVien/Banner/vi/banner-cargo-5.jpg',
//   },
//   // {
//   //   key:'infoLookup',
//   //   title:'',
//   //   desc: '',
//   //   btnTitle:'',
//   //   src: 'http://ncts.vn/images/ThuVien/Banner/vi/3-01.png'
//   // },
//   // {
//   //   key:'invoicesLookup',
//   //   title:'',
//   //   desc: '',
//   //   btnTitle:'',
//   //   src: 'http://ncts.vn/images/ThuVien/Banner/vi/3-01.png'
//   // },
//   {
//     key: 'Lookup',
//     title: '',
//     desc: '',
//     btnTitle: '',
//     src: 'http://ncts.vn/images/ThuVien/Banner/vi/3-01.png',
//   },
// ];
export const QuickLookup = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();

  const language = useAppSelector(getLanguage());
  const activeLookupTab = useAppSelector(getActiveLookupTab());
  const banners = useAppSelector(getBanners());

  const items: TabsProps['items'] = [
    {
      key: 'onlineCheckin',
      label: t('Online check-in', { ns: 'common' }),
      children: <OnlineCheckin />,
      icon: <FileProtectOutlined />,
    },
    // {
    //   key: 'lookupAwb',
    //   label: (
    //     t('Lookup AWB No', { ns: 'common' })
    //   ),
    //   children: <AwbLookup />,
    //   icon: <FileSearchOutlined />
    // },
    // {
    //   key: 'lookupFlightSchedules',
    //   label:  t('Lookup Flight', { ns: 'common' }),
    //   children: <FlightLookup />,
    //   icon:  <CalendarOutlined />
    // },

    {
      key: 'Lookup',
      label: t('Lookup', { ns: 'common' }),
      children: <LookUp />,
      icon: <FileSearchOutlined />,
    },
    {
      key: 'freightEstimate',
      label: t('Estimate charge', { ns: 'common' }),
      children: <FreightEstimate />,
      icon: <BarChartOutlined />,
    },
    // {
    //   key: 'infoLookup',
    //   label: t('Search', { ns: 'common' }),
    //   children: <InfoLookup />,
    //   icon: <SearchOutlined />,
    // },
    // {
    //   key: 'invoicesLookup',
    //   label: t('Invoices Lookup', { ns: 'common' }),
    //   children: <InvoicesLookup />,
    //   icon: <SearchOutlined />,
    // },
  ];

  useEffect(() => {
    // const currentOrigin = window.location.origin;
    const currentOrigin = 'https://sit.ntcs.hicas.vn';
    const params = {
      pageUrl: currentOrigin,
    };
    dispatch(publicCmsActions.getBannerListRequest({ params }));

    // dispatch(homeActions.setActiveLookupTab(items[0]));
  }, [language]);

  useEffect(() => {
    if (!activeLookupTab) {
      dispatch(homeActions.setActiveLookupTab(items[0]));
    }
  }, [activeLookupTab]);

  const onChange = (key: string) => {
    const selectedTab = items.find((tab) => tab.key === key);
    dispatch(homeActions.setActiveLookupTab(selectedTab));
  };

  return (
    <div id='quickLookup'>
      {banners.map((banner, index) => (
        <Banner
          key={`banner-${banner.id}`}
          src={banner.photoUrl ? uploadedPhotoUrl(banner.photoUrl) : ''}
          active={banner.id === activeLookupTab?.key || index === 0}
        />
      ))}
      <div className='py-6 px-2 '>
        <Tabs
          centered
          onChange={onChange}
          activeKey={activeLookupTab?.key}
          defaultActiveKey={items[0]?.key}
          type='card'
          items={items}
          className='quick-lookup'
        />
      </div>
    </div>
  );
};
