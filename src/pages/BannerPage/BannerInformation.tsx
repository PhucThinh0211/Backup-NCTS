import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { AuditedInfoCard } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSelectedBannerDetail } from '@/store/banner';
import { getLocale, persistStateActions } from '@/store/persistState';
import { LanguageType, dateTimeFormat } from '@/common';

export const BannerInformation = () => {
  const { t } = useTranslation(['common']);
  const locales = useAppSelector(getLocale());
  const dispatch = useAppDispatch();
  const selectedBannerDetail = useAppSelector(getSelectedBannerDetail());

  const props = {
    createdAt: selectedBannerDetail?.creationTime
      ? dayjs(selectedBannerDetail?.creationTime).format(dateTimeFormat)
      : t('Now', { ns: 'common' }),
    createdBy: selectedBannerDetail?.creatorId || undefined,
    updatedAt: selectedBannerDetail?.lastModificationTime
      ? dayjs(selectedBannerDetail?.lastModificationTime).format(dateTimeFormat)
      : t('Now', { ns: 'common' }),
    updatedBy: selectedBannerDetail?.lastModifierId || undefined,
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
