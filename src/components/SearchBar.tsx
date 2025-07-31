import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import '../styles/SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search menu items..." }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (searchQuery: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          onSearch(searchQuery);
        }, 300);
      };
    })(),
    [onSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`search-bar ${isFocused ? 'focused' : ''} ${query ? 'has-value' : ''}`}>
      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {query && (
          <button
            className="search-clear"
            onClick={handleClear}
            type="button"
          >
            <X className="clear-icon" />
          </button>
        )}
      </div>
      {query && (
        <div className="search-indicator">
          <span className="search-text">Searching for "{query}"</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;