import { trpc } from '../utils/trpc';
import type { Photo } from '../types/pexels';

const MIN_SEARCH_LENGTH = 2;
const DEFAULT_QUERY = 'nature';

export function usePexelsPhotos(searchQuery: string) {
  // Only search if query is long enough, otherwise use default
  const effectiveQuery = searchQuery.length >= MIN_SEARCH_LENGTH 
    ? searchQuery 
    : DEFAULT_QUERY;

  const { data, isLoading, error } = trpc.searchPexels.useQuery(
    {
      query: effectiveQuery,
      page: 1,
      per_page: 20
    },
    {
      // Cache results for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Don't refetch on window focus
      refetchOnWindowFocus: false,
    }
  );

  return {
    photos: data?.photos ?? [],
    loading: isLoading,
    error: error ? new Error(error.message) : null
  };
} 