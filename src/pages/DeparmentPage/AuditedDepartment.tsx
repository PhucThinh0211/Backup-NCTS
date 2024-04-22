import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { AuditedInfoCard } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSelectedDepartment } from '@/store/department';
import { LanguageType, dateTimeFormat } from '@/common';
import { getLocale, persistStateActions } from '@/store/persistState';

export const AuditedDepartment = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const selectedDepartment = useAppSelector(getSelectedDepartment());
  const locales = useAppSelector(getLocale());
  const props = {
    createdAt: selectedDepartment?.creationTime
      ? dayjs(selectedDepartment?.creationTime).format(dateTimeFormat)
      : t('Now', { ns: 'common' }),
    createdBy: selectedDepartment?.creatorId || undefined,
    updatedAt: selectedDepartment?.lastModificationTime
      ? dayjs(selectedDepartment?.lastModificationTime).format(dateTimeFormat)
      : t('Now', { ns: 'common' }),
    updatedBy: selectedDepartment?.lastModifierId || undefined,
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
