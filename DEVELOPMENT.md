# WorkManGH - Development Guide

## Overview

WorkManGH is a mobile application built with React Native and Expo that connects skilled local artisans with customers who need their services. This guide provides detailed information for developers working on the project.

## Architecture

### Technology Stack

- **Framework**: React Native 0.74.5
- **Platform**: Expo ~51.0.0
- **UI Navigation**: React Navigation (Stack Navigator)
- **State Management**: React Hooks (useState, useEffect)
- **Location Services**: expo-location
- **Image Handling**: expo-image-picker
- **Deep Linking**: expo-linking

### Project Structure

```
WorkManGH/
├── App.js                              # Root component with navigation setup
├── src/
│   ├── screens/                        # Screen components
│   │   ├── HomeScreen.js              # Landing page with two main actions
│   │   ├── CategorySelectionScreen.js # Grid view of artisan categories
│   │   ├── ArtisanListScreen.js       # GPS-sorted list of artisans
│   │   ├── ArtisanDetailScreen.js     # Full artisan profile with call action
│   │   ├── ArtisanRegistrationScreen.js # Registration form for artisans
│   │   └── ArtisanProfileScreen.js    # Artisan's own profile management
│   └── data/
│       └── artisanData.js             # Sample data and utility functions
├── assets/                             # App icons and images
├── app.json                           # Expo configuration
├── package.json                       # Dependencies and scripts
└── babel.config.js                    # Babel configuration
```

## Screen Descriptions

### 1. HomeScreen
**Path**: `src/screens/HomeScreen.js`

Landing screen with two primary actions:
- Find an Artisan (customer journey)
- Register as Artisan (artisan journey)

Includes "How It Works" section explaining the app flow.

### 2. CategorySelectionScreen
**Path**: `src/screens/CategorySelectionScreen.js`

Displays a grid of artisan categories (8 categories):
- Mason, Carpenter, Plumber, Painter
- Electrician, Welder, Tiler, Mechanic

Each category card shows an emoji icon and name.

### 3. ArtisanListScreen
**Path**: `src/screens/ArtisanListScreen.js`

**Key Features**:
- Requests location permission on mount
- Uses GPS to sort artisans by distance
- Displays artisan cards with:
  - Name and profile placeholder
  - Location address
  - Rating and review count
  - Experience in years
  - Distance from user
  - Availability status

**Data Flow**:
1. Receives `category` from navigation params
2. Requests user location permission
3. Gets current GPS coordinates
4. Fetches artisans by category
5. Calculates distance for each artisan
6. Sorts by distance (nearest first)
7. Renders list

### 4. ArtisanDetailScreen
**Path**: `src/screens/ArtisanDetailScreen.js`

Detailed artisan profile with:
- Profile photo (placeholder with initial)
- Name, category, rating
- Availability badge
- Contact information (location, phone, experience)
- Bio/About section
- Portfolio section (placeholder)
- Action buttons:
  - Call Now (uses `Linking.openURL('tel:...')`)
  - Send Job Request (placeholder)

### 5. ArtisanRegistrationScreen
**Path**: `src/screens/ArtisanRegistrationScreen.js`

Registration form with validation:
- **Required fields**: Name, Phone, Category, Experience
- **Optional fields**: Bio
- **Features**:
  - Horizontal scrollable category chips
  - Phone number validation
  - Experience number validation
  - Photo upload placeholder

### 6. ArtisanProfileScreen
**Path**: `src/screens/ArtisanProfileScreen.js`

Artisan's own profile management:
- View profile statistics (experience, reviews, rating)
- Toggle availability status (Available/Busy)
- Edit profile (placeholder)
- Manage photos (placeholder)
- Tips for success section

## Data Layer

### artisanData.js

**Constants**:
- `ARTISAN_CATEGORIES`: Array of 8 category objects
- `SAMPLE_ARTISANS`: Array of 8 sample artisan profiles

**Utility Functions**:

#### `getArtisansByCategory(category)`
Filters artisans by category ID.

```javascript
const plumbers = getArtisansByCategory('plumber');
```

#### `calculateDistance(lat1, lon1, lat2, lon2)`
Uses Haversine formula to calculate distance between two GPS coordinates in kilometers.

```javascript
const km = calculateDistance(5.6037, -0.1870, 5.6100, -0.1900);
```

#### `getNearbyArtisans(category, userLat, userLon)`
Returns artisans in a category, sorted by distance from user location.

```javascript
const nearby = getNearbyArtisans('electrician', userLat, userLon);
```

## Navigation Structure

```
Stack Navigator
├── Home
├── CategorySelection
├── ArtisanList (params: category)
├── ArtisanDetail (params: artisan)
├── ArtisanRegistration
└── ArtisanProfile
```

**Navigation Props**:
- All screens receive `navigation` prop
- Screens that need data receive `route` prop with params

**Example Navigation**:
```javascript
navigation.navigate('ArtisanList', { category });
navigation.navigate('ArtisanDetail', { artisan });
```

## Permissions

### Location
**Required for**: Finding nearby artisans

```javascript
let { status } = await Location.requestForegroundPermissionsAsync();
```

### Phone Calls
**Required for**: Calling artisans directly

```javascript
Linking.openURL(`tel:${phoneNumber}`);
```

### Camera/Photos
**Required for**: Profile and portfolio photo uploads (future feature)

Configured in `app.json` with `expo-image-picker` plugin.

## Styling

All components use React Native's `StyleSheet.create()` for performance.

**Color Scheme**:
- Primary: `#FF6B35` (Orange)
- Secondary: `#4ECDC4` (Teal)
- Background: `#F5F5F5` (Light Gray)
- Text: `#333` (Dark Gray)
- Text Secondary: `#666` (Medium Gray)

**Common Patterns**:
- Cards: white background, border radius 12, elevation/shadow
- Buttons: colored background, white text, bold font
- Icons: Emoji characters for simplicity (no icon library needed)

## Development Workflow

### Initial Setup
```bash
npm install
```

### Start Development Server
```bash
npm start
```

### Run on Platforms
```bash
npm run android  # Android emulator or device
npm run ios      # iOS simulator or device (macOS only)
npm run web      # Web browser
```

### Testing on Physical Device
1. Install Expo Go app from Play Store or App Store
2. Run `npm start`
3. Scan QR code with camera (iOS) or Expo Go (Android)

## Future Enhancements

### Backend Integration
Replace `SAMPLE_ARTISANS` with API calls:
```javascript
const response = await fetch('https://api.workmangh.com/artisans?category=plumber');
const artisans = await response.json();
```

### User Authentication
Add login/signup screens and token management:
- Firebase Auth
- JWT tokens
- Secure storage for credentials

### Real-time Features
- Push notifications for job requests
- In-app messaging
- Real-time availability updates

### Photo Upload
Implement actual photo upload using `expo-image-picker`:
```javascript
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
});
```

### Reviews & Ratings
- Review submission form
- Star rating component
- Review history

### Job Management
- Job request system
- Job history
- Status tracking (pending, accepted, completed)

### Payment Integration
- Mobile money integration (MTN, Vodafone Cash, AirtelTigo Money)
- Payment history
- Invoice generation

## Common Issues

### Location Permission Denied
If location permission is denied, app falls back to default Accra coordinates (5.6037, -0.1870) for distance calculation.

### Metro Bundler Issues
Clear cache if you encounter bundling issues:
```bash
npm start -- --clear
```

### Dependency Conflicts
If dependencies fail to install:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Code Style Guidelines

- Use functional components with hooks
- Use arrow functions for event handlers
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks or utilities
- Use meaningful variable and function names
- Add comments for complex logic

## Performance Considerations

- Use `FlatList` instead of `ScrollView` for long lists (future optimization)
- Optimize images (compress and use appropriate sizes)
- Implement lazy loading for artisan profiles
- Cache location data to avoid excessive GPS requests
- Use React.memo for components that don't need frequent re-renders

## Security Considerations

- Never store sensitive data in plain text
- Validate all user inputs
- Sanitize phone numbers before calling
- Use HTTPS for all API calls
- Implement rate limiting for API requests
- Validate location data before using

## Testing

Currently, the app includes a basic structure test (`test-app.js`). For production, implement:
- Unit tests (Jest)
- Component tests (React Native Testing Library)
- Integration tests
- E2E tests (Detox)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues or questions, please open an issue on the GitHub repository.

---

**Happy Coding! 🚀**
