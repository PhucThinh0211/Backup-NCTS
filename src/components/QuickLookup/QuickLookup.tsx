import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsProps } from 'antd';
import {
  FileSearchOutlined,
  BarChartOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getActiveLookupTab, homeActions } from '@/store/home';

import { OnlineCheckin } from './OnlineCheckin';
import LookUp from './LookUp';
import { FreightEstimate } from './FreightEstimate';
import '@/pages/Home/HomeStyle.css';
import './QuickLookup.scss';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const activeLookupTab = useAppSelector(getActiveLookupTab());

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
      key: 'lookup',
      label: t('Lookup', { ns: 'common' }),
      children: <LookUp />,
      icon: <FileSearchOutlined />,
    },
    {
      key: 'serviceEstimate',
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
    const tab = searchParams.get('tab');
    if (!activeLookupTab) {
      dispatch(homeActions.setActiveLookupTab(items[0]));
      setSearchParams({
        tab: items[0].key,
      });
    } else {
      if (!tab) {
        setSearchParams({
          tab: activeLookupTab.key,
        });
      }
    }
  }, [activeLookupTab, searchParams]);

  const onChange = (key: string) => {
    const selectedTab = items.find((tab) => tab.key === key);
    dispatch(homeActions.setActiveLookupTab(selectedTab));
    setSearchParams({
      tab: key,
    });
  };

  return (
    <div id='quickLookup'>
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
