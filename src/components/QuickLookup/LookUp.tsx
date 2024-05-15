import { Radio } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { AwbLookup } from './AwbLookup';
import { FlightLookup } from './FlightLookup';
import { InvoicesLookup } from './InvoicesLookup';

function LookUp() {
  const [value, setValue] = useState(1);
  const { t } = useTranslation(["common"]);
  
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className='container'>
      <Radio.Group value={value} onChange={handleOnChange}  className='d-flex justify-content-center pb-5'>
        <Radio value={1}>{t('Lookup AWB No', { ns: 'common' })}</Radio>
        <Radio value={2}>{t('Lookup Flight', { ns: 'common' })}</Radio>
        <Radio value={3}>{t('Invoices Lookup', { ns: 'common' })}</Radio>
      </Radio.Group>
      <div className='d-flex justify-content-center'>
        {value === 1 && <AwbLookup />}
        {value === 2 && <FlightLookup />}
        {value === 3 && <InvoicesLookup />}
      </div>
    </div>
  )
}

export default LookUp