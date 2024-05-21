import HttpClient from './HttpClient';
import { RequestOptions } from './types';
import { PagingResponse } from '@/common/define';
import { getEnvVars } from '@/enviroment';

const { apiUrl } = getEnvVars();

export interface BannersPagingResponse extends PagingResponse {
  items: BannerResponse[];
}

export enum BannerVertical {
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
}

export enum BannerHorizontal {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}
export interface BannerResponse {
  id: string;
  creationTime: string;
  creatorId: string | null;
  lastModificationTime: string;
  lastModifierId: string | null;
  isDeleted: boolean;
  deleterId: string | null;
  deletionTime: string | null;
  photoUrl: string | null;
  title: string | null;
  description: string | null;
  buttonLabel: string | null;
  linkButton: string | null;
  horizontal: BannerHorizontal | null;
  vertical: BannerVertical | null;
  pageUrls: string[];
  language: string | null;
  buttonColor: string | null;
  buttonLabelColor: string | null;
  titleColor: string | null;
  descriptionColor: string | null;
}
export interface CreateUpdateBannerPayload {
  photoUrl: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  linkButton?: string;
  horizontal?: string;
  vertical?: string;
  pageUrls?: string[];
  sortSeq?: number;
}
export interface CreateUpdateBannerTranslationPayload {
  language: string;
  photoUrl: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
}

class BannerController {
  public Get = {
    getAllBanners: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/banner`, options);
    },
    getBannerById: (bannerId: string, options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/banner/${bannerId}`, options);
    },
  };

  public Post = {
    createBanner: (
      input: CreateUpdateBannerPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(`${apiUrl}/api/app/banner`, input, options);
    },
    createBannerTranslations: (
      bannerId: string,
      input: CreateUpdateBannerTranslationPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(
        `${apiUrl}/api/app/banner/${bannerId}/translations`,
        input,
        options
      );
    },
  };

  public Put = {
    updateBanner: (
      bannerId: string,
      input: CreateUpdateBannerPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.put(
        `${apiUrl}/api/app/banner/${bannerId}`,
        input,
        options
      );
    },
  };

  public delete = {
    removeBanner: (bannerId: string, options?: RequestOptions) => {
      return HttpClient.delete(`${apiUrl}/api/app/banner/${bannerId}`, options);
    },
  };
}

export const BannerService = new BannerController();
