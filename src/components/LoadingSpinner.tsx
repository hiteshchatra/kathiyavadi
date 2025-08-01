import React from 'react';
import '../styles/LoadingSpinner.css';

interface LoadingSpinnerProps {
  restaurantName: string;
  logo: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ restaurantName, logo }) => {
  return (
    <div className="loading-container">
      <div className="loading-background">
        <div className="loading-gradient"></div>
        <div className="loading-pattern"></div>
      </div>
      
      <div className="loading-content">
        <div className="loading-logo">
          <div className="logo-container">
            <img src={logo} alt={restaurantName} className="loading-icon" />
            <div className="logo-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
          </div>
        </div>
        
        <h2 className="loading-title">{restaurantName}</h2>
        <p className="loading-subtitle">Preparing your culinary journey...</p>
        
        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <div className="loading-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
        
        <div className="loading-message">
          <p>Crafting the perfect menu experience</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;