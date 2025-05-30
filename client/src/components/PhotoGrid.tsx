import React from 'react';
import { motion } from 'framer-motion';
import PhotoCard from './PhotoCard';
import type { Photo } from '../types/pexels';

interface PhotoGridProps {
  searchQuery: string;
  photos: Photo[];
  loading: boolean;
  error: Error | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, loading, error }) => {
  if (loading) {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-neutral-200 rounded-lg aspect-[3/4]"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-accent-600">
        Error: {error.message}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-neutral-500">
        No photos found. Try a different search term.
      </div>
    );
  }

  return (
    <motion.div 
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {photos.map((photo, index) => (
          <div key={photo.id} className="break-inside-avoid">
            <PhotoCard photo={photo} index={index} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PhotoGrid; 