import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { 
  Text, 
  Card, 
  Avatar, 
  IconButton, 
  ActivityIndicator,
  Searchbar,
  Chip,
  Surface,
  Divider,
  Button
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getNearbyArtisans } from '../data/artisanData';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../theme';

export default function ArtisanListScreen({ route, navigation }) {
  const { category } = route.params;
  const categoryLabel = category.pluralName || `${category.name}s`;
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [bannerMessage, setBannerMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const defaultLocation = { latitude: 5.6037, longitude: -0.1870 };
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadArtisans();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const useDefaultLocation = (message) => {
    if (message) setBannerMessage(message);
    setLocation(defaultLocation);
    loadNearbyArtisans(defaultLocation);
  };

  const loadArtisans = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        useDefaultLocation('Using default location (Accra). Enable GPS for better results.');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 10000,
      });
      const userLocation = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      
      setLocation(userLocation);
      loadNearbyArtisans(userLocation);
    } catch (error) {
      useDefaultLocation('Location unavailable. Showing artisans near Accra.');
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

  const filteredArtisans = artisans.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderArtisanCard = (artisan) => (
    <Card 
      key={artisan.id}
      style={styles.artisanCard} 
      mode="elevated"
      onPress={() => navigation.navigate('ArtisanDetail', { artisan })}
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Avatar.Text 
            size={56} 
            label={artisan.name.charAt(0)} 
            backgroundColor={COLORS.primary} 
          />
          <View style={styles.headerInfo}>
            <View style={styles.nameRow}>
              <Text variant="titleLarge" style={styles.artisanName}>{artisan.name}</Text>
              {artisan.available && (
                <View style={styles.onlineDot} />
              )}
            </View>
            <View style={styles.locationRow}>
              <MaterialIcons name="location-on" size={14} color={COLORS.textSecondary} />
              <Text variant="bodySmall" style={styles.locationText}>{artisan.location.address}</Text>
            </View>
            <View style={styles.ratingRow}>
              <MaterialIcons name="star" size={16} color={COLORS.accent} />
              <Text variant="labelLarge" style={styles.ratingText}>{artisan.rating}</Text>
              <Text variant="bodySmall" style={styles.reviewText}>({artisan.reviewCount} reviews)</Text>
            </View>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.cardStats}>
          <View style={styles.statItem}>
            <Text variant="labelSmall" style={styles.statLabel}>EXPERIENCE</Text>
            <Text variant="titleMedium" style={styles.statValue}>{artisan.experience} yrs</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statItem}>
            <Text variant="labelSmall" style={styles.statLabel}>DISTANCE</Text>
            <Text variant="titleMedium" style={styles.statValue}>
              {artisan.distance ? `${artisan.distance.toFixed(1)} km` : 'N/A'}
            </Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statItem}>
            <Text variant="labelSmall" style={styles.statLabel}>STATUS</Text>
            <Text variant="titleMedium" style={[
              styles.statValue, 
              { color: artisan.available ? COLORS.success : COLORS.primary }
            ]}>
              {artisan.available ? 'Available' : 'Busy'}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Locating nearest {categoryLabel}...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <IconButton 
            icon="arrow-left" 
            size={24} 
            onPress={() => navigation.goBack()} 
            iconColor={COLORS.primary}
          />
          <Text variant="headlineSmall" style={styles.headerTitle}>{category.icon} {categoryLabel}</Text>
        </View>
        
        <Searchbar
          placeholder={`Search ${categoryLabelLower}...`}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={0}
        />
        
        {bannerMessage ? (
          <Surface style={styles.banner} elevation={0}>
            <MaterialIcons name="info-outline" size={16} color={COLORS.primary} />
            <Text variant="bodySmall" style={styles.bannerText}>{bannerMessage}</Text>
          </Surface>
        ) : null}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {filteredArtisans.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Avatar.Icon size={80} icon="account-search-outline" backgroundColor="transparent" color={COLORS.placeholder} />
              <Text variant="bodyLarge" style={styles.emptyText}>No {categoryLabel.toLowerCase()} found.</Text>
              <Button mode="text" onPress={() => setSearchQuery('')}>Clear Search</Button>
            </View>
          ) : (
            filteredArtisans.map(renderArtisanCard)
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: '#FFF',
    paddingBottom: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: SPACING.m,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  searchBar: {
    marginHorizontal: SPACING.m,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.m,
    height: 48,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F1FF',
    marginHorizontal: SPACING.m,
    marginTop: SPACING.m,
    padding: SPACING.s,
    borderRadius: BORDER_RADIUS.s,
  },
  bannerText: {
    marginLeft: SPACING.xs,
    color: COLORS.primary,
  },
  scrollContent: {
    padding: SPACING.m,
  },
  artisanCard: {
    backgroundColor: '#FFF',
    borderRadius: BORDER_RADIUS.l,
    marginBottom: SPACING.m,
  },
  cardContent: {
    paddingVertical: SPACING.m,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    marginLeft: SPACING.m,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artisanName: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    marginLeft: SPACING.s,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    marginLeft: 2,
    color: COLORS.textSecondary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  reviewText: {
    marginLeft: 4,
    color: COLORS.textSecondary,
  },
  divider: {
    marginVertical: SPACING.m,
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    color: COLORS.textSecondary,
    letterSpacing: 1,
    fontSize: 10,
  },
  statValue: {
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 2,
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.border,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: SPACING.m,
    color: COLORS.textSecondary,
  },
  emptyContainer: {
    padding: SPACING.xxl,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: SPACING.m,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
