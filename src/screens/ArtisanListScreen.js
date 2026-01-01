import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import { getNearbyArtisans } from '../data/artisanData';

export default function ArtisanListScreen({ route, navigation }) {
  const { category } = route.params;
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    loadArtisans();
  }, []);

  const loadArtisans = async () => {
    try {
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission',
          'Permission to access location was denied. Showing all artisans without distance sorting.',
          [{ text: 'OK' }]
        );
        // Use default location (Accra center)
        const defaultLocation = { latitude: 5.6037, longitude: -0.1870 };
        setLocation(defaultLocation);
        loadNearbyArtisans(defaultLocation);
        return;
      }

      // Get current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      const userLocation = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      
      setLocation(userLocation);
      loadNearbyArtisans(userLocation);
    } catch (error) {
      console.error('Error loading location:', error);
      // Use default location
      const defaultLocation = { latitude: 5.6037, longitude: -0.1870 };
      setLocation(defaultLocation);
      loadNearbyArtisans(defaultLocation);
    }
  };

  const loadNearbyArtisans = (userLocation) => {
    const nearbyArtisans = getNearbyArtisans(
      category.id,
      userLocation.latitude,
      userLocation.longitude
    );
    setArtisans(nearbyArtisans);
    setLoading(false);
  };

  const renderArtisan = (artisan) => (
    <TouchableOpacity
      key={artisan.id}
      style={styles.artisanCard}
      onPress={() => navigation.navigate('ArtisanDetail', { artisan })}
    >
      <View style={styles.artisanHeader}>
        <View style={styles.profilePlaceholder}>
          <Text style={styles.profileInitial}>
            {artisan.name.charAt(0)}
          </Text>
        </View>
        <View style={styles.artisanInfo}>
          <Text style={styles.artisanName}>{artisan.name}</Text>
          <Text style={styles.artisanLocation}>
            📍 {artisan.location.address}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {artisan.rating}</Text>
            <Text style={styles.reviews}>({artisan.reviewCount} reviews)</Text>
          </View>
        </View>
      </View>

      <View style={styles.artisanDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Experience</Text>
          <Text style={styles.detailValue}>{artisan.experience} years</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Distance</Text>
          <Text style={styles.detailValue}>
            {artisan.distance ? `${artisan.distance.toFixed(1)} km` : 'N/A'}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Status</Text>
          <Text style={[
            styles.detailValue,
            artisan.available ? styles.available : styles.busy
          ]}>
            {artisan.available ? 'Available' : 'Busy'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Finding artisans near you...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          {category.icon} {category.name}s Near You
        </Text>
        
        {artisans.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No {category.name.toLowerCase()}s found in your area
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.resultCount}>
              Found {artisans.length} {category.name.toLowerCase()}
              {artisans.length !== 1 ? 's' : ''}
            </Text>
            {artisans.map(renderArtisan)}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  resultCount: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  artisanCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  artisanHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  profilePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  artisanInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  artisanName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  artisanLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginRight: 6,
  },
  reviews: {
    fontSize: 12,
    color: '#666',
  },
  artisanDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  available: {
    color: '#4ECDC4',
  },
  busy: {
    color: '#FF6B35',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
