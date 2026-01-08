import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';

export default function ArtisanDetailScreen({ route }) {
  const { artisan } = route.params;

  const handleCallArtisan = () => {
    Alert.alert(
      'Call Artisan',
      `Do you want to call ${artisan.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL(`tel:${artisan.phone}`);
          },
        },
      ]
    );
  };

  const handleSendRequest = () => {
    Alert.alert(
      'Job Request',
      'In a full version, this would send a job request notification to the artisan.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Section */}
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

          <View style={[
            styles.statusBadge,
            artisan.available ? styles.availableBadge : styles.busyBadge
          ]}>
            <Text style={styles.statusText}>
              {artisan.available ? '✓ Available' : '● Busy'}
            </Text>
          </View>
        </View>

        {/* Info Cards */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📍</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{artisan.location.address}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📞</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>{artisan.phone}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💼</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Experience</Text>
              <Text style={styles.infoValue}>{artisan.experience} years</Text>
            </View>
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.bioSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{artisan.bio}</Text>
        </View>

        {/* Portfolio Section */}
        <View style={styles.portfolioSection}>
          <Text style={styles.sectionTitle}>Portfolio</Text>
          {artisan.portfolio.length === 0 ? (
            <Text style={styles.emptyText}>No portfolio photos yet</Text>
          ) : (
            <View style={styles.portfolioGrid}>
              {/* Portfolio images would be displayed here */}
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={[styles.actionButton, styles.callButton]}
            onPress={handleCallArtisan}
          >
            <Text style={styles.actionButtonText}>📞 Call Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.requestButton]}
            onPress={handleSendRequest}
            disabled={!artisan.available}
          >
            <Text style={styles.actionButtonText}>Send Job Request</Text>
          </TouchableOpacity>
        </View>

        {!artisan.available && (
          <Text style={styles.unavailableNote}>
            This artisan is currently busy. You can still call to schedule for later.
          </Text>
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
    backgroundColor: '#FF6B35',
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
    color: '#333',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    letterSpacing: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  availableBadge: {
    backgroundColor: '#E8F8F5',
  },
  busyBadge: {
    backgroundColor: '#FADBD8',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  infoSection: {
    marginBottom: 16,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
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
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  portfolioSection: {
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
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionSection: {
    marginBottom: 16,
  },
  actionButton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  callButton: {
    backgroundColor: '#4ECDC4',
  },
  requestButton: {
    backgroundColor: '#FF6B35',
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  unavailableNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
