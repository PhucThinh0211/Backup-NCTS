import { BannerResponse } from '@/services/BannerService';

export const banners: BannerResponse[] = new Array(20)
  .fill(null)
  .map((_, index) => {
    return {
      id: index,
      title: `Banner ${index + 1}`,
    };
  });
