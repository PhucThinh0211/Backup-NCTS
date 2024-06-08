import { map } from 'rxjs';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getEnvVars } from '@/enviroment';
import HttpClient from './HttpClient';

const { apiUrl } = getEnvVars();

interface IGetConfigInput {
  token?: string;
  language?: string;
  tenant?: string;
}

export const getApplicationConfiguration = ({
  token,
  language,
  tenant,
}: IGetConfigInput) => {
  const headers: any = {};
  if (token) {
    headers['authorization'] = `Bearer ${token}`;
  }

  if (language) {
    headers['Accept-Language'] = language;
  }

  if (tenant) {
    headers.__tenant = tenant;
  }

  return HttpClient.get(`${apiUrl}/api/abp/application-configuration`, {
    headers,
  }).pipe(
    map((config) => {
      return config;
    })
  );
};
