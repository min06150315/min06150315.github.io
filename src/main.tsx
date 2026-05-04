import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './hooks/useTheme.tsx';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from './lib/queryClient.ts';
import './styles/global.css';
import App from './App.tsx';
// import { FloatingScrollButton } from './components/ui/button';
import { HelmetProvider } from 'react-helmet-async';
import ChatBot from '@/features/chatbot/ChatBot.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </HelmetProvider>
      <ChatBot />
      {/* <FloatingScrollButton /> */}
    </QueryClientProvider>
  </StrictMode>,
);
