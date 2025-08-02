import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Eye } from 'lucide-react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Check if description is long (more than 100 characters)
  const isLongDescription = item.description && item.description.length > 100;
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          <div className="description-section">
            {isLongDescription ? (
              <div className="long-description-preview">
                <p className="item-description preview">
                  {item.description.substring(0, 80)}...
                </p>
                <button className="view-more-btn" onClick={openModal}>
                  <Eye size={14} />
                </button>
              </div>
            ) : (
              <p className="item-description">{item.description}</p>
            )}
          </div>
        )}
      </div>
      
      {/* Modal for long descriptions - rendered at document body level */}
      {isModalOpen && createPortal(
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-item-info">
                <img 
                  src={item.image || defaultImage} 
                  alt={item.name}
                  className="modal-image"
                />
                <div className="modal-title-section">
                  <h3 className="modal-item-name">{item.name}</h3>
                  <div className="modal-item-price">
                    <span className="modal-current-price">{item.price}</span>
                    {item.originalPrice && (
                      <span className="modal-original-price">{item.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
              <button className="modal-close-btn" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <h4 className="modal-description-title">Description</h4>
              <p className="modal-description">{item.description}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default MenuItem;