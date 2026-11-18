import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(packageRoot, '../..');
const fontAwesomeKitCss = path.join(
  repoRoot,
  'node_modules/@awesome.me/kit-cb852485b6/icons/css/all.min.css',
);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  async viteFinal(viteConfig) {
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      '@fms/ui': path.join(packageRoot, 'src/index.ts'),
      '@fms-tokens': path.join(repoRoot, 'tokens'),
      // Kit package.json exports `./icons/css/*.css` are not resolved by Storybook's Vite.
      '@awesome.me/kit-cb852485b6/icons/css/all.min.css': fontAwesomeKitCss,
    };
    viteConfig.server = {
      ...viteConfig.server,
      fs: {
        ...viteConfig.server?.fs,
        allow: [...new Set([...(viteConfig.server?.fs?.allow ?? []), repoRoot, packageRoot])],
      },
    };
    return viteConfig;
  },
};

export default config;
