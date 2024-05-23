import React from 'react';

import { useTranslation } from 'react-i18next';
import { Collapse, CollapseProps, Typography } from 'antd';

import { FreightEstimate } from './FreightEstimate';
import { OnlineCheckin } from './OnlineCheckin';
import LookUp from './LookUp';
import { getTabLookupActive, persistStateActions } from '@/store/persistState';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const QuickLookupMobile = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common']);
  const tabActive = useAppSelector(getTabLookupActive()); 

  const panelStyle: React.CSSProperties = {
    border: 'none',
    borderBottom: '0.0625rem solid rgba(0, 0, 0, 0.125)',
    borderRadius: '0',
    backgroundColor: 'white',
  };

  const items: CollapseProps['items'] = [
    {
      key: 'online-check-in',
      label: (
        <Typography.Text strong>
          {t('Online check-in', { ns: 'common' })}
        </Typography.Text>
      ),
      children: <OnlineCheckin />,
      style: panelStyle,
    },
    {
      key: 'lookup',
      label: (
        <Typography.Text strong>
          {t('Lookup information', { ns: 'common' })}
        </Typography.Text>
      ),
      children: <LookUp />,
      style: panelStyle,
    },
    {
      key: 'estimate-charge',
      label: (
        <Typography.Text strong>
          {t('Estimate charge', { ns: 'common' })}
        </Typography.Text>
      ),
      children: <FreightEstimate />,
      style: panelStyle,
    },
  ];

  const onTabChange = (key: string | string[]) => {
    dispatch(persistStateActions.setTabLookupActive(key));
  }

  return (
    <Collapse
      activeKey={tabActive}
      onChange={onTabChange}
      className='rounded-0 border-0 mb-2'
      accordion
      expandIconPosition={'end'}
      items={items}
      destroyInactivePanel={true}
    />
  );
};
