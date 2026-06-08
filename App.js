import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, MD3LightTheme, configureFonts } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import CategorySelectionScreen from './src/screens/CategorySelectionScreen';
import ArtisanListScreen from './src/screens/ArtisanListScreen';
import ArtisanDetailScreen from './src/screens/ArtisanDetailScreen';
import ArtisanRegistrationScreen from './src/screens/ArtisanRegistrationScreen';
import ArtisanProfileScreen from './src/screens/ArtisanProfileScreen';
import ArtisanDashboardScreen from './src/screens/ArtisanDashboardScreen';
import UserDashboardScreen from './src/screens/UserDashboardScreen';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import IdentityVerificationScreen from './src/screens/IdentityVerificationScreen';
import { COLORS } from './src/theme';

const Stack = createStackNavigator();

// Configure the Paper theme to match WorkMan Elite brand
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primary,
    secondary: COLORS.accent,
    tertiary: COLORS.success,
    error: COLORS.error,
    background: COLORS.background,
    surface: COLORS.card,
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'WorkManGH' }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ title: 'Sign In' }}
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen}
            options={{ title: 'Create Account' }}
          />
          <Stack.Screen 
            name="UserDashboard" 
            component={UserDashboardScreen}
            options={{ title: 'WorkManGH' }}
          />
          <Stack.Screen 
            name="CategorySelection" 
            component={CategorySelectionScreen}
            options={{ title: 'Find Artisan' }}
          />
          <Stack.Screen 
            name="ArtisanList" 
            component={ArtisanListScreen}
            options={{ title: ' Available Artisans' }}
          />
          <Stack.Screen 
            name="ArtisanDetail" 
            component={ArtisanDetailScreen}
            options={{ title: 'Artisan Profile' }}
          />
          <Stack.Screen 
            name="ArtisanRegistration" 
            component={ArtisanRegistrationScreen}
            options={{ title: 'Register as Artisan' }}
          />
          <Stack.Screen 
            name="ArtisanProfile" 
            component={ArtisanProfileScreen}
            options={{ title: 'My Profile' }}
          />
          <Stack.Screen 
            name="ArtisanDashboard" 
            component={ArtisanDashboardScreen}
            options={{ title: 'Artisan Dashboard', headerLeft: null }}
          />
          <Stack.Screen 
            name="IdentityVerification" 
            component={IdentityVerificationScreen}
            options={{ title: 'Verify Identity' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
