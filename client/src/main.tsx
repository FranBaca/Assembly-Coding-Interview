import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './utils/trpc';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative path
  if (process.env.VITE_API_URL) return process.env.VITE_API_URL; // SSR should use vercel url
  return 'http://localhost:3001'; // dev SSR should use localhost
};

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/trpc`,
    }),
  ],
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>
);
