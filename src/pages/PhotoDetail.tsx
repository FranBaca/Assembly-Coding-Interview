import React from 'react';
import { useParams } from 'react-router-dom';
import { usePhotoDetail } from '../hooks/usePhotoDetail';

const PhotoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { photo, loading, error } = usePhotoDetail(Number(id));

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  if (!photo) {
    return <div className="text-center text-gray-500">Photo not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Photo Details</h1>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded shadow overflow-hidden">
          <img src={photo.src.original} alt={photo.alt} className="w-full h-96 object-cover" />
          <div className="p-4">
            <p className="text-sm text-gray-600">Photo by {photo.photographer}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhotoDetail; 