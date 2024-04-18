import HttpClient from './HttpClient';
import { RequestOptions } from './types';
import { PagingResponse } from '@/common/define';
import { getEnvVars } from '@/enviroment';

const { apiUrl } = getEnvVars();

export interface SeosPagingResponse extends PagingResponse {
  items: SeoResponse[];
}

export interface SeoResponse {
  id: string;
  creationTime: string;
  creatorId: string | null;
  lastModificationTime: string;
  lastModifierId: string | null;
  photoUrl: string | null;
  title: string | null;
  description: string | null;
  language: string | null;
}
export interface CreateUpdateSeoPayload {
  title: string;
  description: string | null;
  photoUrl: string | null;
}
export interface CreateUpdateSeoTranslationPayload {
  language: string;
  title: string;
  description: string | null;
}

class SeoController {
  public Get = {
    getAllSeos: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/seo`, options);
    },
    getSeoById: (seoId: string, options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/seo/${seoId}`, options);
    },
  };

  public Post = {
    createSeo: (
      input: CreateUpdateSeoPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(`${apiUrl}/api/app/seo`, input, options);
    },
    createSeoTranslations: (
      seoId: string,
      input: CreateUpdateSeoTranslationPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(
        `${apiUrl}/api/app/seo/${seoId}/translations`,
        input,
        options
      );
    },
  };

  public Put = {
    updateSeo: (
      seoId: string,
      input: CreateUpdateSeoPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.put(
        `${apiUrl}/api/app/seo/${seoId}`,
        input,
        options
      );
    },
  };

  public delete = {
    removeSeo: (seoId: string, options?: RequestOptions) => {
      return HttpClient.delete(
        `${apiUrl}/api/app/seo/${seoId}`,
        options
      );
    },
  };
}

export const SeoService = new SeoController();
