import React from 'react';
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
  
  // Check if description is long (more than 120 characters)
  const isLongDescription = item.description && item.description.length > 120;

  return (
    <div 
      className={`menu-item ${isLongDescription ? 'menu-item-detailed' : ''} ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {isLongDescription ? (
        // Detailed card layout for long descriptions
        <div className="menu-item-detailed-layout">
          <div className="menu-item-image-detailed">
            <img 
              src={item.image || defaultImage} 
              alt={item.name}
              loading="lazy"
            />
          </div>
          
          <div className="menu-item-content-detailed">
            <div className="item-header-detailed">
              <h3 className="item-name-detailed">{item.name}</h3>
              <div className="item-price-detailed">
                <span className="current-price-detailed">{item.price}</span>
                {item.originalPrice && (
                  <span className="original-price-detailed">{item.originalPrice}</span>
                )}
              </div>
            </div>
            
            <div className="item-description-detailed">
              {item.description}
            </div>
          </div>
        </div>
      ) : (
        // Compact horizontal layout for short descriptions
        <div className="menu-item-compact-layout">
          <div className="menu-item-image">
            <img 
              src={item.image || defaultImage} 
              alt={item.name}
              loading="lazy"
            />
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
      )}
    </div>
  );
};

export default MenuItem;