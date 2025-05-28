import { useState, useEffect } from 'react';
import { fetchPhotoById } from '../api/pexels';
import type { Photo } from '../types/pexels';

export const usePhotoDetail = (id: number) => {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        const data = await fetchPhotoById(id);
        setPhoto(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load photo details'));
        setLoading(false);
      }
    };

    loadPhoto();
  }, [id]);

  return { photo, loading, error };
}; 