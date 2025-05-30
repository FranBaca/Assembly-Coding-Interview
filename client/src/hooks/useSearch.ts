import { useState, useEffect, useMemo } from 'react';

interface UseSearchOptions<T> {
  items: T[];
  searchKeys: (keyof T)[];
  debounceMs?: number;
}

export function useSearch<T>({ items, searchKeys, debounceMs = 300 }: UseSearchOptions<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs]);

  // Filter items based on the debounced query
  const filteredItems = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return items;
    }

    const query = debouncedQuery.toLowerCase();
    return items.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        return value && String(value).toLowerCase().includes(query);
      })
    );
  }, [items, searchKeys, debouncedQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
    isSearching: searchQuery !== debouncedQuery,
  };
} 