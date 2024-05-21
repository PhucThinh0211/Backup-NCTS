import { getEnvVars } from '@/enviroment';
import HttpClient from './HttpClient';
import { RequestOptions } from './types';

const { apiUrl } = getEnvVars();

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
  };
}

export const PublicCmsService = new PublicCmsController();
