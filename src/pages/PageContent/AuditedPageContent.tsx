import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { AuditedInfoCard } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSelectedPageContentDetail } from '@/store/pageContent';
import { getLocale, persistStateActions } from '@/store/persistState';
import { LanguageType, dateTimeFormat } from '@/common';

export const AuditedPageContent = () => {
  const { t } = useTranslation(['common']);
  const locales = useAppSelector(getLocale());
  const dispatch = useAppDispatch();
  const selectedPageContentDetail = useAppSelector(getSelectedPageContentDetail());

  const props = {
    createdAt: selectedPageContentDetail?.creationTime
      ? dayjs(selectedPageContentDetail?.creationTime).format(dateTimeFormat)
      : t('Now', { ns: 'common' }),
    createdBy: selectedPageContentDetail?.creatorId || undefined,
    updatedAt: selectedPageContentDetail?.lastModificationTime
      ? dayjs(selectedPageContentDetail?.lastModificationTime).format(
          dateTimeFormat
        )
      : t('Now', { ns: 'common' }),
    updatedBy: selectedPageContentDetail?.lastModifierId || undefined,
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
