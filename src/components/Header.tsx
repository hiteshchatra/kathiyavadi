import React, { useState, useEffect } from 'react';
import { ChefHat, Menu, X, MapPin, Phone, Star } from 'lucide-react';
import '../styles/Header.css';

interface HeaderProps {
  restaurantInfo: {
    name: string;
    tagline: string;
    tagline2: string;
    
    logo: string;
    heroImage: string;
    phone: string;
    address: string;
  };
  categories: Array<{
    id: string;
    name: string;
    icon?: string;
    items: any[];
  }>;
  activeCategory: string;
}

const Header: React.FC<HeaderProps> = ({ restaurantInfo, categories, activeCategory }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  const taglines = [restaurantInfo.tagline, restaurantInfo.tagline2];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotate taglines every 3 seconds
  useEffect(() => {
    const taglineInterval = setInterval(() => {
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 3000);

    return () => clearInterval(taglineInterval);
  }, [taglines.length]);

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const headerHeight = 70;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-logo">
            <div className="logo-circle">
              <ChefHat className="logo-icon" />
            </div>
            <div className="logo-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
          </div>
          
          <h1 className="hero-title" style={{ marginTop: '2rem' }}>{restaurantInfo.name}</h1>
          
          <div className="hero-tagline-container">
            <p className="hero-tagline animated-tagline" key={currentTaglineIndex}>
              {taglines[currentTaglineIndex]}
            </p>
          </div>
          
          <div className="hero-rating">
            {/* <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="star" fill="currentColor" />
              ))}
            </div>
            <span className="rating-text">4.8 • 1,200+ reviews</span> */}
          </div>
          
          <div className="hero-info">
            {/* <div className="info-card">
              <MapPin className="info-icon" />
              <span>{restaurantInfo.address}</span>
            </div>
            <div className="info-card">
              <Phone className="info-icon" />
              <span>{restaurantInfo.phone}</span>
            </div> */}
          </div>
          
          <div className="hero-scroll-indicator">
            <div className="scroll-arrow"></div>
            <span>Scroll to explore menu</span>
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <nav className={`sticky-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <div className="nav-logo">
              <ChefHat className="nav-icon" />
            </div>
            <span className="nav-title">{restaurantInfo.name}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-menu">
            {categories.filter(cat => cat.items.length > 0).map((category) => (
              <button
                key={category.id}
                className={`nav-item ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => scrollToCategory(category.id)}
              >
                <span className="nav-item-icon">{category.icon}</span>
                <span className="nav-item-text">{category.name}</span>
                <div className="nav-item-indicator"></div>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="menu-line"></span>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-content">
            {categories.filter(cat => cat.items.length > 0).map((category, index) => (
              <button
                key={category.id}
                className={`mobile-nav-item ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => scrollToCategory(category.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="mobile-nav-icon">{category.icon}</span>
                <span className="mobile-nav-text">{category.name}</span>
                <div className="mobile-nav-indicator"></div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;