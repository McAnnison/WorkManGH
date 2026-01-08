# WorkManGH Quick Start Guide

## For End Users

### Installation
1. Download Expo Go app:
   - [Android - Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - Apple App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Scan QR code when app is running in development mode

### Using the App

#### As a Customer (Looking for Artisans)
1. Open WorkManGH app
2. Tap **"Find an Artisan"**
3. Select the type of artisan you need (e.g., Plumber, Electrician)
4. Browse nearby artisans (sorted by distance)
5. Tap on an artisan to view their full profile
6. Review their:
   - Experience and ratings
   - Contact information
   - Past work (portfolio)
7. Tap **"Call Now"** to contact them directly
8. Or send a job request

#### As an Artisan (Offering Services)
1. Open WorkManGH app
2. Tap **"Register as Artisan"**
3. Fill in your details:
   - Full name
   - Phone number
   - Select your skill category
   - Years of experience
   - About yourself (optional)
4. Upload photos (profile & portfolio)
5. Complete registration
6. Manage your profile:
   - Toggle availability (Available/Busy)
   - Update information
   - Add more portfolio photos
7. Receive calls and job requests from customers

## For Developers

### Prerequisites
- Node.js v14 or higher
- npm or yarn
- iOS/Android emulator (optional)

### Quick Setup
```bash
# Clone repository
git clone https://github.com/McAnnison/WorkManGH.git
cd WorkManGH

# Install dependencies
npm install

# Start development server
npm start
```

### Run on Different Platforms
```bash
# Start and scan QR code with Expo Go
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator (macOS only)
npm run ios

# Run in web browser
npm run web
```

### Development Tips
- Press `r` in terminal to reload app
- Shake device to open developer menu
- Use React DevTools for debugging
- Check `DEVELOPMENT.md` for detailed documentation

## Troubleshooting

### App won't start
```bash
# Clear cache and restart
npm start -- --clear
```

### Location not working
- Grant location permissions when prompted
- App will use default Accra location if permission denied

### Dependencies installation fails
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Metro bundler issues
```bash
# Reset Metro bundler cache
npx expo start -c
```

## Features at a Glance

✅ **8 Artisan Categories**: Mason, Carpenter, Plumber, Painter, Electrician, Welder, Tiler, Mechanic

✅ **GPS-Based Search**: Find artisans near your location

✅ **Artisan Profiles**: View ratings, experience, portfolio

✅ **Direct Calling**: One-tap calling feature

✅ **Availability Status**: See who's available right now

✅ **Simple Registration**: Easy sign-up for artisans

✅ **Mobile-First**: Optimized for Ghanaian mobile users

## What's Next?

This is a functional prototype. Future versions will include:
- Backend API integration
- User authentication
- Real-time notifications
- In-app messaging
- Payment integration
- Review system
- Job tracking
- Multi-language support

## Need Help?

- Check the [README.md](README.md) for project overview
- Read [DEVELOPMENT.md](DEVELOPMENT.md) for technical details
- Open an issue on GitHub for bugs or questions

---

**WorkManGH** - Connecting skilled artisans with customers who need them! 🔧🎨🔌
