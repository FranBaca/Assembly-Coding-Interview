import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearch } from '../hooks/useSearch';

interface SearchableListProps<T> {
  items: T[];
  searchKeys: (keyof T)[];
  renderItem: (item: T) => React.ReactNode;
  placeholder?: string;
  className?: string;
}

export function SearchableList<T>({
  items,
  searchKeys,
  renderItem,
  placeholder = 'Search...',
  className = '',
}: SearchableListProps<T>) {
  const { searchQuery, setSearchQuery, filteredItems, isSearching } = useSearch({
    items,
    searchKeys,
  });

  return (
    <div className={className}>
      {/* Search Input */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          type="text"
          className="input w-full pl-10"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="text-sm text-neutral-500 mb-4">Searching...</div>
      )}

      {/* Results */}
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