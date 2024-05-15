import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { AuditedInfoCard } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSelectedCompanyDetail } from '@/store/company';
import { getLocale, persistStateActions } from '@/store/persistState';
import { LanguageType, dateTimeFormat } from '@/common';

export const AuditedCompany = () => {
  const { t } = useTranslation(['common']);
  const locales = useAppSelector(getLocale());
  const dispatch = useAppDispatch();
  const selectedCompanyDetail = useAppSelector(getSelectedCompanyDetail());

  const props = {
    createdAt: selectedCompanyDetail?.creationTime
      ? dayjs(selectedCompanyDetail?.creationTime + 'Z').format(dateTimeFormat)
      : t('Now', { ns: 'common' }),
    createdBy: selectedCompanyDetail?.creatorId || undefined,
    updatedAt: selectedCompanyDetail?.lastModificationTime
      ? dayjs(selectedCompanyDetail?.lastModificationTime + 'Z').format(
          dateTimeFormat
        )
      : t('Now', { ns: 'common' }),
    updatedBy: selectedCompanyDetail?.lastModifierId || undefined,
  };

  const handleChangeLocale = (locale: LanguageType) => {
    dispatch(persistStateActions.setLocale(locale));
  };
  return (
    <AuditedInfoCard
      {...props}
      locale={locales}
      onChangeLocale={handleChangeLocale}
    />
  );
};