import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Validar variáveis de ambiente antes de tudo
import './config/environment';

import App from './App.tsx';
import { theme } from './theme/index.ts';
import { AzureAuthProvider } from './provider/auth.tsx'; 

const queryClient = new QueryClient();

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <AzureAuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AzureAuthProvider>
    </React.StrictMode>
  </ThemeProvider>
);
