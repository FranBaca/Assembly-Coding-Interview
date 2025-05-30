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
  onLoadMore,
}: PhotoGalleryProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <SearchInput
          onSearch={onSearch}
          placeholder="Search for photos..."
          isLoading={loading}
          initialValue={searchQuery}
        />
      </div>

      <PhotoGrid
        searchQuery={searchQuery}
        photos={photos}
        loading={loading}
        error={error}
      />

      {!loading && hasMore && (
        <InfiniteScrollTrigger
          onVisible={onLoadMore}
          loading={loading}
          hasMore={hasMore}
        />
      )}
    </div>
  );
} 