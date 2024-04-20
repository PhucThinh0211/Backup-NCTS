import HttpClient from './HttpClient';
import { CreateUpdateSeoPayload, SeoResponse } from './SEOService';
import { RequestOptions } from './types';
import { PagingResponse } from '@/common/define';
import { getEnvVars } from '@/enviroment';

const { apiUrl } = getEnvVars();

export interface PageContentsPagingResponse extends PagingResponse {
  items: PageContentResponse[];
}

export interface PageContentResponse {
  id: string;
  creationTime: string;
  creatorId: string | null;
  lastModificationTime: string;
  lastModifierId: string | null;
  isDeleted: boolean;
  deleterId: string | null;
  deletionTime: string | null;
  published: boolean;
  pageType: string | null;
  codeType: string | null;
  title: string | null;
  slug: string | null;
  language: string | null;
  script: string | null;
  style: string | null;
  content: string | null;
  isHomePage: boolean;
  tags: string | null;
  seoId: string | null;
  seo?: SeoResponse;
}
export interface CreateUpdatePageContentPayload {
  pageType: string;
  title: string;
  slug: string;
  codeType?: string | null;
  script?: string | null;
  style?: string | null;
  isHomePage?: boolean;
  content?: string | null;
  tags?: string | null;
  published?: boolean;
  seoId?: string | null;
  seo?: CreateUpdateSeoPayload
}
export interface CreateUpdatePageContentTranslationPayload {
  language: string;
  title: string;
  description: string | null;
  body: string | null;
}

class PageContentController {
  public Get = {
    getAllPageContents: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/page`, options);
    },
    getPageContentById: (pagePageContentId: string, options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/page/${pagePageContentId}`, options);
    },
  };

  public Post = {
    createPageContent: (
      input: CreateUpdatePageContentPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(`${apiUrl}/api/app/page`, input, options);
    },
    // createPageContentTranslations: (
    //   pagePageContentId: string,
    //   input: CreateUpdatePageContentTranslationPayload,
    //   options?: RequestOptions
    // ) => {
    //   return HttpClient.post(
    //     `${apiUrl}/api/app/pagePageContent/${pagePageContentId}/translations`,
    //     input,
    //     options
    //   );
    // },
  };

  public Put = {
    updatePageContent: (
      pagePageContentId: string,
      input: CreateUpdatePageContentPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.put(
        `${apiUrl}/api/app/page/${pagePageContentId}`,
        input,
        options
      );
    },
  };

  public delete = {
    removePageContent: (pagePageContentId: string, options?: RequestOptions) => {
      return HttpClient.delete(
        `${apiUrl}/api/app/page/${pagePageContentId}`,
        options
      );
    },
  };
}

export const PageContentService = new PageContentController();
