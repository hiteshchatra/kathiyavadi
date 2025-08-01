# Firebase Integration Setup Guide

This guide will help you set up Firebase integration to fetch dynamic menu data for your restaurant website.

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Firestore Database

### 2. Get Firebase Configuration
1. Go to Project Settings → General
2. Scroll down to "Your apps" section
3. Click on "Web app" icon to create a web app
4. Copy the Firebase configuration object

### 3. Set Up Environment Variables
1. Copy `.env.example` to `.env`
2. Fill in your Firebase configuration:

```bash
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id

# Restaurant Configuration
REACT_APP_RESTAURANT_ID=your-restaurant-id
```

## 📊 Firestore Database Structure

Your Firestore database should have the following structure:

```
restaurants/
  └── {restaurantId}/
      ├── categories/
      │   └── {categoryId}
      │       ├── name: string
      │       ├── description: string
      │       ├── image: string
      │       ├── order: number
      │       ├── visible: boolean
      │       ├── createdAt: timestamp
      │       └── updatedAt: timestamp
      └── menuItems/
          └── {menuItemId}
              ├── name: string
              ├── description: string
              ├── price: number
              ├── image: string
              ├── categoryId: string
              ├── categoryName: string
              ├── available: boolean
              ├── featured: boolean
              ├── createdAt: timestamp
              └── updatedAt: timestamp
```

## 📝 Sample Data

### Categories Collection
```javascript
// Document ID: 1U1OXSlmq7ObzYPXURit
{
  name: "PAPAD",
  description: "",
  image: "",
  order: 2,
  visible: true,
  createdAt: "2025-01-01T00:05:47+05:30",
  updatedAt: "2025-01-01T00:05:47+05:30"
}

// Document ID: 9lujEjQTu2B4VUpXhE1v
{
  name: "PANEER KI SABJI",
  description: "",
  image: "",
  order: 5,
  visible: true,
  createdAt: "2025-01-01T00:43:39+05:30",
  updatedAt: "2025-01-01T00:43:39+05:30"
}
```

### MenuItems Collection
```javascript
// Document ID: 1645K784IxxAeG1CceJ9
{
  name: "Bundi Raita / બુંદી રાયતા",
  description: "",
  price: 85,
  image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...", // base64 image
  categoryId: "wJyC7bwnfbcaDiED3ER7",
  categoryName: "ACCOMPANIMENTS",
  available: true,
  featured: false,
  createdAt: "2025-01-01T00:11:08+05:30",
  updatedAt: "2025-01-01T11:04:40+05:30"
}
```

## 🚀 How It Works

1. **Data Fetching**: The app fetches categories and menu items from Firebase using the restaurant ID
2. **Data Transformation**: Firebase data is transformed to match your existing menu structure
3. **Fallback System**: If Firebase fails or data is unavailable, the app uses static fallback data
4. **Real-time Updates**: Any changes in your admin panel will be reflected in the website

## 🔧 Configuration

### Restaurant ID
Set your restaurant ID in the environment variables:
```bash
REACT_APP_RESTAURANT_ID=your-actual-restaurant-id
```

### Firestore Security Rules
Make sure your Firestore has appropriate read rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /restaurants/{restaurantId}/categories/{document=**} {
      allow read: if true; // Adjust based on your security needs
    }
    match /restaurants/{restaurantId}/menuItems/{document=**} {
      allow read: if true; // Adjust based on your security needs
    }
  }
}
```

## 🎯 Features

- ✅ Dynamic menu loading from Firebase
- ✅ Automatic data transformation
- ✅ Fallback to static data if Firebase fails
- ✅ Category ordering and visibility control
- ✅ Menu item availability and featured status
- ✅ Image support (base64 or URLs)
- ✅ Real-time updates from admin panel

## 🐛 Troubleshooting

### Firebase Not Loading
1. Check console for Firebase errors
2. Verify environment variables are set correctly
3. Ensure Firestore rules allow read access
4. Check if restaurant ID exists in database

### Data Not Displaying
1. Verify data structure matches expected format
2. Check if categories have `visible: true`
3. Check if menu items have `available: true`
4. Ensure categoryId matches between collections

### Images Not Loading
1. For base64 images: Ensure proper format
2. For URL images: Check if URLs are accessible
3. Verify image field is not empty

## 📞 Support

If you need help with the setup, please check:
1. Firebase Console for any errors
2. Browser console for JavaScript errors
3. Network tab for failed requests

The app will gracefully fall back to static data if Firebase integration fails, ensuring your website always works.