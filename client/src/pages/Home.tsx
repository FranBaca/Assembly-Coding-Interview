import React, { useState } from 'react';
import PhotoGrid from '../components/PhotoGrid';
import SearchInput from '../components/ui/SearchInput';
import { usePexelsPhotos } from '../hooks/usePexelsPhotos';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { photos, loading, error } = usePexelsPhotos(searchQuery);

  return (
    <div className="min-h-screen w-full">
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <SearchInput 
            onSearch={setSearchQuery}
            placeholder="Search for photos..."
            isLoading={loading}
          />
        </div>
        
        <PhotoGrid 
          searchQuery={searchQuery} 
          photos={photos}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
};

export default Home; 