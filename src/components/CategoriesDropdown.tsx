import React, { useState, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';
import '../styles/CategoriesDropdown.css';

interface CategoriesDropdownProps {
  categories: Array<{
    id: string;
    name: string;
    icon?: string;
    image?: string;
    items: any[];
  }>;
  activeCategory: string;
  scrollToCategory: (categoryId: string) => void;
}

const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({ categories, activeCategory, scrollToCategory }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="categories-dropdown-wrapper" ref={dropdownRef}>
      <button className="categories-dropdown-btn" onClick={() => setOpen((v) => !v)}>
        <Menu size={20} style={{ marginRight: 8 }} />
        Categories
      </button>
      {open && (
        <div className="categories-dropdown-menu">
          <div className="categories-dropdown-list">
            {categories.filter(cat => cat.items.length > 0).map((category) => (
              <button
                key={category.id}
                className={`categories-dropdown-item${activeCategory === category.id ? ' active' : ''}`}
                onClick={() => {
                  scrollToCategory(category.id);
                  setOpen(false);
                }}
              >
                {category.icon === 'image' && category.image ? (
                  <img src={category.image} alt={category.name} className="categories-dropdown-icon" />
                ) : (
                  <span className="categories-dropdown-icon">{category.icon === 'image' ? '🍽️' : category.icon}</span>
                )}
                <span className="categories-dropdown-text">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesDropdown;
