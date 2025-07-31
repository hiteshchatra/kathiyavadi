import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import Category from './components/Category';
import CategoryNav from './components/CategoryNav';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import LoadingSpinner from './components/LoadingSpinner';
import './styles/App.css';

const menu = [
  {
    id: "cat1",
    name: "Appetizers",
    icon: "🥗",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Perfect way to start your culinary journey",
    items: [
      {
        id: "item1",
        name: "Crispy Spring Rolls",
        price: "₹120",
        originalPrice: "₹150",
        image: "https://images.pexels.com/photos/4397839/pexels-photo-4397839.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Golden crispy rolls filled with fresh vegetables and aromatic herbs, served with tangy sweet chili sauce.",
        isVeg: true,
        isPopular: true,
        rating: 4.8,
        prepTime: "15 mins"
      },
      {
        id: "item2",
        name: "Chilli Paneer Dry",
        price: "₹160",
        image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Indo-Chinese favorite with cottage cheese cubes tossed in spicy sauce.",
        isVeg: true,
        rating: 4.6,
        prepTime: "20 mins"
      },
      {
        id: "item3",
        name: "Buffalo Chicken Wings",
        price: "₹180",
        image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Spicy buffalo wings glazed with our signature sauce, served with ranch dip.",
        isVeg: false,
        isPopular: true,
        rating: 4.9,
        prepTime: "25 mins"
      },
      {
        id: "item4",
        name: "Mushroom Tikka",
        price: "₹140",
        image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Marinated button mushrooms grilled to perfection with Indian spices.",
        isVeg: true,
        rating: 4.5,
        prepTime: "18 mins"
      },
      {
        id: "item5",
        name: "Chicken Satay",
        price: "₹200",
        image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Grilled chicken skewers with peanut sauce and cucumber salad.",
        isVeg: false,
        rating: 4.7,
        prepTime: "22 mins"
      },
      {
        id: "item6",
        name: "Vegetable Samosas",
        price: "₹90",
        image: "https://images.pexels.com/photos/4397839/pexels-photo-4397839.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Crispy pastries filled with spiced potatoes and peas.",
        isVeg: true,
        rating: 4.4,
        prepTime: "12 mins"
      }
    ]
  },
  {
    id: "cat2",
    name: "Soups",
    icon: "🍲",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Warm and comforting soups",
    items: [
      {
        id: "soup1",
        name: "Tom Yum Soup",
        price: "₹150",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Spicy and sour Thai soup with mushrooms and herbs.",
        isVeg: true,
        rating: 4.6,
        prepTime: "15 mins"
      },
      {
        id: "soup2",
        name: "Chicken Corn Soup",
        price: "₹130",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Creamy soup with tender chicken and sweet corn.",
        isVeg: false,
        rating: 4.5,
        prepTime: "18 mins"
      },
      {
        id: "soup3",
        name: "Vegetable Clear Soup",
        price: "₹110",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Light and healthy soup with fresh vegetables.",
        isVeg: true,
        rating: 4.3,
        prepTime: "12 mins"
      },
      {
        id: "soup4",
        name: "Mushroom Soup",
        price: "₹140",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Rich and creamy mushroom soup with herbs.",
        isVeg: true,
        isPopular: true,
        rating: 4.7,
        prepTime: "16 mins"
      }
    ]
  },
  {
    id: "cat3",
    name: "Salads",
    icon: "🥙",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Fresh and healthy salads",
    items: [
      {
        id: "salad1",
        name: "Caesar Salad",
        price: "₹180",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Crisp romaine lettuce with parmesan and croutons.",
        isVeg: true,
        rating: 4.5,
        prepTime: "10 mins"
      },
      {
        id: "salad2",
        name: "Greek Salad",
        price: "₹160",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Fresh vegetables with feta cheese and olives.",
        isVeg: true,
        rating: 4.4,
        prepTime: "8 mins"
      },
      {
        id: "salad3",
        name: "Chicken Salad",
        price: "₹220",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Grilled chicken with mixed greens and dressing.",
        isVeg: false,
        isPopular: true,
        rating: 4.6,
        prepTime: "15 mins"
      }
    ]
  },
  {
    id: "cat4",
    name: "Main Course",
    icon: "🍛",
    image: "https://images.pexels.com/photos/1860208/pexels-photo-1860208.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Hearty meals that satisfy your soul",
    items: [
      {
        id: "main1",
        name: "Butter Chicken Masala",
        price: "₹280",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Rich and creamy tomato-based curry with tender chicken pieces, a true classic.",
        isVeg: false,
        isPopular: true,
        rating: 4.9,
        prepTime: "30 mins"
      },
      {
        id: "main2",
        name: "Paneer Makhani",
        price: "₹240",
        image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Cottage cheese cubes in rich tomato and cashew gravy with aromatic spices.",
        isVeg: true,
        rating: 4.7,
        prepTime: "25 mins"
      },
      {
        id: "main3",
        name: "Hyderabadi Biryani",
        price: "₹320",
        originalPrice: "₹380",
        image: "https://images.pexels.com/photos/13163534/pexels-photo-13163534.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Aromatic basmati rice layered with spices and your choice of protein, slow-cooked to perfection.",
        isVeg: true,
        isPopular: true,
        rating: 4.8,
        prepTime: "45 mins"
      },
      {
        id: "main4",
        name: "Dal Makhani",
        price: "₹180",
        image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Slow-cooked black lentils in rich tomato and butter gravy.",
        isVeg: true,
        rating: 4.6,
        prepTime: "35 mins"
      },
      {
        id: "main5",
        name: "Chicken Tikka Masala",
        price: "₹300",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Grilled chicken in spiced curry sauce with cream and tomatoes.",
        isVeg: false,
        rating: 4.8,
        prepTime: "28 mins"
      },
      {
        id: "main6",
        name: "Vegetable Korma",
        price: "₹220",
        image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Mixed vegetables in coconut and cashew curry.",
        isVeg: true,
        rating: 4.5,
        prepTime: "22 mins"
      },
      {
        id: "main7",
        name: "Fish Curry",
        price: "₹350",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Fresh fish cooked in coconut curry with spices.",
        isVeg: false,
        rating: 4.7,
        prepTime: "25 mins"
      },
      {
        id: "main8",
        name: "Mutton Rogan Josh",
        price: "₹380",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Tender mutton in aromatic Kashmiri curry.",
        isVeg: false,
        isPopular: true,
        rating: 4.9,
        prepTime: "40 mins"
      }
    ]
  },
  {
    id: "cat5",
    name: "Rice & Biryani",
    icon: "🍚",
    image: "https://images.pexels.com/photos/13163534/pexels-photo-13163534.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Aromatic rice dishes and biryanis",
    items: [
      {
        id: "rice1",
        name: "Chicken Biryani",
        price: "₹300",
        image: "https://images.pexels.com/photos/13163534/pexels-photo-13163534.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Fragrant basmati rice with spiced chicken.",
        isVeg: false,
        isPopular: true,
        rating: 4.8,
        prepTime: "35 mins"
      },
      {
        id: "rice2",
        name: "Vegetable Biryani",
        price: "₹250",
        image: "https://images.pexels.com/photos/13163534/pexels-photo-13163534.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Aromatic rice with mixed vegetables and spices.",
        isVeg: true,
        rating: 4.6,
        prepTime: "30 mins"
      },
      {
        id: "rice3",
        name: "Mutton Biryani",
        price: "₹380",
        image: "https://images.pexels.com/photos/13163534/pexels-photo-13163534.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Premium mutton biryani with saffron and spices.",
        isVeg: false,
        rating: 4.9,
        prepTime: "45 mins"
      },
      {
        id: "rice4",
        name: "Jeera Rice",
        price: "₹120",
        image: "https://images.pexels.com/photos/13163534/pexels-photo-13163534.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Basmati rice flavored with cumin seeds.",
        isVeg: true,
        rating: 4.3,
        prepTime: "15 mins"
      },
      {
        id: "rice5",
        name: "Fried Rice",
        price: "₹180",
        image: "https://images.pexels.com/photos/13163534/pexels-photo-13163534.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Wok-tossed rice with vegetables and soy sauce.",
        isVeg: true,
        rating: 4.4,
        prepTime: "18 mins"
      }
    ]
  },
  {
    id: "cat6",
    name: "Breads",
    icon: "🥖",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Fresh baked breads and naans",
    items: [
      {
        id: "bread1",
        name: "Butter Naan",
        price: "₹60",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Soft naan bread brushed with butter.",
        isVeg: true,
        rating: 4.5,
        prepTime: "10 mins"
      },
      {
        id: "bread2",
        name: "Garlic Naan",
        price: "₹80",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Naan topped with fresh garlic and herbs.",
        isVeg: true,
        isPopular: true,
        rating: 4.7,
        prepTime: "12 mins"
      },
      {
        id: "bread3",
        name: "Cheese Naan",
        price: "₹100",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Naan stuffed with melted cheese.",
        isVeg: true,
        rating: 4.6,
        prepTime: "15 mins"
      },
      {
        id: "bread4",
        name: "Tandoori Roti",
        price: "₹40",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Whole wheat bread baked in tandoor.",
        isVeg: true,
        rating: 4.3,
        prepTime: "8 mins"
      }
    ]
  },
  {
    id: "cat7",
    name: "Chinese",
    icon: "🥢",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Indo-Chinese favorites",
    items: [
      {
        id: "chinese1",
        name: "Hakka Noodles",
        price: "₹180",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Stir-fried noodles with vegetables and sauces.",
        isVeg: true,
        rating: 4.5,
        prepTime: "20 mins"
      },
      {
        id: "chinese2",
        name: "Chicken Manchurian",
        price: "₹220",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Crispy chicken balls in tangy sauce.",
        isVeg: false,
        isPopular: true,
        rating: 4.7,
        prepTime: "25 mins"
      },
      {
        id: "chinese3",
        name: "Vegetable Fried Rice",
        price: "₹160",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Wok-tossed rice with mixed vegetables.",
        isVeg: true,
        rating: 4.4,
        prepTime: "18 mins"
      },
      {
        id: "chinese4",
        name: "Chilli Chicken",
        price: "₹240",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Spicy chicken with bell peppers and onions.",
        isVeg: false,
        rating: 4.6,
        prepTime: "22 mins"
      }
    ]
  },
  {
    id: "cat8",
    name: "Desserts",
    icon: "🍰",
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Perfect finale to your dining experience",
    items: [
      {
        id: "dessert1",
        name: "Gulab Jamun",
        price: "₹80",
        image: "https://images.pexels.com/photos/14737499/pexels-photo-14737499.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Soft milk dumplings soaked in rose-flavored sugar syrup, served warm.",
        isVeg: true,
        rating: 4.7,
        prepTime: "5 mins"
      },
      {
        id: "dessert2",
        name: "Chocolate Brownie",
        price: "₹120",
        image: "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Decadent chocolate brownie served with vanilla ice cream.",
        isVeg: true,
        isPopular: true,
        rating: 4.8,
        prepTime: "10 mins"
      },
      {
        id: "dessert3",
        name: "Kulfi Falooda",
        price: "₹100",
        image: "https://images.pexels.com/photos/14737499/pexels-photo-14737499.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Traditional Indian ice cream with vermicelli and rose syrup.",
        isVeg: true,
        rating: 4.5,
        prepTime: "8 mins"
      },
      {
        id: "dessert4",
        name: "Rasmalai",
        price: "₹90",
        image: "https://images.pexels.com/photos/14737499/pexels-photo-14737499.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Soft cottage cheese dumplings in sweetened milk.",
        isVeg: true,
        rating: 4.6,
        prepTime: "6 mins"
      },
      {
        id: "dessert5",
        name: "Ice Cream Sundae",
        price: "₹110",
        image: "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Vanilla ice cream with chocolate sauce and nuts.",
        isVeg: true,
        rating: 4.4,
        prepTime: "5 mins"
      }
    ]
  },
  {
    id: "cat9",
    name: "Beverages",
    icon: "🥤",
    image: "https://images.pexels.com/photos/1553979/pexels-photo-1553979.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Quench your thirst with our signature drinks",
    items: [
      {
        id: "bev1",
        name: "Fresh Lime Soda",
        price: "₹60",
        image: "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Refreshing lime juice with soda and mint leaves.",
        isVeg: true,
        rating: 4.4,
        prepTime: "5 mins"
      },
      {
        id: "bev2",
        name: "Mango Lassi",
        price: "₹80",
        image: "https://images.pexels.com/photos/4397839/pexels-photo-4397839.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Creamy yogurt drink blended with fresh mango pulp.",
        isVeg: true,
        isPopular: true,
        rating: 4.6,
        prepTime: "7 mins"
      },
      {
        id: "bev3",
        name: "Masala Chai",
        price: "₹40",
        image: "https://images.pexels.com/photos/1553979/pexels-photo-1553979.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Traditional spiced tea with milk and sugar.",
        isVeg: true,
        rating: 4.5,
        prepTime: "8 mins"
      },
      {
        id: "bev4",
        name: "Fresh Orange Juice",
        price: "₹70",
        image: "https://images.pexels.com/photos/1553979/pexels-photo-1553979.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Freshly squeezed orange juice.",
        isVeg: true,
        rating: 4.3,
        prepTime: "5 mins"
      },
      {
        id: "bev5",
        name: "Cold Coffee",
        price: "₹90",
        image: "https://images.pexels.com/photos/1553979/pexels-photo-1553979.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Iced coffee with milk and sugar.",
        isVeg: true,
        rating: 4.4,
        prepTime: "6 mins"
      },
      {
        id: "bev6",
        name: "Coconut Water",
        price: "₹50",
        image: "https://images.pexels.com/photos/1553979/pexels-photo-1553979.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Fresh tender coconut water.",
        isVeg: true,
        rating: 4.2,
        prepTime: "3 mins"
      }
    ]
  }
];

const restaurantInfo = {
  name: "કાઠિયાવાડી",
  tagline: "ગુજરાતી, પંજાબી, દાલબાટી, પરાઠા",
  tagline2: "Gujarati, Punjabi, Dalbati, Paratha",
  logo: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200",
  heroImage: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
  phone: "+91 98765 43210",
  address: "123 Food Street, Gourmet District"
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Create a flat list of all menu items with category info for searching (memoized once)
  const allMenuItems = useMemo(() => {
    return menu.flatMap(category => 
      category.items.map(item => ({
        ...item,
        categoryName: category.name,
        categoryIcon: category.icon
      }))
    );
  }, []); // Empty dependency array since menu is static

  // Reorder categories based on selected category
  const orderedCategories = useMemo(() => {
    if (!selectedCategory) return menu;
    
    const selectedCat = menu.find(cat => cat.id === selectedCategory);
    const otherCats = menu.filter(cat => cat.id !== selectedCategory);
    
    return selectedCat ? [selectedCat, ...otherCats] : menu;
  }, [selectedCategory]);

  // Filter items based on search query (optimized)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    return allMenuItems.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.categoryName.toLowerCase().includes(query)
    );
  }, [searchQuery, allMenuItems]);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only add scroll listener if not searching and no category selected
    if (searchQuery || selectedCategory) return;

    const handleScroll = () => {
      const categories = document.querySelectorAll('.category-section');
      const scrollPosition = window.scrollY + 200;

      categories.forEach((category) => {
        const categoryTop = category.offsetTop;
        const categoryBottom = categoryTop + category.offsetHeight;

        if (scrollPosition >= categoryTop && scrollPosition < categoryBottom) {
          setActiveCategory(category.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchQuery, selectedCategory]);

  const handleCategoryClick = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveCategory(categoryId);
    // No scrolling - user stays at current position
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // Reset category selection when searching
    if (query) {
      setSelectedCategory('');
    }
  }, []);

  if (isLoading) {
    return <LoadingSpinner restaurantName={restaurantInfo.name} />;
  }

  return (
    <div className="app">
      <Header 
        restaurantInfo={restaurantInfo}
        categories={menu}
        activeCategory={activeCategory}
      />
      
      <main className="main-content">
        <div className="menu-container">
          <SearchBar onSearch={handleSearch} />
          
          {searchQuery ? (
            <SearchResults 
              query={searchQuery}
              results={searchResults}
              isSearching={false}
            />
          ) : (
            <>
              <CategoryNav 
                categories={menu}
                activeCategory={selectedCategory || activeCategory}
                onCategoryClick={handleCategoryClick}
              />
              
              {orderedCategories.map((category, index) => (
                category.items.length > 0 && (
                  <Category 
                    key={category.id} 
                    category={category} 
                    animationDelay={index * 0.1}
                  />
                )
              ))}
            </>
          )}
        </div>
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>{restaurantInfo.name}</h3>
            <p className="footer-tagline">{restaurantInfo.tagline}</p>
          </div>
          <div className="footer-info">
            <div className="footer-contact">
              <p>{restaurantInfo.address}</p>
              <p>{restaurantInfo.phone}</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 {restaurantInfo.name}. All rights reserved.</p>
            <p className="footer-love">Crafted with ❤️ for food lovers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;