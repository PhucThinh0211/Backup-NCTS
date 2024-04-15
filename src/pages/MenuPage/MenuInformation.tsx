import { InformationTimestamp } from '@/components/InformationTimestamp';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSelectedMenu } from '@/store/menu';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { LanguageType, dateTimeFormat } from '@/common';
import { getLocales, persistStateActions } from '@/store/persistState';

export const MenuInformation = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const selectedMenu = useAppSelector(getSelectedMenu());
  const locales = useAppSelector(getLocales());
  const props = {
    createdAt: selectedMenu?.creationTime
      ? dayjs(selectedMenu?.creationTime).format(dateTimeFormat)
      : t('Now', { ns: 'common' }),
    createdBy: selectedMenu?.creatorId || undefined,
    updatedAt: selectedMenu?.lastModificationTime
      ? dayjs(selectedMenu?.lastModificationTime).format(dateTimeFormat)
      : t('Now', { ns: 'common' }),
    updatedBy: selectedMenu?.lastModifierId || undefined,
  };

  const handleChangeLocale = (locale: LanguageType) => {
    dispatch(persistStateActions.setLocales(locale));
  };

  return (
    <InformationTimestamp
      {...props}
      locale={locales}
      onChangeLocale={handleChangeLocale}
    />
  );
};
