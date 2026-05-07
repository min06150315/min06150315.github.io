import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider } from '../src/hooks/useTheme';
import queryClient from '../src/lib/queryClient';

import '../src/styles/global.css';
import '../src/styles/theme.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeProvider>
            <MemoryRouter>
              <Story />
            </MemoryRouter>
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    ),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
