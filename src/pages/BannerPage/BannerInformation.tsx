import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { AuditedInfoCard } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getSelectedBanner,
} from '@/store/banner';
import { getLocale, persistStateActions } from '@/store/persistState';
import { LanguageType, dateTimeFormat } from '@/common';

export const BannerInformation = () => {
  const { t } = useTranslation(['common']);
  const locales = useAppSelector(getLocale());
  const dispatch = useAppDispatch();
  const selectedBanner = useAppSelector(getSelectedBanner());

  const props = {
    createdAt: selectedBanner?.creationTime
      ? dayjs(selectedBanner?.creationTime).format(dateTimeFormat)
      : t('Now', { ns: 'common' }),
    createdBy: selectedBanner?.creatorId || undefined,
    updatedAt: selectedBanner?.lastModificationTime
      ? dayjs(selectedBanner?.lastModificationTime).format(dateTimeFormat)
      : t('Now', { ns: 'common' }),
    updatedBy: selectedBanner?.lastModifierId || undefined,
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
