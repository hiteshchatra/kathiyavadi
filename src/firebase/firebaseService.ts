import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from './config';

// Types based on your Firebase data structure
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  order: number;
  visible: boolean;
  createdAt: any;
  updatedAt: any;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  categoryName: string;
  available: boolean;
  featured: boolean;
  createdAt: any;
  updatedAt: any;
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  tagline2?: string;
  address: string;
  phone: string;
  logo?: string;
  heroImage?: string;
}

// Fetch categories for a specific restaurant
export const fetchCategories = async (restaurantId: string): Promise<Category[]> => {
  try {
    if (!db) {
      return [];
    }

    const categoriesRef = collection(db, 'users', restaurantId, 'categories');
    const querySnapshot = await getDocs(categoriesRef);
    
    const allCategories: Category[] = [];
    querySnapshot.forEach((doc) => {
      allCategories.push({
        id: doc.id,
        ...doc.data()
      } as Category);
    });
    
    // Filter and sort in JavaScript to avoid index requirement
    const categories = allCategories
      .filter(category => category.visible === true)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Fetch menu items for a specific restaurant
export const fetchMenuItems = async (restaurantId: string): Promise<MenuItem[]> => {
  try {
    if (!db) {
      return [];
    }

    const menuItemsRef = collection(db, 'users', restaurantId, 'menuItems');
    const querySnapshot = await getDocs(menuItemsRef);
    
    const allMenuItems: MenuItem[] = [];
    querySnapshot.forEach((doc) => {
      allMenuItems.push({
        id: doc.id,
        ...doc.data()
      } as MenuItem);
    });
    
    // Filter available items in JavaScript
    const menuItems = allMenuItems.filter(item => item.available === true);
    
    return menuItems;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
};

// Fetch restaurant info
export const fetchRestaurantInfo = async (restaurantId: string): Promise<Restaurant | null> => {
  try {
    if (!db) {
      return null;
    }

    const restaurantRef = collection(db, 'users');
    const q = query(restaurantRef, where('__name__', '==', restaurantId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      const restaurantData = {
        id: doc.id,
        name: data.restaurantName || 'કાઠીયાવાડી',
        tagline: data.tagline || 'ગુજરાતી, પંજાબી, દાલબાટી, પરાઠા',
        tagline2: data.tagline2 || 'Gujarati, Punjabi, Dalbati, Paratha',
        address: data.address || 'Gujarat High Court, Vishwas City 1, Sola, Ahmedabad',
        phone: data.phone || '+91 63765 35219',
        logo: data.logo,
        heroImage: data.heroImage
      } as Restaurant;
      return restaurantData;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching restaurant info:', error);
    return null;
  }
};

// Transform Firebase data to match your existing menu structure
export const transformFirebaseDataToMenu = (categories: Category[], menuItems: MenuItem[]) => {
  const transformedMenu = categories.map(category => {
    const categoryItems = menuItems.filter(item => item.categoryId === category.id);
    
    return {
      id: category.id,
      name: category.name,
      icon: getCategoryIcon(category.image, category.name), // Pass image and name for smart icon selection
      image: category.image || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: category.description,
      items: categoryItems.map(item => ({
        id: item.id,
        name: item.name,
        price: `₹${item.price}`,
        image: item.image || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: item.description,
        isVeg: true, // You can add this field to your Firebase data
        isPopular: item.featured,
        rating: 4.5, // You can add this field to your Firebase data
        prepTime: "15 mins" // You can add this field to your Firebase data
      }))
    };
  });
  
  return transformedMenu;
};

// Helper function to get category icon - uses image if available, otherwise smart emoji fallback
const getCategoryIcon = (categoryImage: string, categoryName?: string): string => {
  // If category has an image, return 'image' to indicate we should use the image
  if (categoryImage && categoryImage.trim() !== '') {
    return 'image';
  }
  
  // If no image, return smart emoji based on category name
  return getSmartEmojiForCategory(categoryName || '');
};

// Smart emoji selection based on category name with random fallbacks
const getSmartEmojiForCategory = (categoryName: string): string => {
  if (!categoryName) return getRandomFoodEmoji();
  
  const name = categoryName.toLowerCase().trim();
  
  // Comprehensive category mapping for real restaurant categories
  const categoryEmojiMap: { [key: string]: string } = {
    // Appetizers & Starters
    'appetizers': '🥗',
    'appetizer': '🥗',
    'starters': '🥗',
    'starter': '🥗',
    'snacks': '🍿',
    'finger foods': '🥨',
    'small plates': '🍽️',
    
    // Soups
    'soups': '🍲',
    'soup': '🍲',
    'broths': '🍲',
    'bisque': '🍲',
    
    // Salads
    'salads': '🥙',
    'salad': '🥙',
    'greens': '🥬',
    'fresh': '🥗',
    
    // Main Course
    'main course': '🍛',
    'mains': '🍛',
    'entrees': '🍛',
    'entree': '🍛',
    'main dishes': '🍛',
    'curry': '🍛',
    'curries': '🍛',
    
    // Rice & Biryani
    'rice': '🍚',
    'biryani': '🍚',
    'biryanis': '🍚',
    'pulao': '🍚',
    'fried rice': '🍚',
    
    // Breads
    'breads': '🥖',
    'bread': '🥖',
    'naan': '🥖',
    'roti': '🥖',
    'chapati': '🥖',
    'paratha': '🥖',
    'kulcha': '����',
    
    // Chinese
    'chinese': '🥢',
    'indo chinese': '🥢',
    'indo-chinese': '🥢',
    'noodles': '🍜',
    'chow mein': '🍜',
    'hakka': '🥢',
    
    // Desserts
    'desserts': '🍰',
    'dessert': '🍰',
    'sweets': '🧁',
    'sweet': '🧁',
    'ice cream': '🍨',
    'cakes': '🎂',
    'pastries': '🥧',
    
    // Beverages
    'beverages': '🥤',
    'beverage': '🥤',
    'drinks': '🥤',
    'drink': '🥤',
    'juices': '🧃',
    'juice': '🧃',
    'tea': '🍵',
    'coffee': '☕',
    'lassi': '🥛',
    'shakes': '🥤',
    'smoothies': '🥤',
    
    // Indian Specific
    'dal': '🍛',
    'daal': '🍛',
    'sabji': '🥘',
    'sabzi': '🥘',
    'paneer': '🧀',
    'chicken': '🍗',
    'mutton': '🍖',
    'lamb': '🍖',
    'fish': '🐟',
    'seafood': '🦐',
    'tandoor': '🔥',
    'tikka': '🍢',
    'kebab': '🍢',
    'kebabs': '🍢',
    
    // Gujarati Specific
    'gujarati': '🍛',
    'kathiyawadi': '🍛',
    'kathiawadi': '🍛',
    'thali': '🍽️',
    'farsan': '🥨',
    'dhokla': '🟡',
    'khandvi': '🟨',
    'undhiyu': '🥘',
    
    // Punjabi Specific
    'punjabi': '🍛',
    'makki': '🌽',
    'sarson': '🥬',
    'chole': '🟤',
    'rajma': '🔴',
    'kadhi': '🟡',
    
    // Accompaniments
    'accompaniments': '🥗',
    'sides': '🥗',
    'side dishes': '🥗',
    'pickles': '🥒',
    'papad': '🥖',
    'raita': '🥛',
    'chutney': '🟢',
    
    // Breakfast
    'breakfast': '🍳',
    'morning': '🌅',
    'paratha': '🥖',
    'poha': '🍚',
    'upma': '🥣',
    'dosa': '🥞',
    'idli': '⚪',
    
    // Street Food
    'street food': '🌮',
    'chaat': '🥗',
    'pani puri': '🟡',
    'bhel': '🥗',
    'vada pav': '🍔',
    'samosa': '🔺',
    'kachori': '🟤',
    
    // Pizza & Fast Food
    'pizza': '🍕',
    'pizzas': '🍕',
    'burger': '🍔',
    'burgers': '🍔',
    'sandwich': '🥪',
    'sandwiches': '🥪',
    'wraps': '🌯',
    'rolls': '🌯',
    
    // Pasta
    'pasta': '🍝',
    'pastas': '🍝',
    'spaghetti': '🍝',
    'noodles': '🍜',
    
    // Grilled
    'grilled': '🔥',
    'bbq': '🔥',
    'barbecue': '🔥',
    'roasted': '🔥',
    
    // Healthy
    'healthy': '🥗',
    'diet': '🥗',
    'low calorie': '🥗',
    'organic': '🌱',
    'vegan': '🌱',
    'vegetarian': '🥬'
  };
  
  // Check for exact matches first
  if (categoryEmojiMap[name]) {
    return categoryEmojiMap[name];
  }
  
  // Check for partial matches (if category name contains keywords)
  for (const [keyword, emoji] of Object.entries(categoryEmojiMap)) {
    if (name.includes(keyword)) {
      return emoji;
    }
  }
  
  // If no match found, return a random food emoji
  return getRandomFoodEmoji();
};

// Random food emoji generator for unknown categories
const getRandomFoodEmoji = (): string => {
  const foodEmojis = [
    '🍽️', '🍛', '🍚', '🍜', '🍲', '🥘', '🍗', '🍖', '🥩', '🍤',
    '🍣', '🍱', '🍙', '🍘', '🍥', '🥟', '🥠', '🥡', '🌮', '🌯',
    '🥙', '🥪', '🍕', '🍔', '🍟', '🌭', '🥓', '🍳', '🧀', '🥨',
    '🥖', '🥐', '🍞', '🥯', '🧈', '🥞', '🧇', '🍰', '🎂', '🧁',
    '🥧', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜',
    '🍯', '🥛', '☕', '🍵', '🧃', '🥤', '🍷', '🍺', '🍻', '🥂'
  ];
  
  return foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
};