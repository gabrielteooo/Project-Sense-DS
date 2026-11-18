import { App as AntApp, ConfigProvider } from 'antd';
import type { ThemeConfig } from 'antd';
import type { ReactNode } from 'react';
import '@awesome.me/kit-cb852485b6/icons/css/all.min.css';
import { createAntdTheme } from './antdTheme';

export type FmsThemeProviderProps = {
  children: ReactNode;
  /** Shallow-merged onto the FMS Ant Design theme (`token` and `components` keys). */
  theme?: ThemeConfig;
};

/**
 * Shared FMS theme boundary for Storybook and product screens.
 * Wrap the application (or story) once. Do not nest extra ConfigProviders to
 * restyle individual screens — extend an approved `Fms*` wrapper instead.
 */
export function FmsThemeProvider({ children, theme }: FmsThemeProviderProps) {
  return (
    <ConfigProvider theme={createAntdTheme(theme)}>
      <AntApp>{children}</AntApp>
    </ConfigProvider>
  );
}
