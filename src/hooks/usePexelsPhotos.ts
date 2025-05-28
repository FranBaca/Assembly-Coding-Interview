import { useState, useEffect } from 'react';
import { fetchPexelsPhotos } from '../api/pexels';
import type { Photo } from '../types/pexels';

export const usePexelsPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await fetchPexelsPhotos();
        setPhotos(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  return { photos, loading, error };
}; 