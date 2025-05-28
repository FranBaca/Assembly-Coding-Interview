import React from 'react';
import { usePexelsPhotos } from '../hooks/usePexelsPhotos';
import type { Photo } from '../types/pexels';

const PhotoGrid: React.FC = () => {
  const { photos, loading, error } = usePexelsPhotos();

  if (loading) {
    return <div className="text-center text-gray-500">Loading photos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo: Photo) => (
        <div key={photo.id} className="bg-white rounded shadow overflow-hidden">
          <img src={photo.src.medium} alt={photo.alt} className="w-full h-48 object-cover" />
          <div className="p-4">
            <p className="text-sm text-gray-600">Photo by {photo.photographer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid; 