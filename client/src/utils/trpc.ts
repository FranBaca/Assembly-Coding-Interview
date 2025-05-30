import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../server/src/index';

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // In development, always use the server URL
  if (import.meta.env.DEV) {
    return 'http://localhost:3001';
  }
  // In production, use the current origin
  return window.location.origin;
};

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/trpc`,
      fetch(url, options) {
        console.log('Making request to:', url);
        return fetch(url, {
          ...options,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(async (response) => {
          if (!response.ok) {
            const text = await response.text();
            console.error('Response error:', text);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response;
        });
      },
    }),
  ],
}); 