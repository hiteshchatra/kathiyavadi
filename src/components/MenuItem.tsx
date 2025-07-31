import React from 'react';
import { Leaf } from 'lucide-react';
import '../styles/MenuItem.css';

interface MenuItemProps {
  item: {
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
  };
  animationDelay: number;
  isVisible: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, animationDelay, isVisible }) => {
  const defaultImage = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400";

  return (
    <div 
      className={`menu-item ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="menu-item-image">
        <img 
          src={item.image || defaultImage} 
          alt={item.name}
          loading="lazy"
        />
        
        {/* <div className="item-badges">
          {item.isVeg && (
            <div className="veg-badge">
              <Leaf className="veg-icon" fill="currentColor" />
            </div>
          )}
          
          {item.isPopular && (
            <div className="popular-badge">
              Popular
            </div>
          )}
        </div> */}
      </div>
      
      <div className="menu-item-content">
        <div className="item-header">
          <h3 className="item-name">{item.name}</h3>
          <div className="item-price">
            <span className="current-price">{item.price}</span>
            {item.originalPrice && (
              <span className="original-price">{item.originalPrice}</span>
            )}
          </div>
        </div>
        
        {item.description && (
          <p className="item-description">{item.description}</p>
        )}
      </div>
    </div>
  );
};

export default MenuItem;