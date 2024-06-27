import { ThemeConfig, theme as antdTheme } from 'antd';

const { defaultConfig } = antdTheme;

export const antdThemeConfig: ThemeConfig = {
  ...defaultConfig,
  token: {
    ...defaultConfig.token,
    colorPrimary: 'orange',
  },
  components: {
    Layout: {
      siderBg: '#075B7E',
    },
    Menu: {
      itemHeight: 40,
      // itemColor: "gray"
    },
    Segmented: {
      itemSelectedBg: '#0582a6',
      itemSelectedColor: 'white',
      itemHoverBg: '#d0e9ef',
      itemActiveBg: '#0582a6',
      itemColor: '#166987',
      itemHoverColor: '#166987',
    },
    Table: {
      headerBg: '#006d9c',
      headerColor: '#fff',
      headerBorderRadius: 4,
    },
  },
};
