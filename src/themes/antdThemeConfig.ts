import { ThemeConfig, theme as antdTheme } from "antd";

const { defaultConfig } = antdTheme;

export const antdThemeConfig: ThemeConfig = {
  ...defaultConfig,
  token: {
    ...defaultConfig.token,
    colorPrimary: "orange",
  },
  components: {
    Layout: {
      siderBg: "#075B7E",
    },
  },
};
