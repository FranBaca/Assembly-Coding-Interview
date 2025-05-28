import React from 'react';
import { usePexelsPhotos } from '../hooks/usePexelsPhotos';
import PhotoCard from './PhotoCard';

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
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default PhotoGrid; 