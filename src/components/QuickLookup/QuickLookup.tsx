import { Tabs, TabsProps } from 'antd';

import { AwbLookup } from './AwbLookup';
import { FlightLookup } from './FlightLookup';
import { InfoLookup } from './InfoLookup';
import { FreightEstimate } from './FreightEstimate';

export const QuickLookup = () => {
  const items: TabsProps['items'] = [
    {
      key: 'lookupAwb',
      label: 'Tra cứu vận đơn',
      children: <AwbLookup />,
    },
    {
      key: 'lookupFlightSchedules',
      label: 'Tra cứu lịch bay',
      children: <FlightLookup />,
    },
    {
      key: 'freightEstimate',
      label: 'Tính thử phí hàng xuất, nhập',
      children: <FreightEstimate />,
    },
    {
      key: 'infoLookup',
      label: 'Tìm kiếm',
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
