import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import dayjs from 'dayjs';
import i18next from 'i18next';

import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';

import { antdThemeConfig } from './antdThemeConfig';
import { useAppSelector } from '@/store/hooks';
import { getLanguage } from '@/store/persistState';
import { useEffect } from 'react';

interface ThemeProps {
  children: React.ReactNode;
}

export const ThemeCustomization = ({ children }: ThemeProps) => {
  const lang = useAppSelector(getLanguage());

  useEffect(() => {
    i18next.changeLanguage(lang);
    dayjs.locale(lang);
  }, [lang]);

  const getLocale = () => {
    if (lang === 'vi') {
      return viVN;
    }
    return enUS;
  };

  return (
    <ConfigProvider theme={antdThemeConfig} locale={getLocale()}>
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
};
