import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

import { antdThemeConfig } from './antdThemeConfig';

interface ThemeProps {
  children: React.ReactNode;
}

export const ThemeCustomization = ({ children }: ThemeProps) => {
  return (
    <ConfigProvider theme={antdThemeConfig}>
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
};
