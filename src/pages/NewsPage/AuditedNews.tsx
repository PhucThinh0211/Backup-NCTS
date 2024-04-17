import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { AuditedInfoCard } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSelectedContentDetail } from '@/store/content';
import { getLocale, persistStateActions } from '@/store/persistState';
import { LanguageType, dateTimeFormat } from '@/common';

export const AuditedNews = () => {
  const { t } = useTranslation(['common']);
  const locales = useAppSelector(getLocale());
  const dispatch = useAppDispatch();
  const selectedContentDetail = useAppSelector(getSelectedContentDetail());

  const props = {
    createdAt: selectedContentDetail?.creationTime
      ? dayjs(selectedContentDetail?.creationTime).format(dateTimeFormat)
      : t('Now', { ns: 'common' }),
    createdBy: selectedContentDetail?.creatorId || undefined,
    updatedAt: selectedContentDetail?.lastModificationTime
      ? dayjs(selectedContentDetail?.lastModificationTime).format(
          dateTimeFormat
        )
      : t('Now', { ns: 'common' }),
    updatedBy: selectedContentDetail?.lastModifierId || undefined,
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
