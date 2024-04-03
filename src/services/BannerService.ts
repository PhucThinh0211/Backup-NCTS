import HttpClient from './HttpClient';
import { RequestOptions } from './types';
import { PagingResponse } from '@/common/define';
// import { getEnvVars } from '@/environment';

// const { apiUrl } = getEnvVars();
const apiUrl = '';

export interface BannersPagingResponse extends PagingResponse {
  results: BannerResponse[];
}

export interface BannerResponse {
  id: number;
  title: string;
  imgUrl?: string;
  description?: string;
  link?: string;
}
export interface CreateUpdateBannerPayload {
  label: string;
  url?: string;
  icons?: string;
  style: string;
  sortSeq?: number;
}

class BannerController {
  public Get = {
    getAllBanners: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/Banner`, options);
    },
    getBannerById: (bannerId: number, options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/Banner/${bannerId}`, options);
    },
  };

  public Post = {
    createBanner: (
      input: CreateUpdateBannerPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(`${apiUrl}/api/Banner`, input, options);
    },
  };

  public Put = {
    updateBanner: (
      bannerId: number,
      input: CreateUpdateBannerPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.put(`${apiUrl}/api/Banner/${bannerId}`, input, options);
    },
  };

  public delete = {
    removeBanner: (bannerId: number, options?: RequestOptions) => {
      return HttpClient.delete(`${apiUrl}/api/Banner/${bannerId}`, options);
    },
  };
}

export const BannerService = new BannerController();
