import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../server/src/index';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative path
  if (process.env.VITE_API_URL) return process.env.VITE_API_URL; // SSR should use vercel url
  return 'http://localhost:3000'; // dev SSR should use localhost
};

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/trpc`,
    }),
  ],
}); 