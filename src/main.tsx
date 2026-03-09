import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './hooks/useTheme.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from './lib/queryClient.ts';
import './styles/global.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      {/* 테스트용 리액트 쿼리 개발 도구 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
