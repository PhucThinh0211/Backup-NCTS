import { Radio, RadioChangeEvent } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AwbLookup } from './AwbLookup';
import { FlightLookup } from './FlightLookup';
import { InvoicesLookup } from './InvoicesLookup';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LookupType, appActions, getActiveLookup } from '@/store/app';

function LookUp() {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();

  const activeLookup = useAppSelector(getActiveLookup());

  const handleOnChange = (e: RadioChangeEvent) => {
    const lookupValue = e.target.value;
    dispatch(appActions.setActiveLookup(lookupValue));
  };

  const radioOptions = [
    {
      label: t('AWB', { ns: 'common' }),
      value: LookupType.AWB,
    },
    {
      label: t('Flight', { ns: 'common' }),
      value: LookupType.FLIGHT,
    },
    {
      label: t('E-Invoice', { ns: 'common' }),
      value: LookupType.INVOICE,
    },
  ];

  const renderLookupForm = (lookupType: LookupType) => {
    switch (lookupType) {
      case LookupType.AWB:
        return <AwbLookup />;

      case LookupType.FLIGHT:
        return <FlightLookup />;

      case LookupType.INVOICE:
        return <InvoicesLookup />;

      default:
        break;
    }
  };

  return (
    <div className=' container-md look-up'>
      <Radio.Group
        value={activeLookup}
        onChange={handleOnChange}
        className='d-flex justify-content-start flex-column flex-sm-row mb-3 gap-xl-5'
      >
        {radioOptions.map(({ label, value }) => (
          <Radio key={value} value={value}>
            <span
              style={{ fontWeight: value === activeLookup ? 500 : 'normal' }}
            >
              {label}{' '}
            </span>
          </Radio>
        ))}
      </Radio.Group>
      {activeLookup && (
        <div className='d-flex justify-content-center'>
          <div className='LookupContent'>{renderLookupForm(activeLookup)}</div>
        </div>
      )}
    </div>
  );
}

export default LookUp;
