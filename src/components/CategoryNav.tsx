import React from 'react';
import '../styles/CategoryNav.css';

interface CategoryNavProps {
  categories: Array<{
    id: string;
    name: string;
    icon?: string;
    items: any[];
  }>;
  activeCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ categories, activeCategory, onCategoryClick }) => {
  return (
    <div className="category-nav">
      <div className="category-nav-list">
        {categories.filter(cat => cat.items.length > 0).map((category) => (
          <button
            key={category.id}
            className={`category-nav-item ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryClick(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;