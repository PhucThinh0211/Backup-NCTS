import { LookupType, appActions, getActiveLookup } from '@/store/app';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Tabs, TabsProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { AwbLookupResult } from './components/AwbLookupResult';
import { FlightLookupResult } from './components/FlightLookupResult';
import { InvoiceLookupResult } from './components/InvoiceLookupResult';
import { NCTS_InvoiceUrl } from '@/common';
import { Helmet } from 'react-helmet-async';
import { SEO } from '@/components';

export const QuickLookupPage = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();

  const items: TabsProps['items'] = [
    {
      key: LookupType.AWB,
      label: t('AWB', { ns: 'common' }),
      children: <AwbLookupResult />,
    },
    {
      key: LookupType.FLIGHT,
      label: t('Flight', { ns: 'common' }),
      children: <FlightLookupResult />,
    },
    {
      key: LookupType.INVOICE,
      label: t('E-Invoice', { ns: 'common' }),
      children: <InvoiceLookupResult />,
    },
  ];
  const activeLookup = useAppSelector(getActiveLookup());

  const handleChange = (key: string) => {
    if (key === LookupType.INVOICE) {
      window.open(NCTS_InvoiceUrl, '_blank');
      return;
    }
    dispatch(appActions.setActiveLookup(key));
  };

  return (
    <div
      className='container px-2 px-md-3'
      style={{ backgroundColor: '#fefefe' }}
    >
      <SEO title={t('Lookup information')} />
      <Tabs items={items} activeKey={activeLookup} onChange={handleChange} />
    </div>
  );
};
