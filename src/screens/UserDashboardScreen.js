import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../config/api';
import { MaterialIcons } from '@expo/vector-icons';

// TODO: Move API_URL to a separate config file or environment variable

const UserDashboardScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchUserDashboardData();
  }, []);

  const fetchUserDashboardData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/api/users/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setUserProfile(data);
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
    await fetchUserDashboardData();
    setRefreshing(false);
  }, []);

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

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0B3A6A']} />
      }
    >
      <View style={styles.card}>
        {userProfile?.profileImage ? (
          <Image source={{ uri: userProfile.profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileInitial}>{userProfile?.name?.charAt(0) || '?'}</Text>
          </View>
        )}
        <Text style={styles.welcome}>Welcome, {userProfile?.name}!</Text>
        <Text style={styles.role}>User Account</Text>
        <TouchableOpacity style={styles.manageProfileButton} onPress={() => Alert.alert('Feature Coming Soon', 'Edit profile functionality will be available in a future update.')}>
          <MaterialIcons name="edit" size={18} color="#0B3A6A" />
          <Text style={styles.manageProfileButtonText}>Manage Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoCard}>
          <MaterialIcons name="phone" size={20} color="#0B3A6A" />
          <Text style={styles.infoText}>{userProfile?.phone || 'N/A'}</Text>
        </View>
        <View style={styles.infoCard}>
          <MaterialIcons name="email" size={20} color="#0B3A6A" />
          <Text style={styles.infoText}>{userProfile?.email || 'N/A'}</Text>
        </View>
      </View>

      {/* Placeholder for Recent Job Requests or other user-specific features */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Recent Job Requests</Text>
        <Text style={styles.emptyText}>No job requests yet.</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={20} color="#FF3B30" />
        <Text style={styles.logoutText}>Logout from Account</Text>
      </TouchableOpacity>
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
  manageProfileButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F1FF', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  manageProfileButtonText: { marginLeft: 5, color: '#0B3A6A', fontWeight: 'bold' },
  infoSection: { backgroundColor: '#fff', borderRadius: 10, marginBottom: 20, padding: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0B3A6A', marginBottom: 10 },
  infoCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  infoText: { marginLeft: 10, fontSize: 16, color: '#333' },
  emptyText: { fontSize: 14, color: '#666', textAlign: 'center', fontStyle: 'italic' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20 },
  logoutText: { color: '#FF3B30', fontWeight: 'bold', marginLeft: 10, fontSize: 16 },
});

export default UserDashboardScreen;