import { getEnvVars } from '@/enviroment';
import HttpClient from './HttpClient';
import { RequestOptions } from './types';

const { apiUrl } = getEnvVars();

export interface CaptchaResponse {
  captchaId: string;
  captchBase64Data: string;
  expirationTime: string;
}

class PublicCmsController {
  public Get = {
    getCompany: (option?: RequestOptions) => {
      return HttpClient.get(
        `${apiUrl}/api/app/public-cms/company/0101640729`,
        option
      );
    },
    getMenuList: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/public-cms/menu`, options);
    },
    getBannerList: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/public-cms/banner`, options);
    },
    getNewsList: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/public-cms/content`, options);
    },
    getNewsById: (contentId: string, options?: RequestOptions) => {
      return HttpClient.get(
        `${apiUrl}/api/app/public-cms/content-detail/${contentId}`,
        options
      );
    },
    getNewsTypeList: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/public-cms/news-types`, options);
    },
    getCaptcha: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/public-cms/captcha`, options);
    },
    getServicePages: (options?: RequestOptions) => {
      return HttpClient.get(
        `${apiUrl}/api/app/public-cms/service-pages`,
        options
      );
    },
    getIntroducePage: (options?: RequestOptions) => {
      return HttpClient.get(
        `${apiUrl}/api/app/public-cms/introduce-page`,
        options
      );
    },
    getPageDetailBySlug: (slug: string, options?: RequestOptions) => {
      // prettier-ignore
      return HttpClient.get(`${apiUrl}/api/app/public-cms/page-by-slug?slug=${slug.replace('/trang','')}`, options);
    },
    getNewsDetailBySlug: (slug: string, options?: RequestOptions) => {
      // prettier-ignore
      return HttpClient.get(`${apiUrl}/api/app/public-cms/content-by-slug?slug=${slug.replace('/tin-tuc','')}`, options);
    },
    getAllDepartments: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/public-cms/departments`, options);
    }
  };
}

export const PublicCmsService = new PublicCmsController();
