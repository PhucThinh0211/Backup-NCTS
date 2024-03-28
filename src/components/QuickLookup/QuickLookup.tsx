import { Tabs, TabsProps } from 'antd';

import { AwbLookup } from './AwbLookup';
import { FlightLookup } from './FlightLookup';
import { InfoLookup } from './InfoLookup';
import { FreightEstimate } from './FreightEstimate';
import { useTranslation } from 'react-i18next';

export const QuickLookup = () => {
  const { t } = useTranslation(['common']);

  const items: TabsProps['items'] = [
    {
      key: 'lookupAwb',
      label: t('Lookup AWB No', { ns: 'common' }),
      children: <AwbLookup />,
    },
    {
      key: 'lookupFlightSchedules',
      label: t('Lookup Flight', { ns: 'common' }),
      children: <FlightLookup />,
    },
    {
      key: 'freightEstimate',
      label: t('Estimate charge', { ns: 'common' }),
      children: <FreightEstimate />,
    },
    {
      key: 'infoLookup',
      label: t('Search', { ns: 'common' }),
      children: <InfoLookup />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className='container py-6'>
      <Tabs onChange={onChange} type="card" items={items} className='quick-lookup' />
    </div>
  );
};
