import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePhotoDetail } from '../hooks/usePhotoDetail';
import { ArrowLeftIcon, ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import PhotoDetailSkeleton from '../components/ui/PhotoDetailSkeleton';

const PhotoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { photo, loading, error } = usePhotoDetail(Number(id));
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <PhotoDetailSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-3">Error Loading Photo</h2>
          <p className="text-gray-600 mb-3">{error.message}</p>
          <Link
            to="/"
            className="inline-flex items-center px-3.5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1.5" />
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
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Photo Not Found</h2>
          <Link
            to="/"
            className="inline-flex items-center px-3.5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1.5" />
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
      <div className="max-w-6xl mx-auto px-3 sm:px-5 py-3">
        <div className="mb-3">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1.5" />
            Back to Gallery
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg">
          <div className="relative">
            <div className={`absolute inset-0 bg-neutral-200 transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-0' : 'opacity-100'
            }`} />
            <img
              src={photo.src.large2x}
              alt={photo.alt}
              className={`w-full h-[350px] max-h-[350px] object-contain transition-opacity duration-500 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center p-4">
                  <p className="text-gray-500 mb-2">Failed to load image</p>
                  <button
                    onClick={() => {
                      setImageError(false);
                      setIsImageLoaded(false);
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 sm:p-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h1 className="text-lg font-bold text-gray-900 mb-2 break-words">
                    {photo.alt || 'Untitled Photo'}
                  </h1>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm text-gray-600">Photo by</span>
                    <a
                      href={photo.photographer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                    >
                      {photo.photographer}
                      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 ml-1" />
                    </a>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h2 className="text-sm font-semibold text-gray-900 mb-2">Photo Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Dimensions</p>
                      <p className="text-sm text-gray-900 font-medium">{photo.width} × {photo.height}px</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Created</p>
                      <p className="text-sm text-gray-900 font-medium">
                        {photo.created_at ? formatDate(photo.created_at) : 'Unknown date'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Photo ID</p>
                      <p className="text-sm text-gray-900 font-medium">{photo.id}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h2 className="text-sm font-semibold text-gray-900 mb-2">Download Options</h2>
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
                        className="inline-flex items-center justify-center px-3.5 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-sm"
                      >
                        {size.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="space-y-2.5">
                    <a
                      href={photo.src.original}
                      download
                      className="w-full inline-flex items-center justify-center px-3.5 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:shadow-sm"
                    >
                      <ArrowDownTrayIcon className="h-4 w-4 mr-1.5" />
                      Download Original
                    </a>
                    <a
                      href={photo.photographer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center px-3.5 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-sm"
                    >
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1.5" />
                      View Photographer Profile
                    </a>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h2 className="text-sm font-semibold text-gray-900 mb-2">Photographer Info</h2>
                  <div className="space-y-1.5">
                    <p className="text-xs text-gray-500">Photographer ID</p>
                    <p className="text-sm text-gray-900 font-medium">{photo.photographer_id}</p>
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