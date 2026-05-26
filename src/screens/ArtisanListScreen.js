import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import * as Location from 'expo-location';
import { getNearbyArtisans } from '../data/artisanData';

export default function ArtisanListScreen({ route, navigation }) {
  const { category } = route.params;
  const categoryLabel = category.pluralName || `${category.name}s`;
  const categoryLabelLower = categoryLabel.toLowerCase();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [bannerMessage, setBannerMessage] = useState('');
  const defaultLocation = { latitude: 5.6037, longitude: -0.1870 };
  const contentAnim = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef([]);

  useEffect(() => {
    loadArtisans();
    Animated.timing(contentAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (!artisans.length) {
      return;
    }

    const animations = artisans.map((_, index) => {
      if (!cardAnims.current[index]) {
        cardAnims.current[index] = new Animated.Value(0);
      }
      cardAnims.current[index].setValue(0);
      return cardAnims.current[index];
    });

    Animated.stagger(
      70,
      animations.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 320,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [artisans]);

  const useDefaultLocation = (message) => {
    if (message) {
      setBannerMessage(message);
    }
    setLocation(defaultLocation);
    loadNearbyArtisans(defaultLocation);
  };

  const loadArtisans = async () => {
    try {
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        // Use default location (Accra center)
        useDefaultLocation(
          'Location permission was denied. Showing artisans without distance sorting.'
        );
        return;
      }

      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        useDefaultLocation(
          'Location services are unavailable. Using default location.'
        );
        return;
      }

      // Get current location
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 10000,
      });
      const userLocation = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      
      setLocation(userLocation);
      setBannerMessage('');
      loadNearbyArtisans(userLocation);
    } catch (error) {
      const message = error?.message || 'Unable to access current location.';
      console.warn('Location unavailable:', message);
      useDefaultLocation(message);
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
        <ActivityIndicator size="large" color="#0B3A6A" />
        <Text style={styles.loadingText}>Finding artisans near you...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View
          style={[
            styles.contentInner,
            {
              opacity: contentAnim,
              transform: [
                {
                  translateY: contentAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {bannerMessage ? (
            <View style={styles.banner}>
              <Text style={styles.bannerText}>{bannerMessage}</Text>
            </View>
          ) : null}
          <Text style={styles.title}>
            {category.icon} {categoryLabel} Near You
          </Text>
          
          {artisans.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No {categoryLabelLower} found in your area
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.resultCount}>
                Found {artisans.length} {categoryLabelLower}
              </Text>
              {artisans.map((artisan, index) => {
                const anim = cardAnims.current[index] || new Animated.Value(1);
                return (
                  <Animated.View
                    key={artisan.id}
                    style={{
                      opacity: anim,
                      transform: [
                        {
                          translateY: anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [10, 0],
                          }),
                        },
                      ],
                    }}
                  >
                    {renderArtisan(artisan)}
                  </Animated.View>
                );
              })}
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2F8',
  },
  content: {
    padding: 20,
  },
  contentInner: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF2F8',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#3B4A66',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B1F3B',
    marginBottom: 16,
  },
  resultCount: {
    fontSize: 16,
    color: '#3B4A66',
    marginBottom: 12,
  },
  banner: {
    backgroundColor: '#E8F1FF',
    borderColor: '#9DB7E3',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  bannerText: {
    color: '#0B3A6A',
    fontSize: 13,
    lineHeight: 18,
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
    backgroundColor: '#0B3A6A',
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
    color: '#0B1F3B',
    marginBottom: 4,
  },
  artisanLocation: {
    fontSize: 14,
    color: '#3B4A66',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F4C81',
    marginRight: 6,
  },
  reviews: {
    fontSize: 12,
    color: '#3B4A66',
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
    color: '#3B4A66',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0B1F3B',
  },
  available: {
    color: '#1F9D8B',
  },
  busy: {
    color: '#1D4ED8',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#3B4A66',
    textAlign: 'center',
  },
});
