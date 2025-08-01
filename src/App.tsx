import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import Category from './components/Category';
import CategoryNav from './components/CategoryNav';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchCategories, fetchMenuItems, fetchRestaurantInfo, transformFirebaseDataToMenu, Restaurant } from './firebase/firebaseService';
import { debugDatabaseStructure } from './firebase/debugService';
import { findAllRestaurantIds } from './firebase/findRestaurantId';
import { APP_CONFIG } from './config/app';
import './styles/App.css';

// Fallback static menu data (commented out - now using Firebase data)
/*
const fallbackMenu = [
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
*/

// Empty fallback menu - now using Firebase data only
const fallbackMenu: any[] = [];

// Fallback restaurant info
const fallbackRestaurantInfo = {
  name: "કાઠિયાવાડી",
  tagline: "ગુજરાતી, પંજાબી, દાલબાટી, પરાઠા",
  tagline2: "Gujarati, Punjabi, Dalbati, Paratha",
  logo: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200",
  heroImage: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
  phone: "+91 63765 35219",
  address: "Gujarat High Court, Vishwas City 1, Sola, Ahmedabad"
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [menu, setMenu] = useState(fallbackMenu);
  const [restaurantInfo, setRestaurantInfo] = useState(fallbackRestaurantInfo);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Restaurant ID from configuration
  const RESTAURANT_ID = APP_CONFIG.RESTAURANT_ID;

  // Load data from Firebase
  useEffect(() => {
    const loadFirebaseData = async () => {
      try {
        setIsLoading(true);
        // Fetch data from Firebase
        const [categories, menuItems, restaurantData] = await Promise.all([
          fetchCategories(RESTAURANT_ID),
          fetchMenuItems(RESTAURANT_ID),
          fetchRestaurantInfo(RESTAURANT_ID)
        ]);

        // Transform Firebase data to match your existing structure
        if (categories.length > 0 && menuItems.length > 0) {
          const transformedMenu = transformFirebaseDataToMenu(categories, menuItems);
          setMenu(transformedMenu);
          setDataLoaded(true);
        }

        // Update restaurant info if available
        if (restaurantData) {
          setRestaurantInfo({
            name: restaurantData.name || fallbackRestaurantInfo.name,
            tagline: restaurantData.tagline || fallbackRestaurantInfo.tagline,
            tagline2: restaurantData.tagline2 || fallbackRestaurantInfo.tagline2,
            phone: restaurantData.phone || fallbackRestaurantInfo.phone,
            address: restaurantData.address || fallbackRestaurantInfo.address,
            logo: restaurantData.logo || fallbackRestaurantInfo.logo,
            heroImage: restaurantData.heroImage || fallbackRestaurantInfo.heroImage
          });
        }

      } catch (error) {
        console.error('Error loading Firebase data:', error);
        // Keep fallback data if Firebase fails
      } finally {
        // Simulate loading time for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    loadFirebaseData();
  }, [RESTAURANT_ID]);

  // Create a flat list of all menu items with category info for searching
  const allMenuItems = useMemo(() => {
    return menu.flatMap(category =>
      category.items.map(item => ({
        ...item,
        categoryName: category.name,
        categoryIcon: category.icon
      }))
    );
  }, [menu]);

  // Reorder categories based on selected category
  const orderedCategories = useMemo(() => {
    if (!selectedCategory) return menu;

    const selectedCat = menu.find(cat => cat.id === selectedCategory);
    const otherCats = menu.filter(cat => cat.id !== selectedCategory);

    return selectedCat ? [selectedCat, ...otherCats] : menu;
  }, [selectedCategory, menu]);

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
          {/* Contact Information */}
          <div className="footer-contact-section">
            <h4 className="footer-section-title">Contact Us</h4>
            <div className="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{restaurantInfo.address}</span>
            </div>
            <div className="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <a href={`tel:${restaurantInfo.phone.replace(/[^\d+]/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>{restaurantInfo.phone}</a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="footer-actions-section">
            <div className="footer-buttons">
              <a
                href="https://maps.app.goo.gl/vztXTynWqZ7C1nbx7"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-action-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Get Directions</span>
              </a>
              <a
                href="https://www.google.com/maps/place/Om+Kathiyawadi/@23.079501,72.526994,19z/data=!4m6!3m5!1s0x395e8300035acdfd:0x46bc5c14fe47370e!8m2!3d23.0794492!4d72.5266068!16s%2Fg%2F11vwpg2x08?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-action-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                </svg>
                <span>Write Review</span>
              </a>
            </div>
          </div>

          {/* Made by Quick Menus */}
          <div className="footer-branding-section">
            <div className="footer-made-by">
              <span className="footer-made-text">Made by</span>
              <a
                href="https://quickmenus.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-brand-logo"
                style={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-brand-icon">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="M21 15.5c-1-1.5-3-2.5-5-2.5s-4 1-5 2.5"></path>
                </svg>
                <span className="footer-brand-name">Quick Menus</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {restaurantInfo.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;