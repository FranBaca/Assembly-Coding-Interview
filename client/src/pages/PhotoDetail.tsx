import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePhotoDetail } from '../hooks/usePhotoDetail';
import { ArrowLeftIcon, ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import PhotoDetailSkeleton from '../components/ui/PhotoDetailSkeleton';

const PhotoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { photo, loading, error } = usePhotoDetail(Number(id));
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (loading) {
    return <PhotoDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Error Loading Photo</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Photo Not Found</h2>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2">
        {/* Header */}
        <div className="mb-2">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Gallery
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image Section */}
          <div className="relative bg-gray-100">
            <div className={`absolute inset-0 bg-gray-200 transition-opacity duration-500 ${
              isImageLoaded ? 'opacity-0' : 'opacity-100'
            }`} />
            <img
              src={photo.src.large2x}
              alt={photo.alt}
              className={`w-full h-[400px] object-contain transition-opacity duration-500 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center p-6">
                  <p className="text-gray-500 text-lg mb-2">Failed to load image</p>
                  <button
                    onClick={() => {
                      setImageError(false);
                      setIsImageLoaded(false);
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-2">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              {/* Left Column - Photo Info */}
              <div className="lg:col-span-2 space-y-2">
                <div className="bg-gray-50 rounded-xl p-3">
                  <h1 className="text-xl font-bold text-gray-900 mb-1">
                    {photo.alt || 'Untitled Photo'}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Photo by</span>
                    <a
                      href={photo.photographer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                    >
                      {photo.photographer}
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>

                {/* Photo Details */}
                <div className="bg-gray-50 rounded-xl p-3">
                  <h2 className="text-base font-semibold text-gray-900 mb-1">Photo Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Dimensions</p>
                      <p className="text-gray-900 font-medium">{photo.width} × {photo.height}px</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="text-gray-900 font-medium">
                        {photo.created_at ? formatDate(photo.created_at) : 'Unknown date'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Photo ID</p>
                      <p className="text-gray-900 font-medium">{photo.id}</p>
                    </div>
                  </div>
                </div>

                {/* Download Options */}
                <div className="bg-gray-50 rounded-xl p-3">
                  <h2 className="text-base font-semibold text-gray-900 mb-1">Download Options</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Original', url: photo.src.original },
                      { label: 'Large 2x', url: photo.src.large2x },
                      { label: 'Large', url: photo.src.large },
                      { label: 'Medium', url: photo.src.medium }
                    ].map((size) => (
                      <a
                        key={size.label}
                        href={size.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
                      >
                        {size.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Actions */}
              <div className="space-y-2">
                <div className="bg-gray-50 rounded-xl p-3">
                  <h2 className="text-base font-semibold text-gray-900 mb-1">Quick Actions</h2>
                  <div className="space-y-3">
                    <a
                      href={photo.src.original}
                      download
                      className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:shadow-lg"
                    >
                      <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                      Download Original
                    </a>
                    <a
                      href={photo.photographer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
                    >
                      <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                      View Photographer Profile
                    </a>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <h2 className="text-base font-semibold text-gray-900 mb-1">Photographer Info</h2>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Photographer ID</p>
                    <p className="text-gray-900 font-medium">{photo.photographer_id}</p>
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

export default PhotoDetail; 