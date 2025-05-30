import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { PhotoGallery } from '../components/PhotoGallery';

const Home = () => {
  const {
    searchQuery,
    setSearchQuery,
    photos,
    hasMore,
    loading,
    error,
    loadMore
  } = usePhotoGallery();

  return (
    <PhotoGallery
      searchQuery={searchQuery}
      onSearch={setSearchQuery}
      photos={photos}
      loading={loading}
      error={error}
      hasMore={hasMore}
      onLoadMore={loadMore}
    />
  );
};

export default Home; 