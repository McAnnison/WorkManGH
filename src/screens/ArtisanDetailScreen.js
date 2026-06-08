import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { 
  Text, 
  Button, 
  Card, 
  Avatar, 
  IconButton, 
  List, 
  Divider,
  Surface,
  Badge
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../theme';

export default function ArtisanDetailScreen({ route, navigation }) {
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
      'Your request has been sent! The artisan will provide a quote shortly.',
      [{ text: 'Great!' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton 
          icon="arrow-left" 
          size={24} 
          onPress={() => navigation.goBack()} 
          iconColor={COLORS.primary}
          style={styles.backButton}
        />
        <Text variant="titleLarge" style={styles.headerTitle}>Profile</Text>
        <IconButton 
          icon="share-variant-outline" 
          size={24} 
          onPress={() => {}} 
          iconColor={COLORS.primary}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <Surface style={styles.profileCard} elevation={0}>
          <Avatar.Text 
            size={100} 
            label={artisan.name.charAt(0)} 
            backgroundColor={COLORS.primary} 
          />
          {artisan.available && (
            <Badge style={styles.onlineBadge} size={16}>ONLINE</Badge>
          )}
          <Text variant="headlineMedium" style={styles.name}>{artisan.name}</Text>
          <Text variant="bodyLarge" style={styles.category}>
            {artisan.category.toUpperCase()}
          </Text>
          
          <View style={styles.ratingRow}>
            <MaterialIcons name="star" size={24} color={COLORS.accent} />
            <Text variant="headlineSmall" style={styles.ratingText}>{artisan.rating}</Text>
            <Text variant="bodyMedium" style={styles.reviewText}>({artisan.reviewCount} reviews)</Text>
          </View>
        </Surface>

        {/* Quick Info Grid */}
        <View style={styles.infoGrid}>
          <Card style={styles.infoCard} mode="contained">
            <Card.Content style={styles.infoCardContent}>
              <MaterialIcons name="work-outline" size={24} color={COLORS.primary} />
              <Text variant="titleMedium" style={styles.infoValue}>{artisan.experience} yrs</Text>
              <Text variant="labelSmall" style={styles.infoLabel}>Experience</Text>
            </Card.Content>
          </Card>
          <Card style={styles.infoCard} mode="contained">
            <Card.Content style={styles.infoCardContent}>
              <MaterialIcons name="near-me" size={24} color={COLORS.primary} />
              <Text variant="titleMedium" style={styles.infoValue}>
                {artisan.distance ? `${artisan.distance.toFixed(1)} km` : 'N/A'}
              </Text>
              <Text variant="labelSmall" style={styles.infoLabel}>Distance</Text>
            </Card.Content>
          </Card>
          <Card style={styles.infoCard} mode="contained">
            <Card.Content style={styles.infoCardContent}>
              <MaterialIcons name="verified-user" size={24} color={COLORS.success} />
              <Text variant="titleMedium" style={[styles.infoValue, { color: COLORS.success }]}>Verified</Text>
              <Text variant="labelSmall" style={styles.infoLabel}>Identity</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Details List */}
        <List.Section style={styles.listSection}>
          <List.Item
            title="Location"
            description={artisan.location.address}
            left={props => <List.Icon {...props} icon="map-marker-outline" color={COLORS.primary} />}
            style={styles.listItem}
          />
          <Divider />
          <List.Item
            title="Phone"
            description={artisan.phone}
            left={props => <List.Icon {...props} icon="phone-outline" color={COLORS.primary} />}
            style={styles.listItem}
          />
        </List.Section>

        {/* About Section */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>About</Text>
          <Text variant="bodyMedium" style={styles.bioText}>
            {artisan.bio || "No description provided yet."}
          </Text>
        </View>

        {/* Portfolio Section */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Portfolio</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.portfolioScroll}>
            {[1, 2, 3].map((i) => (
              <Surface key={i} style={styles.portfolioPlaceholder} elevation={1}>
                <MaterialCommunityIcons name="image-outline" size={32} color={COLORS.border} />
              </Surface>
            ))}
          </ScrollView>
        </View>

        <View style={styles.footerSpacer} />
      </ScrollView>

      {/* Action Footer */}
      <Surface style={styles.actionFooter} elevation={4}>
        <Button 
          mode="outlined" 
          onPress={handleCallArtisan}
          style={styles.callButton}
          contentStyle={styles.buttonContent}
          textColor={COLORS.primary}
          icon="phone"
        >
          Call
        </Button>
        <Button 
          mode="contained" 
          onPress={handleSendRequest}
          style={styles.requestButton}
          contentStyle={styles.buttonContent}
          disabled={!artisan.available}
        >
          {artisan.available ? 'Book Now' : 'Currently Busy'}
        </Button>
      </Surface>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingHorizontal: SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  content: {
    padding: SPACING.m,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: SPACING.l,
    backgroundColor: 'transparent',
  },
  onlineBadge: {
    backgroundColor: COLORS.success,
    marginTop: -10,
    fontWeight: 'bold',
  },
  name: {
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: SPACING.m,
  },
  category: {
    color: COLORS.textSecondary,
    letterSpacing: 2,
    fontWeight: '600',
    marginTop: SPACING.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.m,
  },
  ratingText: {
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: SPACING.s,
  },
  reviewText: {
    marginLeft: SPACING.s,
    color: COLORS.textSecondary,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACING.l,
  },
  infoCard: {
    flex: 0.31,
    backgroundColor: '#FFF',
    borderRadius: BORDER_RADIUS.m,
  },
  infoCardContent: {
    alignItems: 'center',
    paddingVertical: SPACING.m,
  },
  infoValue: {
    fontWeight: 'bold',
    marginTop: SPACING.xs,
  },
  infoLabel: {
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  listSection: {
    backgroundColor: '#FFF',
    borderRadius: BORDER_RADIUS.l,
    overflow: 'hidden',
    marginBottom: SPACING.l,
  },
  listItem: {
    paddingVertical: SPACING.s,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.m,
  },
  bioText: {
    lineHeight: 24,
    color: COLORS.text,
  },
  portfolioScroll: {
    marginTop: SPACING.s,
  },
  portfolioPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#F1F5F9',
    borderRadius: BORDER_RADIUS.m,
    marginRight: SPACING.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerSpacer: {
    height: 100,
  },
  actionFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: SPACING.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  callButton: {
    flex: 0.35,
    borderRadius: BORDER_RADIUS.m,
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  requestButton: {
    flex: 0.6,
    borderRadius: BORDER_RADIUS.m,
    backgroundColor: COLORS.primary,
  },
  buttonContent: {
    height: 52,
  },
});
