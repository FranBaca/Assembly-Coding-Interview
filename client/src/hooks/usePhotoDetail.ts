import { trpc } from '../utils/trpc';
import type { Photo } from '../types/pexels';

export const usePhotoDetail = (id: number) => {
  const { data: photo, isLoading, error } = trpc.getPhotoById.useQuery({ id });

  return {
    photo: photo as Photo | null,
    loading: isLoading,
    error: error ? new Error(error.message) : null
  };
}; 