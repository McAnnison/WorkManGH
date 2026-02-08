import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';

export default function ArtisanProfileScreen({ navigation }) {
  // Sample artisan data (in a real app, this would come from auth/storage)
  const [artisan, setArtisan] = useState({
    id: '1',
    name: 'Kwame Mensah',
    category: 'plumber',
    phone: '+233244123456',
    experience: 8,
    rating: 4.7,
    reviewCount: 45,
    location: {
      latitude: 5.6037,
      longitude: -0.1870,
      address: 'Accra, Greater Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Expert plumber with 8 years experience in residential and commercial plumbing.'
  });

  const toggleAvailability = () => {
    const newStatus = !artisan.available;
    setArtisan({ ...artisan, available: newStatus });
    Alert.alert(
      'Status Updated',
      `You are now marked as ${newStatus ? 'Available' : 'Busy'}`,
      [{ text: 'OK' }]
    );
  };

  const handleEditProfile = () => {
    Alert.alert(
      'Edit Profile',
      'Profile editing would be available in the full version',
      [{ text: 'OK' }]
    );
  };

  const handleManagePhotos = () => {
    Alert.alert(
      'Manage Photos',
      'Photo management would be available in the full version',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileSection}>
          <View style={styles.profilePlaceholder}>
            <Text style={styles.profileInitial}>
              {artisan.name.charAt(0)}
            </Text>
          </View>
          <Text style={styles.name}>{artisan.name}</Text>
          <Text style={styles.category}>{artisan.category.toUpperCase()}</Text>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {artisan.rating}</Text>
            <Text style={styles.reviews}>({artisan.reviewCount} reviews)</Text>
          </View>
        </View>

        {/* Availability Toggle */}
        <View style={styles.availabilitySection}>
          <View style={styles.availabilityHeader}>
            <Text style={styles.sectionTitle}>Availability Status</Text>
            <Switch
              value={artisan.available}
              onValueChange={toggleAvailability}
              trackColor={{ false: '#9AA6B2', true: '#0B3A6A' }}
              thumbColor={artisan.available ? '#FFF' : '#f4f3f4'}
            />
          </View>
          <Text style={styles.availabilityText}>
            {artisan.available 
              ? '✓ You are currently available for work'
              : '● You are marked as busy'}
          </Text>
          <Text style={styles.availabilityNote}>
            Toggle this when you're available or busy to let customers know your status
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{artisan.experience}</Text>
            <Text style={styles.statLabel}>Years Experience</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{artisan.reviewCount}</Text>
            <Text style={styles.statLabel}>Total Reviews</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{artisan.rating}</Text>
            <Text style={styles.statLabel}>Average Rating</Text>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📞</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{artisan.phone}</Text>
            </View>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📍</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{artisan.location.address}</Text>
            </View>
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.bioSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{artisan.bio}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.actionButtonText}>✏️ Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleManagePhotos}
          >
            <Text style={styles.actionButtonText}>📷 Manage Photos</Text>
          </TouchableOpacity>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Tips for Success</Text>
          <Text style={styles.tipText}>
            • Keep your availability status updated
          </Text>
          <Text style={styles.tipText}>
            • Upload photos of your best work to attract customers
          </Text>
          <Text style={styles.tipText}>
            • Respond quickly to calls and job requests
          </Text>
          <Text style={styles.tipText}>
            • Provide excellent service to get good reviews
          </Text>
        </View>
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
  profileSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profilePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0B3A6A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInitial: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B1F3B',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#3B4A66',
    marginBottom: 12,
    letterSpacing: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F4C81',
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: '#3B4A66',
  },
  availabilitySection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  availabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B1F3B',
  },
  availabilityText: {
    fontSize: 16,
    color: '#0B1F3B',
    marginBottom: 8,
  },
  availabilityNote: {
    fontSize: 12,
    color: '#3B4A66',
    fontStyle: 'italic',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B3A6A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#3B4A66',
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  infoCard: {
    flexDirection: 'row',
    marginTop: 12,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#3B4A66',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B1F3B',
  },
  bioSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  bioText: {
    fontSize: 14,
    color: '#3B4A66',
    lineHeight: 20,
    marginTop: 8,
  },
  actionSection: {
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#0B3A6A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  tipsSection: {
    backgroundColor: '#E8F1FF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#9DB7E3',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B1F3B',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#3B4A66',
    marginBottom: 8,
    lineHeight: 20,
  },
});
