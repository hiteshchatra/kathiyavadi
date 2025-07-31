import React, { useEffect, useRef, useState } from 'react';
import MenuItem from './MenuItem';
import '../styles/Category.css';

interface CategoryItem {
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
}

interface CategoryProps {
  category: {
    id: string;
    name: string;
    icon?: string;
    image?: string;
    description?: string;
    items: CategoryItem[];
  };
  animationDelay: number;
}

const Category: React.FC<CategoryProps> = ({ category, animationDelay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id={category.id}
      className={`category-section ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="category-header">
        <div className="category-title-wrapper">
          <span className="category-icon">{category.icon}</span>
          <h2 className="category-title">{category.name}</h2>
          <span className="category-count">{category.items.length}</span>
        </div>
      </div>
      
      <div className="menu-items-list">
        {category.items.map((item, index) => (
          <MenuItem 
            key={item.id} 
            item={item} 
            animationDelay={(animationDelay + (index * 0.05))}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
};

export default Category;