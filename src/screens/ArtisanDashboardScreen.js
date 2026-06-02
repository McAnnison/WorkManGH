import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, ActivityIndicator, Alert, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you have expo vector icons installed
// TODO: Move API_URL to a separate config file or environment variable
const API_URL = 'http://192.168.56.1:3000';

const ArtisanDashboardScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/api/artisans/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
      } else {
        Alert.alert('Error', data.error || 'Failed to load dashboard');
      }
    } catch (error) {
      Alert.alert('Error', 'Connection error');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  }, []);

  const toggleAvailability = async (value) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/api/artisans/availability`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ available: value }),
      });
      if (response.ok) {
        setProfile({ ...profile, available: value });
      }
    } catch (error) {
      Alert.alert('Error', 'Could not update status');
    }
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Logout', 
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('userToken');
          navigation.replace('Home');
        }
      },
    ]);
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0B3A6A']} />
      }
    >
      <View style={styles.card}>
        {profile?.user?.profileImage ? (
          <Image source={{ uri: profile.user.profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileInitial}>{profile?.user?.name?.charAt(0) || '?'}</Text>
          </View>
        )}
        <Text style={styles.welcome}>Welcome, {profile?.user?.name}!</Text>
        <Text style={styles.role}>Registered {profile?.category?.name}</Text>
        <Text style={styles.bio}>{profile?.bio || 'No bio provided yet.'}</Text>
        <TouchableOpacity style={styles.manageProfileButton} onPress={() => Alert.alert('Feature Coming Soon', 'Edit profile functionality will be available in a future update.')}>
          <MaterialIcons name="edit" size={18} color="#0B3A6A" />
          <Text style={styles.manageProfileButtonText}>Manage Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.statusText}>Current Status: {profile?.available ? 'Available' : 'Unavailable'}</Text>
        <Switch
          value={profile?.available}
          onValueChange={toggleAvailability}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={profile?.available ? '#0B3A6A' : '#f4f3f4'}
        />
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoCard}>
          <MaterialIcons name="phone" size={20} color="#0B3A6A" />
          <Text style={styles.infoText}>{profile?.user?.phone || 'N/A'}</Text>
        </View>
        <View style={styles.infoCard}>
          <MaterialIcons name="email" size={20} color="#0B3A6A" />
          <Text style={styles.infoText}>{profile?.user?.email || 'N/A'}</Text>
        </View>
        <View style={styles.infoCard}>
          <MaterialIcons name="location-on" size={20} color="#0B3A6A" />
          <Text style={styles.infoText}>{profile?.address || 'N/A'}</Text>
        </View>
      </View>

      {/* Placeholder for Recent Reviews or other artisan-specific features */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Recent Reviews</Text>
        <Text style={styles.emptyText}>No reviews yet.</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={20} color="#FF3B30" />
        <Text style={styles.logoutText}>Logout from Account</Text>
      </TouchableOpacity>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{profile?._count?.reviews || 0}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{profile?.experienceYears}</Text>
          <Text style={styles.statLabel}>Years Exp.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  contentContainer: { padding: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 20, alignItems: 'center' },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0B3A6A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileInitial: { fontSize: 40, fontWeight: 'bold', color: '#FFF' },
  welcome: { fontSize: 22, fontWeight: 'bold', color: '#0B3A6A', marginBottom: 5 },
  role: { fontSize: 16, color: '#666', marginBottom: 10 },
  bio: { fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 15 },
  manageProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F1FF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  manageProfileButtonText: { marginLeft: 5, color: '#0B3A6A', fontWeight: 'bold' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20 },
  statusText: { fontSize: 16, fontWeight: '600', color: '#333' },
  infoSection: { backgroundColor: '#fff', borderRadius: 10, marginBottom: 20, padding: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0B3A6A', marginBottom: 10 },
  infoCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  infoText: { marginLeft: 10, fontSize: 16, color: '#333' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 0 },
  statBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%', // Adjust width to fit two boxes with some spacing
  },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#0B3A6A' },
  statLabel: { color: '#666' },
  emptyText: { fontSize: 14, color: '#666', textAlign: 'center', fontStyle: 'italic' },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  logoutText: { color: '#FF3B30', fontWeight: 'bold', marginLeft: 10, fontSize: 16 },
});

export default ArtisanDashboardScreen;