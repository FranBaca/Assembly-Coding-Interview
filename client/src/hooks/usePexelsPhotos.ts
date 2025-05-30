import { trpc } from '../utils/trpc';

const MIN_SEARCH_LENGTH = 2;
const DEFAULT_QUERY = 'nature';

export function usePexelsPhotos(searchQuery: string, page: number, perPage: number = 20) {
  const effectiveQuery = searchQuery.length >= MIN_SEARCH_LENGTH 
    ? searchQuery 
    : DEFAULT_QUERY;

  const { data, isLoading, error } = trpc.searchPexels.useQuery(
    {
      query: effectiveQuery,
      page,
      per_page: perPage
    },
    {
      // Cache results for 5 minutes
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  return {
    photos: data?.photos ?? [],
    totalResults: data?.total_results ?? 0,
    page: data?.page ?? page,
    perPage: data?.per_page ?? perPage,
    loading: isLoading,
    error: error ? new Error(error.message) : null
  };
} 