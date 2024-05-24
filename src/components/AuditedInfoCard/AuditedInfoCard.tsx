import { Avatar, Divider, Select, Typography } from 'antd';
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
    <div className="w-100 border-b-gray-500 shadow-sm rounded bg-white p-3 mb-3">
      <div style={{ marginBottom: 12 }}>
        <Typography.Text strong style={{ textTransform: 'uppercase', fontWeight: 700}}>
          {t('Information', { ns: 'common' })}
        </Typography.Text>
        <Divider style={{ marginBlock: 8}} />
        <div className="d-flex flex-column gap-1">
          <AuditedInfo label={t('Created at', { ns: 'common' })} value={createdAt || 'now'} />
          <AuditedInfo label={t('Created by', { ns: 'common' })} value={createdBy || '-'} />
          <AuditedInfo label={t('Updated at', { ns: 'common' })} value={updatedAt || 'now'} />
          <AuditedInfo label={t('Updated by', { ns: 'common' })} value={updatedBy || '-'} />
        </div>
      </div>

      <div>
        <Typography.Text strong style={{ textTransform: 'uppercase', fontWeight: 700}}>
          {t('Translation', { ns: 'common' })}
        </Typography.Text>
        <Divider style={{ marginBlock: 8}} />
        <div className="flex flex-col gap-1">
          <Typography.Text strong style={{ fontSize: 14 }}>{t('Locales', { ns: 'common' })}</Typography.Text>
          <Select
            className="w-100"
            value={locale}
            onChange={onChangeLocale}
            options={[
              {
                label: (
                  <div className="d-flex flex-row align-items-center gap-2">
                    <Avatar src={vi} shape="square" size={15} />
                    <span>Tiếng Việt</span>
                  </div>
                ),
                value: 'vi',
              },
              {
                label: (
                  <div className="d-flex flex-row align-items-center gap-2">
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
