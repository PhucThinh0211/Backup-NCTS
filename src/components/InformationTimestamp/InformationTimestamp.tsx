import { Avatar, Divider, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { InformationDescription } from '../InformationDescription';
import vi from '@/assets/vn.svg';
import en from '@/assets/us.svg';
import { ReactNode } from 'react';

interface InformationTimestampProps {
  createdAt?: ReactNode;
  createdBy?: ReactNode;
  updatedAt?: ReactNode;
  updatedBy?: ReactNode;
  locale?: string;
  onChangeLocale?: (value: string) => void;
}
export const InformationTimestamp = ({
  createdAt,
  createdBy,
  updatedAt,
  updatedBy,
  locale,
  onChangeLocale,
}: InformationTimestampProps) => {
  const { t } = useTranslation(['common']);
  return (
    <div className='w-full border-b-gray-500 shadow-sm rounded-md bg-white p-4'>
      {(createdAt || createdBy || updatedAt || updatedBy) && (
        <div className='mb-8'>
          <span className='uppercase text-gray-500 text-sm font-medium'>
            {t('Information', { ns: 'common' })}
          </span>
          <Divider className='!my-3' />
          <div className='flex flex-col gap-1'>
            {createdAt && (
              <InformationDescription
                label={t('Created', { ns: 'common' })}
                value={createdAt}
              />
            )}
            {createdBy && (
              <InformationDescription
                label={t('By', { ns: 'common' })}
                value={createdBy}
              />
            )}
            {updatedAt && (
              <InformationDescription
                label={t('Last update', { ns: 'common' })}
                value={updatedAt}
              />
            )}
            {updatedBy && (
              <InformationDescription
                label={t('By', { ns: 'common' })}
                value={updatedBy}
              />
            )}
          </div>
        </div>
      )}

      <div>
        <span className='uppercase text-gray-500 text-sm font-medium'>
          {t('Translation', { ns: 'common' })}
        </span>
        <Divider className='!my-3' />
        <div className='flex flex-col gap-1'>
          <span className='font-semibold text-[14px]'>
            {t('Locales', { ns: 'common' })}
          </span>
          <Select
            className='w-full'
            value={locale}
            onChange={onChangeLocale}
            options={[
              {
                label: (
                  <div className='flex flex-row items-center gap-2'>
                    <Avatar src={vi} shape='square' size={15} />
                    <span>Tiếng việt</span>
                  </div>
                ),
                value: 'vi',
              },
              {
                label: (
                  <div className='flex flex-row items-center gap-2'>
                    <Avatar src={en} shape='square' size={15} />
                    <span>English</span>
                  </div>
                ),
                value: 'en',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
