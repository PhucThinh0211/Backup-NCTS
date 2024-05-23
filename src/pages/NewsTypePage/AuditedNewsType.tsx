import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { AuditedInfoCard } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSelectedNewsTypeDetail } from '@/store/newsType';
import { getLocale, persistStateActions } from '@/store/persistState';
import { LanguageType, dateTimeFormat } from '@/common';

export const AuditedNewsType = () => {
  const { t } = useTranslation(['common']);
  const locales = useAppSelector(getLocale());
  const dispatch = useAppDispatch();
  const selectedNewsTypeDetail = useAppSelector(getSelectedNewsTypeDetail());

  const props = {
    createdAt: selectedNewsTypeDetail?.creationTime
      ? dayjs(selectedNewsTypeDetail?.creationTime).format(dateTimeFormat)
      : t('Now', { ns: 'common' }),
    createdBy: selectedNewsTypeDetail?.creatorId || undefined,
    updatedAt: selectedNewsTypeDetail?.lastModificationTime
      ? dayjs(selectedNewsTypeDetail?.lastModificationTime).format(
          dateTimeFormat
        )
      : t('Now', { ns: 'common' }),
    updatedBy: selectedNewsTypeDetail?.lastModifierId || undefined,
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
