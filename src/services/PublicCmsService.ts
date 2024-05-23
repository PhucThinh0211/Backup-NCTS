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
    getCaptcha: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/public-cms/captcha`, options);
    }
  };
}

export const PublicCmsService = new PublicCmsController();
