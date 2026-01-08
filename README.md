# WorkManGH - Artisan Marketplace & Locator App

![WorkManGH](https://img.shields.io/badge/Platform-React%20Native-blue)
![Expo](https://img.shields.io/badge/Expo-~51.0.0-green)

An Artisan Marketplace & Locator App that connects skilled local artisans (masons, carpenters, plumbers, painters, electricians, welders, tilers, etc.) with people who need work done, fast and reliably.

Think of it as **"Uber meets skilled labor"**, but grounded in Ghanaian realities like location, trust, and phone calls.

## 🎯 Features

### For Customers (Job Seekers)
- **Browse Artisans by Category**: Select from 8 different artisan categories
- **Location-Based Search**: Find artisans near you using GPS
- **View Detailed Profiles**: See artisan information including:
  - Name & profile photo
  - Skills & experience level
  - Ratings & reviews
  - Contact information
- **Direct Communication**: Call artisans directly with one tap
- **Send Job Requests**: Quick job request functionality

### For Artisans
- **Simple Registration**: Register with basic information
  - Name
  - Phone number
  - Skill category
  - Years of experience
  - Location
- **Profile Management**: 
  - Upload profile photo
  - Add portfolio photos (past work)
  - Write bio/description
- **Availability Toggle**: Mark yourself as available or busy
- **Build Reputation**: Receive ratings and reviews from customers

## 🔧 Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack Navigator)
- **Location Services**: expo-location
- **Image Handling**: expo-image-picker
- **Platform Support**: iOS, Android, and Web

## 📱 Artisan Categories

- 🧱 Mason
- 🪚 Carpenter
- 🔧 Plumber
- 🎨 Painter
- ⚡ Electrician
- 🔥 Welder
- 🏗️ Tiler
- 🔩 Mechanic

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/McAnnison/WorkManGH.git
cd WorkManGH
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
   - Install Expo Go app on your phone
   - Scan the QR code displayed in the terminal
   
   Or run on emulator/simulator:
   - For Android: `npm run android`
   - For iOS: `npm run ios`
   - For Web: `npm run web`

## 📂 Project Structure

```
WorkManGH/
├── App.js                          # Main app component with navigation
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js           # Landing page
│   │   ├── CategorySelectionScreen.js  # Select artisan category
│   │   ├── ArtisanListScreen.js    # List of artisans by category
│   │   ├── ArtisanDetailScreen.js  # Artisan profile details
│   │   ├── ArtisanRegistrationScreen.js  # Artisan registration form
│   │   └── ArtisanProfileScreen.js # Artisan's own profile management
│   └── data/
│       └── artisanData.js          # Sample data and utility functions
├── assets/                         # App icons and images
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
└── babel.config.js                 # Babel configuration
```

## 🎨 User Flow

### Customer Journey
1. Open app → Home screen
2. Tap "Find an Artisan"
3. Select category (e.g., Plumber)
4. View nearby artisans with GPS-based sorting
5. Tap on an artisan to view full profile
6. Call artisan or send job request
7. Artisan accepts and comes to work

### Artisan Journey
1. Open app → Home screen
2. Tap "Register as Artisan"
3. Fill in registration form (name, phone, category, experience)
4. Upload photos (profile & portfolio)
5. Complete registration
6. Manage profile and toggle availability
7. Receive calls/requests from customers
8. Build reputation through ratings

## 🌍 Permissions Required

- **Location**: To find nearby artisans (GPS-based search)
- **Phone/Calls**: To make direct calls to artisans
- **Camera/Photos**: To upload profile and portfolio photos

## 📊 Sample Data

The app includes sample artisan data for demonstration purposes. In a production environment, this would be replaced with a backend API and database.

## 🔮 Future Enhancements

- Backend API integration
- User authentication
- Real-time job request notifications
- In-app messaging
- Payment integration
- Review and rating system implementation
- Job history tracking
- Artisan verification system
- Push notifications
- Photo upload functionality
- Multi-language support (English, Twi, Ga, etc.)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

WorkManGH Team

## 🙏 Acknowledgments

- Built for the Ghanaian artisan community
- Inspired by the need to connect skilled workers with customers efficiently
- Designed with mobile-first approach for accessibility

---

**WorkManGH** - Empowering artisans who normally depend on roadside visibility or word of mouth.