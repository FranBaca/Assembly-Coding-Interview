import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Photo } from '../types/pexels';
import { cardVariants, imageVariants, overlayVariants, contentVariants } from '../animations/cardVariants';

interface PhotoCardProps {
  photo: Photo;
  index?: number;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, index = 0 }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      className="card group relative overflow-hidden h-full flex flex-col"
    >
      <Link to={`/photo/${photo.id}`} className="block flex-grow">
        <div className="relative aspect-[4/3]">
          {/* Blur placeholder */}
          <div 
            className={`absolute inset-0 bg-neutral-200 transition-opacity duration-300 ${
              isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
          
          {/* Main image */}
          <motion.img 
            src={photo.src.medium} 
            alt={photo.alt} 
            variants={imageVariants}
            className={`w-full h-full object-cover ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />

          {/* Default author info */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-white/90 text-sm">
              Photo by {photo.photographer}
            </p>
          </motion.div>

          {/* Hover overlay */}
          <motion.div 
            variants={overlayVariants}
            className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center p-6 text-center"
          >
            <motion.div variants={contentVariants}>
              <h3 className="text-white font-semibold text-xl mb-3">
                {photo.alt || 'Untitled Photo'}
              </h3>
              <div className="flex items-center justify-center text-white/90">
                <span className="text-sm">Photo by</span>
                <span className="text-sm font-medium ml-1">{photo.photographer}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PhotoCard; 