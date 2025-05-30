import React from 'react';
import Skeleton from './Skeleton';

const PhotoDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Back button skeleton */}
          <Skeleton variant="text" width="100px" height="24px" />

          {/* Main content */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Image skeleton */}
            <Skeleton height="600px" />

            {/* Content skeleton */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-4">
                    <Skeleton variant="text" height="32px" />
                    <Skeleton variant="text" width="200px" height="24px" />
                  </div>
                  <div className="space-y-4">
                    <Skeleton variant="text" height="24px" />
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton variant="text" height="20px" />
                      <Skeleton variant="text" height="20px" />
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Skeleton variant="text" height="24px" />
                    <Skeleton variant="text" height="48px" />
                    <Skeleton variant="text" height="48px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailSkeleton; 