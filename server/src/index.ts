import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initTRPC } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { z } from 'zod';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL // Your Vercel client URL
    : 'http://localhost:5173', // Vite's default dev server port
  credentials: true,
}));

const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;

const pexelsPhotoSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  photographer: z.string(),
  photographer_url: z.string(),
  photographer_id: z.number(),
  avg_color: z.string(),
  src: z.object({
    original: z.string(),
    large2x: z.string(),
    large: z.string(),
    medium: z.string(),
    small: z.string(),
    portrait: z.string(),
    landscape: z.string(),
    tiny: z.string(),
  }),
  liked: z.boolean(),
  alt: z.string(),
  created_at: z.string().optional(),
});

const pexelsResponseSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  photos: z.array(pexelsPhotoSchema),
  total_results: z.number(),
  next_page: z.string().optional(),
});

const appRouter = router({
  searchPexels: publicProcedure
    .input(z.object({
      query: z.string(),
      page: z.number().optional(),
      per_page: z.number().optional(),
    }))
    .query(async ({ input }) => {
      const { query, page = 1, per_page = 10 } = input;
      
      const response = await axios.get('https://api.pexels.com/v1/search', {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
        params: {
          query,
          page,
          per_page,
        },
      });

      return pexelsResponseSchema.parse(response.data);
    }),

  getPhotoById: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .query(async ({ input }) => {
      const { id } = input;
      
      const response = await axios.get(`https://api.pexels.com/v1/photos/${id}`, {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      });

      return pexelsPhotoSchema.parse(response.data);
    }),
});

export type AppRouter = typeof appRouter;

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 