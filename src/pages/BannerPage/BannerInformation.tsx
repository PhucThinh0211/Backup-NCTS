import { Divider, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { InformationDescription } from './InformationDescription';
import { BorderlessTableOutlined } from '@ant-design/icons';

export const BannerInformation = () => {
  const { t } = useTranslation(['common', 'banner']);
  return (
    <div className='w-full border-b-gray-500 shadow-sm rounded-md bg-white p-4'>
      <div className='mb-8'>
        <span className='uppercase text-gray-500 text-sm font-medium'>
          {t('Information', { ns: 'common' })}
        </span>
        <Divider className='!my-3' />
        <div className='flex flex-col gap-1'>
          <InformationDescription
            label={t('Created', { ns: 'common' })}
            value={'2 years ago'}
          />
          <InformationDescription
            label={t('By', { ns: 'common' })}
            value={'Admin'}
          />
          <InformationDescription
            label={t('Last update', { ns: 'common' })}
            value={'2 years ago'}
          />
          <InformationDescription
            label={t('By', { ns: 'common' })}
            value={'Admin'}
          />
        </div>
      </div>

      <div>
        <span className='uppercase text-gray-500 text-sm font-medium'>
          {t('Internationalization', { ns: 'common' })}
        </span>
        <Divider className='!my-3' />
        <div className='flex flex-col gap-1'>
          <span className='font-semibold text-[14px]'>
            {t('Locales', { ns: 'common' })}
          </span>
          <Select className='w-full' />
        </div>
        <span className='text-blue-800'>
          <BorderlessTableOutlined style={{ fontSize: 12, marginRight: 5 }} />
          {t('Fill in from another locale', { ns: 'common' })}
        </span>
      </div>
    </div>
  );
};
