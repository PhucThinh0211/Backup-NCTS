import HttpClient from './HttpClient';
import { CreateUpdateSeoPayload, SeoResponse } from './SEOService';
import { RequestOptions } from './types';
import { PagingResponse } from '@/common/define';
import { getEnvVars } from '@/enviroment';

const { apiUrl } = getEnvVars();

export enum PageContentType {
  DYNAMIC = 'dynamic',
  AVAILABLE = 'available',
  VIDEO = 'video',
  PHOTO = 'photo',
  DOCUMENT = 'document',
  NEWS = 'news',
  CONTACT = 'contact',
  LOGIN = 'login',
  REGISTER = 'register',
  INVESTOR_RELATIONS = 'investor_relations',
  INVESTOR_NEWS = 'investor-news',
  SHAREHOLDER_MEETINGS = 'shareholder-meetings',
  FINANCIAL_REPORTS = 'financial-reports',
  ANNUAL_REPORTS = 'annual-reports',
  CORPORATE_GOVERNANCE = 'corporate-governance',
}

export enum PageContentShowPlace {
  INTRODUCTION = 'introduction',
  SERVICES = 'services',
}

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
  pageType: PageContentType | null;
  codeType: string | null;
  photoUrl: string | null;
  title: string | null;
  description: string | null;
  slug: string | null;
  language: string | null;
  script: string | null;
  style: string | null;
  content: string | null;
  isHomePage: boolean;
  tags: string | null;
  seoId: string | null;
  seo?: SeoResponse;
  showInTheIntroduceSection: boolean;
  showInTheServicesSection: boolean;
}
export interface CreateUpdatePageContentPayload {
  pageType: PageContentType;
  title: string;
  description: string;
  slug: string;
  codeType?: string | null;
  script?: string | null;
  style?: string | null;
  isHomePage?: boolean;
  content?: string | null;
  tags?: string | null;
  published?: boolean;
  seoId?: string | null;
  seo?: CreateUpdateSeoPayload;
  showInTheIntroduceSection?: boolean;
  showInTheServicesSection?: boolean;
}
export interface CreateUpdatePageContentTranslationPayload {
  language: string;
  title: string;
  content: string | null;
  tags: string | null;
}

class PageContentController {
  public Get = {
    getAllPageContents: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/page`, options);
    },
    getPageContentById: (
      pagePageContentId: string,
      options?: RequestOptions
    ) => {
      return HttpClient.get(
        `${apiUrl}/api/app/page/${pagePageContentId}`,
        options
      );
    },
  };

  public Post = {
    createPageContent: (
      input: CreateUpdatePageContentPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(`${apiUrl}/api/app/page`, input, options);
    },
    createPageContentTranslations: (
      pageContentId: string,
      input: CreateUpdatePageContentTranslationPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(
        `${apiUrl}/api/app/page/${pageContentId}/translations`,
        input,
        options
      );
    },
    publishPage: (id: string, options?: RequestOptions) => {
      return HttpClient.post(`${apiUrl}/api/app/page/${id}/publish`, options);
    },
    unpublishPage: (id: string, options?: RequestOptions) => {
      return HttpClient.post(`${apiUrl}/api/app/page/${id}/unpublish`, options);
    },
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
    removePageContent: (
      pagePageContentId: string,
      options?: RequestOptions
    ) => {
      return HttpClient.delete(
        `${apiUrl}/api/app/page/${pagePageContentId}`,
        options
      );
    },
  };
}

export const PageContentService = new PageContentController();
