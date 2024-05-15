import { Tabs, TabsProps } from 'antd';
import {
  FileSearchOutlined, BarChartOutlined, FileProtectOutlined
} from '@ant-design/icons';
import { OnlineCheckin } from './OnlineCheckin';
import LookUp from './LookUp';
import { FreightEstimate } from './FreightEstimate';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import '@/pages/Home/HomeStyle.css'
 

export const QuickLookup = () => {
  const { t } = useTranslation(['common']);

  const banner =[
    {
      key:'onlineCheckin',
      title:'',
      desc: '',
      btnTitle:'',
      src: 'https://sit.ntcs.hicas.vn/api/photo/dowload/2098e797-9bf6-074b-c305-3a1269ac4545.png'
    },
    // {
    //   key:'lookupAwb',
    //   title:'',
    //   desc: '',
    //   btnTitle:'',
    //   src: 'https://sit.ntcs.hicas.vn/api/photo/dowload/2098e797-9bf6-074b-c305-3a1269ac4545.png'
    // },
    // {
    //   key:'lookupFlightSchedules',
    //   title:'',
    //   desc: '',
    //   btnTitle:'',
    //   src: 'http://ncts.vn/images/ThuVien/Banner/vi/3-01.png'
    // },
    {
      key:'freightEstimate',
      title:'',
      desc: '',
      btnTitle:'',
      src: 'http://ncts.vn/images/ThuVien/Banner/vi/banner-cargo-5.jpg'
    },
    // {
    //   key:'infoLookup',
    //   title:'',
    //   desc: '',
    //   btnTitle:'',
    //   src: 'http://ncts.vn/images/ThuVien/Banner/vi/3-01.png'
    // },
    // {
    //   key:'invoicesLookup',
    //   title:'',
    //   desc: '',
    //   btnTitle:'',
    //   src: 'http://ncts.vn/images/ThuVien/Banner/vi/3-01.png'
    // },
      {
        key:'Lookup',
        title:'',
        desc: '',
        btnTitle:'',
        src: 'http://ncts.vn/images/ThuVien/Banner/vi/3-01.png'
      },
  ]

  const [bannerSrc, setBannerSrc] = useState(banner[0].src);



  const items: TabsProps['items'] = [
    {
      key: 'onlineCheckin',
      label: (  
        t('Online check-in', { ns: 'common' })
      ),
      children: <OnlineCheckin />,
      icon: <FileProtectOutlined />
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
      children: <LookUp  />,
      icon: <FileSearchOutlined />,
    },
    {
      key: 'freightEstimate',
      label: t('Estimate charge', { ns: 'common' }),
      children: <FreightEstimate  />,
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

  const onChange = (key: string) => {
    const selectedBanner = banner.find(bannerItem => bannerItem.key === key);
    if (selectedBanner) {
      setBannerSrc(selectedBanner.src);
    } else {
      setBannerSrc('');
    }
  };

  return (
   
    <div>
      <div className='bg-img'>
         <img src={bannerSrc} alt="1" width='100%' height='100%' />
      </div>
      <div className='py-6 px-2 '>
        <Tabs centered onChange={onChange} type="card" items={items} className='quick-lookup' />
      </div>
    </div>
  );
};
