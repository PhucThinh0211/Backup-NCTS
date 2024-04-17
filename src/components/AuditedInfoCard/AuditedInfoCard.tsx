import { Avatar, Divider, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { AuditedInfo } from './AuditedInfo';
import vi from '@/assets/vn.svg';
import en from '@/assets/us.svg';
import { ReactNode } from 'react';
import { LanguageType } from '@/common';

interface InfoCardProps {
  createdAt?: ReactNode;
  createdBy?: ReactNode;
  updatedAt?: ReactNode;
  updatedBy?: ReactNode;
  locale?: LanguageType;
  onChangeLocale?: (value: LanguageType) => void;
}
export const AuditedInfoCard = ({
  createdAt,
  createdBy,
  updatedAt,
  updatedBy,
  locale,
  onChangeLocale,
}: InfoCardProps) => {
  const { t } = useTranslation(['common']);
  return (
    <div className="w-full border-b-gray-500 shadow-sm rounded-md bg-white p-4">
      <div className="mb-8">
        <span className="uppercase text-gray-500 text-sm font-medium">
          {t('Information', { ns: 'common' })}
        </span>
        <Divider className="!my-3" />
        <div className="flex flex-col gap-1">
          <AuditedInfo label={t('Created at', { ns: 'common' })} value={createdAt || 'now'} />
          <AuditedInfo label={t('Created by', { ns: 'common' })} value={createdBy || '-'} />
          <AuditedInfo label={t('Updated at', { ns: 'common' })} value={updatedAt || 'now'} />
          <AuditedInfo label={t('Updated by', { ns: 'common' })} value={updatedBy || '-'} />
        </div>
      </div>

      <div>
        <span className="uppercase text-gray-500 text-sm font-medium">
          {t('Translation', { ns: 'common' })}
        </span>
        <Divider className="!my-3" />
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-[14px]">{t('Locales', { ns: 'common' })}</span>
          <Select
            className="w-full"
            value={locale}
            onChange={onChangeLocale}
            options={[
              {
                label: (
                  <div className="flex flex-row items-center gap-2">
                    <Avatar src={vi} shape="square" size={15} />
                    <span>Tiếng Việt</span>
                  </div>
                ),
                value: 'vi',
              },
              {
                label: (
                  <div className="flex flex-row items-center gap-2">
                    <Avatar src={en} shape="square" size={15} />
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
