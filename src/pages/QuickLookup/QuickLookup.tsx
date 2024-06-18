import { LookupType, appActions, getActiveLookup } from '@/store/app';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Tabs, TabsProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { AwbLookupResult } from './components/AwbLookupResult';
import { FlightLookupResult } from './components/FlightLookupResult';
import { InvoiceLookupResult } from './components/InvoiceLookupResult';

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
    dispatch(appActions.setActiveLookup(key));
  };

  return (
    <div
      className='container-fluid px-1 px-md-3'
      style={{ backgroundColor: '#fefefe' }}
    >
      <Tabs items={items} activeKey={activeLookup} onChange={handleChange} />
    </div>
  );
};
