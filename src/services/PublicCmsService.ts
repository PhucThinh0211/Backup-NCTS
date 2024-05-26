import { getEnvVars } from '@/enviroment';
import HttpClient from './HttpClient';
import { RequestOptions } from './types';

const { apiUrl } = getEnvVars();

export interface CaptchaResponse {
  captchaId: string;
  captchBase64Data: string;
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
      return HttpClient.get(`${apiUrl}/api/app/news-type`, options);
    },
    getCaptcha: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/public-cms/captcha`, options);
    },
    getServicePages: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/public-cms/service-pages`, options);
    },
    getIntroducePage: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/public-cms/introduce-page`, options);
    },
  };
}

export const PublicCmsService = new PublicCmsController();
