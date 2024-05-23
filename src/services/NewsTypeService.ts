import HttpClient from './HttpClient';
import { RequestOptions } from './types';
import { PagingResponse } from '@/common/define';
import { getEnvVars } from '@/enviroment';

const { apiUrl } = getEnvVars();

export interface NewsTypesPagingResponse extends PagingResponse {
  items: NewsTypeResponse[];
}

export interface NewsTypeResponse {
  id: string;
  creationTime: string;
  creatorId: string | null;
  lastModificationTime: string;
  lastModifierId: string | null;
  isDeleted: boolean;
  deleterId: string | null;
  deletionTime: string | null;
  code: string | null;
  name: string | null;
  sortSeq: number;
  language: string | null;
}
export interface CreateUpdateNewsTypePayload {
  code: string;
  name: string;
  sortSeq?: number;
}
export interface CreateUpdateNewsTypeTranslationPayload {
  language: string;
  name: string;
}

class NewsTypeController {
  public Get = {
    getAllNewsTypes: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/news-type`, options);
    },
    getNewsTypeById: (newsTypeId: string, options?: RequestOptions) => {
      return HttpClient.get(
        `${apiUrl}/api/app/news-type/${newsTypeId}`,
        options
      );
    },
  };

  public Post = {
    createNewsType: (
      input: CreateUpdateNewsTypePayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(`${apiUrl}/api/app/news-type`, input, options);
    },
    createNewsTypeTranslations: (
      newsTypeId: string,
      input: CreateUpdateNewsTypeTranslationPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(
        `${apiUrl}/api/app/news-type/${newsTypeId}/translations`,
        input,
        options
      );
    },
  };

  public Put = {
    updateNewsType: (
      newsTypeId: string,
      input: CreateUpdateNewsTypePayload,
      options?: RequestOptions
    ) => {
      return HttpClient.put(
        `${apiUrl}/api/app/news-type/${newsTypeId}`,
        input,
        options
      );
    },
  };

  public delete = {
    removeNewsType: (newsTypeId: string, options?: RequestOptions) => {
      return HttpClient.delete(
        `${apiUrl}/api/app/news-type/${newsTypeId}`,
        options
      );
    },
  };
}

export const NewsTypeService = new NewsTypeController();
