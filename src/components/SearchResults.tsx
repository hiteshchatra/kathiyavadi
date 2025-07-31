import React from 'react';
import MenuItem from './MenuItem';
import { Search, ChefHat } from 'lucide-react';
import '../styles/SearchResults.css';

interface SearchItem {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image?: string;
  description?: string;
  isVeg: boolean;
  isPopular?: boolean;
  rating?: number;
  prepTime?: string;
  categoryName: string;
  categoryIcon: string;
}

interface SearchResultsProps {
  query: string;
  results: SearchItem[];
  isSearching: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results, isSearching }) => {
  if (!query) {
    return null;
  }

  if (isSearching) {
    return (
      <div className="search-results">
        <div className="search-results-header">
          <div className="search-loading">
            <div className="loading-spinner"></div>
            <span>Searching...</span>
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="search-results">
        <div className="search-results-header">
          <div className="search-no-results">
            <Search className="no-results-icon" />
            <h3>No items found</h3>
            <p>No menu items match "{query}". Try a different search term.</p>
          </div>
        </div>
      </div>
    );
  }

  // Group results by category
  const groupedResults = results.reduce((acc, item) => {
    if (!acc[item.categoryName]) {
      acc[item.categoryName] = {
        categoryName: item.categoryName,
        categoryIcon: item.categoryIcon,
        items: []
      };
    }
    acc[item.categoryName].items.push(item);
    return acc;
  }, {} as Record<string, { categoryName: string; categoryIcon: string; items: SearchItem[] }>);

  return (
    <div className="search-results">
      <div className="search-results-header">
        <div className="search-results-info">
          <ChefHat className="results-icon" />
          <div className="results-text">
            <h3>Search Results</h3>
            <p>Found {results.length} item{results.length !== 1 ? 's' : ''} for "{query}"</p>
          </div>
        </div>
      </div>

      <div className="search-results-content">
        {Object.values(groupedResults).map((category) => (
          <div key={category.categoryName} className="search-category">
            <div className="search-category-header">
              <span className="search-category-icon">{category.categoryIcon}</span>
              <h4 className="search-category-title">{category.categoryName}</h4>
              <span className="search-category-count">{category.items.length}</span>
            </div>
            
            <div className="search-category-items">
              {category.items.map((item, index) => (
                <MenuItem 
                  key={item.id} 
                  item={item} 
                  animationDelay={index * 0.05}
                  isVisible={true}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;