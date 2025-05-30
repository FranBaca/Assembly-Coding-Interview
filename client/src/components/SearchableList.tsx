import React from 'react';
import { useSearch } from '../hooks/useSearch';
import SearchInput from './ui/SearchInput';

interface SearchableListProps<T> {
  items: T[];
  searchKeys: (keyof T)[];
  renderItem: (item: T) => React.ReactNode;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export function SearchableList<T>({
  items,
  searchKeys,
  renderItem,
  placeholder = 'Search...',
  className = '',
  debounceMs = 300,
}: SearchableListProps<T>) {
  const { searchQuery, setSearchQuery, filteredItems, isSearching } = useSearch({
    items,
    searchKeys,
    debounceMs,
  });

  return (
    <div className={className}>
      {/* Search Input */}
      <div className="mb-4">
        <SearchInput
          onQueryChange={setSearchQuery}
          placeholder={placeholder}
          isLoading={isSearching}
          initialValue={searchQuery}
          showButton={false}
        />
      </div>

      {isSearching && (
        <div className="text-sm text-neutral-500 mb-4">Searching...</div>
      )}

      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center text-neutral-500 py-8">
            No items found matching your search.
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <div key={index}>{renderItem(item)}</div>
          ))
        )}
      </div>
    </div>
  );
} 