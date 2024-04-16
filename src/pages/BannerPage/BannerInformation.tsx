import { AuditedInfoCard } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  bannerActions,
  getSelectedBanner,
} from '@/store/banner';
import { getLocale } from '@/store/persistState';

export const BannerInformation = () => {
  const dispatch = useAppDispatch();
  const selectedBanner = useAppSelector(getSelectedBanner());
  const bannerLocale = useAppSelector(getLocale());
  const props = {
    createdAt: selectedBanner?.creationTime || undefined,
    createdBy: selectedBanner?.creatorId || undefined,
    updatedAt: selectedBanner?.lastModificationTime || undefined,
    updatedBy: selectedBanner?.lastModifierId || undefined,
  };
  return (
    <AuditedInfoCard
      {...props}
      locale={bannerLocale}
      onChangeLocale={(locale) =>
        dispatch(bannerActions.setBannerLocale(locale))
      }
    />
  );
};
