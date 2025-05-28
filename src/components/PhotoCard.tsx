import React from 'react';
import { Link } from 'react-router-dom';
import type { Photo } from '../types/pexels';

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <Link to={`/photo/${photo.id}`}>
        <img src={photo.src.medium} alt={photo.alt} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <p className="text-sm text-gray-600">Photo by {photo.photographer}</p>
      </div>
    </div>
  );
};

export default PhotoCard; 