# Software Requirements Specification (SRS) - WorkManGH

## 1. Introduction
### 1.1 Purpose
This document provides a detailed description of the requirements for the WorkManGH mobile application. It defines the functional and non-functional requirements for the artisan marketplace and locator platform.

### 1.2 Scope
WorkManGH is a React Native mobile application built with Expo, specifically targeted at the Ghanaian market. It connects skilled local artisans with customers using GPS-based location services. The application simplifies finding reliable manual labor through proximity sorting and direct phone communication.

### 1.3 Definitions, Acronyms, and Abbreviations
- **GPS**: Global Positioning System.
- **Artisan**: A skilled manual worker (e.g., Plumber, Electrician).
- **Expo**: A framework for universal React applications.
- **MVP**: Minimum Viable Product.

## 2. Overall Description
### 2.1 Product Perspective
WorkManGH is a standalone mobile-first application designed to bridge the gap between informal skilled labor and local consumers. It is built using React Native 0.81.5 and Expo 54.0.0.

### 2.2 Product Features
- **Categorized Discovery**: 8 core artisan categories (Mason, Carpenter, Plumber, Painter, Electrician, Welder, Tiler, Mechanic).
- **GPS-Based Search**: Real-time distance calculation and sorting of artisans relative to the user's location.
- **Detailed Profiles**: Displays experience, ratings, reviews, and bio information.
- **Availability Management**: Real-time "Available" vs "Busy" status toggle for artisans.
- **Direct Calling**: One-tap phone integration for instant connection.
- **Artisan Onboarding**: Simplified registration flow for service providers.

### 2.3 User Classes and Characteristics
- **Customers**: Individuals needing artisan services. They value speed, proximity, and ease of contact.
- **Artisans**: Manual workers looking for job opportunities. They require a simple interface to manage their digital visibility.

### 2.4 Design and Implementation Constraints
- **Platforms**: Android (5.0+) and iOS (12+).
- **Localization**: Focused on Ghanaian phone formats and local regions (e.g., Accra, Tema).
- **Connectivity**: Requires internet access for location services and future backend sync.

## 3. System Features

### 3.1 Customer Journey
- **REQ-1: Category Selection**: The system shall present a grid of 8 artisan types.
- **REQ-2: Proximity Sorting**: The system shall calculate distances using the Haversine formula and sort the artisan list with the nearest provider first.
- **REQ-3: Profile Transparency**: The system shall display the artisan's years of experience and aggregate rating.
- **REQ-4: Native Dialer Integration**: The system shall initiate phone calls via the device dialer upon user confirmation.

### 3.2 Artisan Journey
- **REQ-5: Simplified Registration**: The system shall allow artisans to register with basic info (Name, Phone, Trade, Exp).
- **REQ-6: Input Validation**: The system shall validate Ghanaian phone numbers (+233 or 0 prefixes) and numeric experience values.
- **REQ-7: Status Control**: Artisans shall have a global switch to set their availability, which visually updates their profile for customers.
- **REQ-8: Portfolio Placeholder**: The system shall provide a section for future image uploads of past work.

## 4. External Interface Requirements
### 4.1 User Interfaces
- **Navigation Flow**: Home Screen -> Category Selection -> Artisan List -> Artisan Detail.
- **Visual Design**: High contrast orange/teal theme (#FF6B35, #4ECDC4) for accessibility.
- **Icons**: Universal Emoji characters for trade recognition.

### 4.2 Software Interfaces
- **expo-location**: Used for coordinate retrieval and permission handling.
- **expo-linking**: Used for deep-linking into the device's telephony system.
- **React Navigation**: Handles stack-based state management.

## 5. Non-functional Requirements
### 5.1 Performance
- Distance calculations for the nearby artisan list must occur locally to ensure instantaneous sorting.
- The application bundle should remain lightweight by minimizing external library dependencies.

### 5.2 Security
- **Privacy**: GPS coordinates are used for transient calculation and should not be stored permanently in the MVP.
- **Verification**: All calls must be preceded by a confirmation Alert to prevent accidental dialing.

### 5.3 Reliability
- **Location Fallback**: If GPS permissions are denied, the system shall default to Accra coordinates (5.6037, -0.1870) to allow limited functionality.

### 5.4 Maintainability
- Modular data layer (`artisanData.js`) allows for easy replacement of sample data with real API calls in future versions.