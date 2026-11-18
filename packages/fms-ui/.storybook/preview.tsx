import type { Preview } from '@storybook/react';
import { FmsThemeProvider } from '../src/theme/FmsThemeProvider';
import '@fms-tokens/dist/css/foundation.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <FmsThemeProvider>
        <Story />
      </FmsThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Setup', 'Components'],
      },
    },
  },
};

export default preview;
