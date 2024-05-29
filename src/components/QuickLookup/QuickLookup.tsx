import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Tabs, TabsProps } from 'antd';
import {
  FileSearchOutlined,
  BarChartOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { OnlineCheckin } from './OnlineCheckin';
import LookUp from './LookUp';
import { FreightEstimate } from './FreightEstimate';
import './QuickLookup.scss';
import { useWindowSize } from '@/hooks/useWindowSize';
import { bootstrapBreakpoints } from '@/common';
import { QuickLookupMobile } from './QuickLookupMobile';
import { getTabLookupActive, persistStateActions } from '@/store/persistState';
import { publicCmsActions } from '@/store/publicCms';

export const QuickLookup = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const [innerWidth] = useWindowSize();
  const activeLookupTab = useAppSelector(getTabLookupActive());

  useEffect(() => {
    dispatch(publicCmsActions.getCaptchaRequest());
  }, []);

  const items: TabsProps['items'] = [
    {
      key: 'online-check-in',
      label: t('Online check-in', { ns: 'common' }),
      children: <OnlineCheckin />,
      icon: <FileProtectOutlined />,
    },
    {
      key: 'lookup',
      label: t('Lookup information', { ns: 'common' }),
      children: <LookUp />,
      icon: <FileSearchOutlined />,
    },
    {
      key: 'estimate-charge',
      label: t('Estimate charge', { ns: 'common' }),
      children: <FreightEstimate />,
      icon: <BarChartOutlined />,
    }
  ];

  const onChange = (key: string) => {
    dispatch(persistStateActions.setTabLookupActive(key));
  };

  useEffect(() => {
    const tabsNavList = document.querySelector(
      '.ant-tabs.quick-lookup .ant-tabs-nav-list'
    ) as HTMLElement;
    const tabsContentHolder = document.querySelector(
      '.ant-tabs.quick-lookup .ant-tabs-content'
    ) as HTMLElement;
    if (tabsNavList && tabsContentHolder) {
      tabsContentHolder.style.maxWidth = `${tabsNavList.clientWidth}px`;
      tabsContentHolder.style.marginInline = `auto`;
    }
  }, []);

  return (
    <div className='quickLookup bg-opacity-25'>
      <div className='lookup-layer'></div>
      {innerWidth > bootstrapBreakpoints.md ? (
        <div className='px-2'>
          <Tabs
            centered
            onChange={onChange}
            activeKey={activeLookupTab}
            type='card'
            items={items}
            className='quick-lookup'
            destroyInactiveTabPane={true}
          />
        </div>
      ) : (
        <QuickLookupMobile />
      )}
    </div>
  );
};
