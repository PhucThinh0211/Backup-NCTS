import HttpClient from './HttpClient';
import { CreateUpdateSeoPayload } from './SEOService';
import { RequestOptions } from './types';
import { PagingResponse } from '@/common/define';
import { getEnvVars } from '@/enviroment';

const { apiUrl } = getEnvVars();

export interface ContentsPagingResponse extends PagingResponse {
  items: ContentResponse[];
}

export type ContentType =
  | 'NctsNews'
  | 'CustomerNews'
  | 'ActivitiesNews'
  | 'IndustrialNews'
  | 'RecruitmentNews';

export interface ContentResponse {
  id: string;
  creationTime: string;
  creatorId: string | null;
  lastModificationTime: string;
  lastModifierId: string | null;
  isDeleted: boolean;
  deleterId: string | null;
  deletionTime: string | null;
  published: boolean;
  publishDate: string | null;
  photoUrl: string | null;
  title: string | null;
  description: string | null;
  language: string | null;
  type: ContentType | null;
  body: string | null;
  sortSeq: number;
  url: string | null;
  seoId: string | null;
}
export interface CreateUpdateContentPayload {
  newsTypeId: string;
  type: string;
  title: string;
  description: string | null;
  photoUrl: string | null;
  body: string | null;
  sortSeq: number;
  published: boolean;
  publishDate: string | null;
  url: string;
  seoId: string | null;
  seo?: CreateUpdateSeoPayload;
}
export interface CreateUpdateContentTranslationPayload {
  language: string;
  title: string;
  description: string | null;
  body: string | null;
}

class ContentController {
  public Get = {
    getAllContents: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/content`, options);
    },
    getContentById: (contentId: string, options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/content/${contentId}`, options);
    },
  };

  public Post = {
    createContent: (
      input: CreateUpdateContentPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(`${apiUrl}/api/app/content`, input, options);
    },
    createContentTranslations: (
      contentId: string,
      input: CreateUpdateContentTranslationPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(
        `${apiUrl}/api/app/content/${contentId}/translations`,
        input,
        options
      );
    },
    publishContent: (id: string, options?: RequestOptions) => {
      return HttpClient.post(`${apiUrl}/api/app/content/${id}/publish`, options);
    },
    unpublishContent: (id: string, options?: RequestOptions) => {
      return HttpClient.post(`${apiUrl}/api/app/content/${id}/unpublish`, options);
    }
  };

  public Put = {
    updateContent: (
      contentId: string,
      input: CreateUpdateContentPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.put(
        `${apiUrl}/api/app/content/${contentId}`,
        input,
        options
      );
    },
  };

  public delete = {
    removeContent: (contentId: string, options?: RequestOptions) => {
      return HttpClient.delete(
        `${apiUrl}/api/app/content/${contentId}`,
        options
      );
    },
  };
}

export const ContentService = new ContentController();
