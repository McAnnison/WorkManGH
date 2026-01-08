import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import CategorySelectionScreen from './src/screens/CategorySelectionScreen';
import ArtisanListScreen from './src/screens/ArtisanListScreen';
import ArtisanDetailScreen from './src/screens/ArtisanDetailScreen';
import ArtisanRegistrationScreen from './src/screens/ArtisanRegistrationScreen';
import ArtisanProfileScreen from './src/screens/ArtisanProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FF6B35',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
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
          options={{ title: 'Available Artisans' }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
