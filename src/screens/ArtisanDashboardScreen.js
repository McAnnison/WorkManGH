import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Switch, 
  ActivityIndicator, 
  Alert, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  RefreshControl,
  SafeAreaView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../theme';

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
        // Fallback for demo purposes if backend isn't ready
        setProfile({
          user: { name: 'Artisan Name', phone: '+233...', email: 'artisan@example.com' },
          category: { name: 'Category' },
          bio: 'No bio provided yet.',
          available: true,
          experienceYears: 0,
          isVerified: false
        });
      }
    } catch (error) {
      // Mock data for development when server is offline
      setProfile({
        user: { name: 'Kwame Mensah', phone: '+233244123456', email: 'kwame@artisan.gh' },
        category: { name: 'Plumber' },
        bio: 'Expert plumber with 8 years experience in residential and commercial plumbing.',
        available: true,
        experienceYears: 8,
        isVerified: false
      });
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
      } else {
        setProfile({ ...profile, available: value }); // Optimistic update for demo
      }
    } catch (error) {
      setProfile({ ...profile, available: value }); // Optimistic update for demo
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

  if (loading) return <ActivityIndicator size="large" color={COLORS.primary} style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
        }
      >
        {/* Verification Prompt */}
        {!profile?.isVerified && (
          <TouchableOpacity 
            style={styles.verificationCard}
            onPress={() => navigation.navigate('IdentityVerification')}
          >
            <View style={styles.verificationHeader}>
              <MaterialIcons name="verified-user" size={24} color={COLORS.accent} />
              <Text style={[TYPOGRAPHY.h3, { color: '#FFF', marginLeft: SPACING.s }]}>Verify Your Identity</Text>
            </View>
            <Text style={[TYPOGRAPHY.bodySecondary, { color: '#E0E0E0', marginTop: SPACING.s }]}>
              Verified pros earn 3x more and appear first in search results. Start your Ghana Card verification now.
            </Text>
            <View style={styles.verificationAction}>
              <Text style={[TYPOGRAPHY.button, { color: COLORS.accent }]}>Get Verified →</Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.card}>
          {profile?.user?.profileImage ? (
            <Image source={{ uri: profile.user.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileInitial}>{profile?.user?.name?.charAt(0) || '?'}</Text>
              {profile?.isVerified && (
                <View style={styles.verifiedBadge}>
                  <MaterialIcons name="check-circle" size={20} color={COLORS.success} />
                </View>
              )}
            </View>
          )}
          <Text style={[TYPOGRAPHY.h2, { color: COLORS.primary }]}>{profile?.user?.name}</Text>
          <Text style={[TYPOGRAPHY.bodySecondary, { marginBottom: SPACING.m }]}>
            {profile?.category?.name} • {profile?.experienceYears} Years Exp.
          </Text>
          <Text style={[TYPOGRAPHY.body, styles.bio]}>{profile?.bio}</Text>
          <TouchableOpacity style={styles.manageProfileButton} onPress={() => Alert.alert('Feature Coming Soon', 'Edit profile functionality will be available in a future update.')}>
            <MaterialIcons name="edit" size={18} color={COLORS.primary} />
            <Text style={styles.manageProfileButtonText}>Manage Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusRow}>
          <View>
            <Text style={TYPOGRAPHY.h3}>Availability</Text>
            <Text style={TYPOGRAPHY.bodySecondary}>{profile?.available ? 'Accepting new jobs' : 'Currently busy'}</Text>
          </View>
          <Switch
            value={profile?.available}
            onValueChange={toggleAvailability}
            trackColor={{ false: '#767577', true: COLORS.success }}
            thumbColor={profile?.available ? '#FFF' : '#f4f3f4'}
          />
        </View>

        <View style={styles.infoSection}>
          <Text style={[TYPOGRAPHY.h3, { marginBottom: SPACING.m }]}>Business Info</Text>
          <View style={styles.infoCard}>
            <MaterialIcons name="phone" size={20} color={COLORS.primary} />
            <Text style={[TYPOGRAPHY.body, styles.infoText]}>{profile?.user?.phone || 'N/A'}</Text>
          </View>
          <View style={styles.infoCard}>
            <MaterialIcons name="location-on" size={20} color={COLORS.primary} />
            <Text style={[TYPOGRAPHY.body, styles.infoText]}>{profile?.address || 'N/A'}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={TYPOGRAPHY.h3}>Recent Reviews</Text>
            <TouchableOpacity>
              <Text style={[TYPOGRAPHY.caption, { color: COLORS.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.emptyText}>No reviews yet. Complete your first job to build reputation!</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  contentContainer: { padding: SPACING.m },
  verificationCard: {
    backgroundColor: COLORS.primary,
    padding: SPACING.l,
    borderRadius: BORDER_RADIUS.l,
    marginBottom: SPACING.l,
    ...SHADOWS.medium,
  },
  verificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationAction: {
    marginTop: SPACING.m,
    alignItems: 'flex-end',
  },
  card: { 
    backgroundColor: COLORS.card, 
    padding: SPACING.l, 
    borderRadius: BORDER_RADIUS.l, 
    marginBottom: SPACING.m, 
    alignItems: 'center',
    ...SHADOWS.light,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: SPACING.m,
  },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: SPACING.m },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.m,
    position: 'relative',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  profileInitial: { fontSize: 40, fontWeight: 'bold', color: '#FFF' },
  bio: { textAlign: 'center', marginBottom: SPACING.m, color: COLORS.textSecondary },
  manageProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F1FF',
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: BORDER_RADIUS.round,
  },
  manageProfileButtonText: { marginLeft: SPACING.xs, color: COLORS.primary, fontWeight: 'bold' },
  statusRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: COLORS.card, 
    padding: SPACING.l, 
    borderRadius: BORDER_RADIUS.l, 
    marginBottom: SPACING.m,
    ...SHADOWS.light,
  },
  infoSection: { 
    backgroundColor: COLORS.card, 
    borderRadius: BORDER_RADIUS.l, 
    marginBottom: SPACING.m, 
    padding: SPACING.l,
    ...SHADOWS.light,
  },
  infoCard: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.s },
  infoText: { marginLeft: SPACING.s },
  emptyText: { textAlign: 'center', fontStyle: 'italic', color: COLORS.textSecondary },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.m,
    borderRadius: BORDER_RADIUS.l,
    marginBottom: SPACING.xl,
    ...SHADOWS.light,
  },
  logoutText: { color: COLORS.error, fontWeight: 'bold', marginLeft: SPACING.s, fontSize: 16 },
});

export default ArtisanDashboardScreen;
