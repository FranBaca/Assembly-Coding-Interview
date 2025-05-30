import { useState, useEffect, useReducer, useCallback } from 'react';
import type { Photo } from '../types/pexels';
import { usePexelsPhotos } from './usePexelsPhotos';

const PHOTOS_PER_PAGE = 40;

type PhotosAction = 
  | { type: 'RESET' }
  | { type: 'APPEND_PHOTOS'; payload: Photo[] }
  | { type: 'SET_HAS_MORE'; payload: boolean };

interface PhotosState {
  photos: Photo[];
  hasMore: boolean;
}

const photosReducer = (state: PhotosState, action: PhotosAction): PhotosState => {
  switch (action.type) {
    case 'RESET':
      return { photos: [], hasMore: true };
    case 'APPEND_PHOTOS':
      return {
        ...state,
        photos: state.photos.length === 0 ? action.payload : [...state.photos, ...action.payload]
      };
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload };
    default:
      return state;
  }
};

export function usePhotoGallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [state, dispatch] = useReducer(photosReducer, { photos: [], hasMore: true });

  const { photos: newPhotos, loading, error } = usePexelsPhotos(searchQuery, page, PHOTOS_PER_PAGE);

  useEffect(() => {
    dispatch({ type: 'RESET' });
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (newPhotos.length > 0) {
      dispatch({ type: 'APPEND_PHOTOS', payload: newPhotos });
    }
    dispatch({ type: 'SET_HAS_MORE', payload: newPhotos.length === PHOTOS_PER_PAGE });
  }, [newPhotos]);

  const loadMore = useCallback(() => {
    if (!loading && state.hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, state.hasMore]);

  return {
    searchQuery,
    setSearchQuery,
    photos: state.photos,
    hasMore: state.hasMore,
    loading,
    error,
    loadMore
  };
} 