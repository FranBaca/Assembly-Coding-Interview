import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchInputProps {
  onSearch?: (query: string) => void;
  onQueryChange?: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  initialValue?: string;
  debounceMs?: number;
  showButton?: boolean;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

export default function SearchInput({ 
  onSearch,
  onQueryChange,
  placeholder = 'Search...',
  isLoading = false,
  initialValue = '',
  debounceMs = 300,
  showButton = true,
  className = '',
  inputClassName = '',
  buttonClassName = '',
}: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [debouncedQuery, setDebouncedQuery] = useState(initialValue);

  // Handle debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      onQueryChange?.(searchQuery);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs, onQueryChange]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const defaultInputClasses = "input w-full pl-10 py-2";
  const defaultButtonClasses = "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          className={`${defaultInputClasses} ${inputClassName}`}
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          aria-label="Search input"
        />
      </div>
      {showButton && (
        <button
          onClick={handleSearch}
          disabled={isLoading || !searchQuery.trim()}
          className={`${defaultButtonClasses} ${buttonClassName}`}
          aria-label="Search button"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      )}
    </div>
  );
} 