import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, ActivityIndicator, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your actual local IP address (e.g., 192.168.1.5)
const API_URL = 'http://YOUR_API_URL:3000';

const ArtisanDashboardScreen = () => {
  const [loading, setLoading] = useState(true);
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

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.welcome}>Welcome, {profile?.user?.name}!</Text>
        <Text style={styles.role}>Registered {profile?.category?.name}</Text>
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
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 20 },
  welcome: { fontSize: 22, fontWeight: 'bold', color: '#0B3A6A' },
  role: { fontSize: 16, color: '#666', marginTop: 5 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 10 },
  statusText: { fontSize: 16, fontWeight: '600' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  statBox: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '48%', alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#0B3A6A' },
  statLabel: { color: '#666' }
});

export default ArtisanDashboardScreen;