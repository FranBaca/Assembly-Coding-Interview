import React from 'react';
import PhotoGrid from '../components/PhotoGrid';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col overflow-x-hidden">
      <header className="bg-white shadow w-full">
        <div className="max-w-7xl mx-auto w-full py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Pexels Photo Gallery</h1>
        </div>
      </header>
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PhotoGrid />
        </div>
      </main>
    </div>
  );
};

export default Home; 