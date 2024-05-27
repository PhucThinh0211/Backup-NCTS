import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { AuditedInfoCard } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSelectedDocumentTypeDetail } from '@/store/documentType';
import { getLocale, persistStateActions } from '@/store/persistState';
import { LanguageType, dateTimeFormat } from '@/common';

export const AuditedDocumentType = () => {
  const { t } = useTranslation(['common']);
  const locales = useAppSelector(getLocale());
  const dispatch = useAppDispatch();
  const selectedDocumentTypeDetail = useAppSelector(
    getSelectedDocumentTypeDetail()
  );

  const props = {
    createdAt: selectedDocumentTypeDetail?.creationTime
      ? dayjs(selectedDocumentTypeDetail?.creationTime).format(dateTimeFormat)
      : t('Now', { ns: 'common' }),
    createdBy: selectedDocumentTypeDetail?.creatorId || undefined,
    updatedAt: selectedDocumentTypeDetail?.lastModificationTime
      ? dayjs(selectedDocumentTypeDetail?.lastModificationTime).format(
          dateTimeFormat
        )
      : t('Now', { ns: 'common' }),
    updatedBy: selectedDocumentTypeDetail?.lastModifierId || undefined,
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
