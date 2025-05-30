import PhotoGrid from './PhotoGrid';
import SearchInput from './ui/SearchInput';
import InfiniteScrollTrigger from './ui/InfiniteScrollTrigger';

interface PhotoGalleryProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  photos: any[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function PhotoGallery({
  searchQuery,
  onSearch,
  photos,
  loading,
  error,
  hasMore,
  onLoadMore
}: PhotoGalleryProps) {
  return (
    <div className="min-h-screen w-full">
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <SearchInput 
            onSearch={onSearch}
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
        {/* Infinite scroll trigger */}
        {hasMore && !error && (
          <InfiniteScrollTrigger onVisible={onLoadMore} loading={loading} />
        )}
      </main>
    </div>
  );
} 