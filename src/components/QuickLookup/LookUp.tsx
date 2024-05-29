import { Radio, RadioChangeEvent } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AwbLookup } from './AwbLookup';
import { FlightLookup } from './FlightLookup';
import { InvoicesLookup } from './InvoicesLookup';

function LookUp() {
  const [value, setValue] = useState(1);
  const { t } = useTranslation(['common']);

  const handleOnChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <div className=' container-md look-up'>
      <Radio.Group
        value={value}
        onChange={handleOnChange}
        className='d-flex justify-content-between flex-column flex-sm-row mb-3 gap-xl-5'
      >
        <Radio value={1}>
          <span style={{ fontWeight: value === 1 ? 600 : 'normal' }}>
            {t('AWB', { ns: 'common' })}{' '}
          </span>
        </Radio>
        <Radio value={2}>
          {' '}
          <span style={{ fontWeight: value === 2 ? 600 : 'normal' }}>
            {t('Flight', { ns: 'common' })}
          </span>
        </Radio>
        <Radio value={3}>
          {' '}
          <span style={{ fontWeight: value === 3 ? 600 : 'normal' }}>
            {t('E-Invoice', { ns: 'common' })}
          </span>
        </Radio>
      </Radio.Group>
      <div className='d-flex justify-content-center'>
        <div className='LookupContent'>
          {value === 1 && <AwbLookup />}
          {value === 2 && <FlightLookup />}
          {value === 3 && <InvoicesLookup />}
        </div>
      </div>
    </div>
  );
}

export default LookUp;
