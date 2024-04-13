import { InformationTimestamp } from '@/components/InformationTimestamp';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  bannerActions,
  getBannerLocale,
  getSelectedBanner,
} from '@/store/banner';

export const BannerInformation = () => {
  const dispatch = useAppDispatch();
  const selectedBanner = useAppSelector(getSelectedBanner());
  const bannerLocale = useAppSelector(getBannerLocale());
  const props = {
    createdAt: selectedBanner?.creationTime || undefined,
    createdBy: selectedBanner?.creatorId || undefined,
    updatedAt: selectedBanner?.lastModificationTime || undefined,
    updatedBy: selectedBanner?.lastModifierId || undefined,
  };
  return (
    <InformationTimestamp
      {...props}
      locale={bannerLocale}
      onChangeLocale={(locale) =>
        dispatch(bannerActions.setBannerLocale(locale))
      }
    />
  );
};
