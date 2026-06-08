import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Text, 
  Searchbar, 
  Card, 
  Button, 
  IconButton, 
  Avatar,
  Surface
} from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../theme';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View>
            <Text variant="bodyMedium" style={{ color: COLORS.textSecondary }}>Welcome to</Text>
            <View style={styles.logoTextContainer}>
              <Text variant="headlineMedium" style={[styles.logoText, { color: COLORS.primary }]}>WorkMan</Text>
              <Text variant="headlineMedium" style={[styles.logoText, { color: COLORS.accent }]}>GH</Text>
            </View>
          </View>
          <IconButton
            icon="account-circle-outline"
            size={32}
            iconColor={COLORS.primary}
            onPress={() => navigation.navigate('Login')}
            style={styles.profileButton}
          />
        </View>

        {/* Search Bar */}
        <Searchbar
          placeholder="Plumber, Mason, Tiler..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          onIconPress={() => navigation.navigate('CategorySelection')}
          onPressIn={() => navigation.navigate('CategorySelection')}
          style={styles.searchBar}
          elevation={1}
        />

        {/* Hero Card */}
        <Card style={styles.heroCard} mode="contained">
          <Card.Content style={styles.heroContent}>
            <View style={styles.heroTextContainer}>
              <Text variant="headlineLarge" style={styles.heroTitle}>Find Skilled{'\n'}Artisans Nearby</Text>
              <Text variant="bodyMedium" style={styles.heroSubtitle}>
                Verified professionals for your home and business needs.
              </Text>
              <Button 
                mode="contained" 
                buttonColor={COLORS.accent}
                textColor={COLORS.primary}
                onPress={() => navigation.navigate('CategorySelection')}
                style={styles.heroButton}
                labelStyle={{ fontWeight: 'bold' }}
              >
                Book Now
              </Button>
            </View>
            <View style={styles.heroIconContainer}>
              <MaterialCommunityIcons name="tools" size={100} color="rgba(255,255,255,0.15)" />
            </View>
          </Card.Content>
        </Card>

        {/* Quick Categories */}
        <View style={styles.sectionHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>Top Categories</Text>
          <Button 
            mode="text" 
            compact 
            onPress={() => navigation.navigate('CategorySelection')}
            textColor={COLORS.primary}
          >
            View All
          </Button>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {[
            { id: 'plumber', name: 'Plumber', icon: 'wrench' },
            { id: 'electrician', name: 'Electrician', icon: 'flash' },
            { id: 'mason', name: 'Mason', icon: 'wall' },
            { id: 'carpenter', name: 'Carpenter', icon: 'saw-blade' },
          ].map((cat) => (
            <Surface key={cat.id} style={styles.categoryCard} elevation={1}>
              <TouchableOpacity 
                style={styles.categoryTouch}
                onPress={() => navigation.navigate('ArtisanList', { category: cat.id })}
              >
                <Avatar.Icon 
                  size={56} 
                  icon={cat.icon} 
                  backgroundColor="#E8F1FF" 
                  color={COLORS.primary} 
                />
                <Text variant="labelLarge" style={styles.categoryName}>{cat.name}</Text>
              </TouchableOpacity>
            </Surface>
          ))}
        </ScrollView>

        {/* Artisan CTA Card */}
        <Card style={styles.artisanCard} mode="contained">
          <Card.Content style={styles.artisanContent}>
            <View style={styles.artisanTextContainer}>
              <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>Are you an Artisan?</Text>
              <Text variant="bodyMedium" style={{ marginTop: SPACING.xs, color: COLORS.textSecondary }}>
                Reach more customers and grow your professional business.
              </Text>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('ArtisanRegistration')}
                style={styles.registerButton}
              >
                Register Now
              </Button>
            </View>
            <Avatar.Icon 
              size={64} 
              icon="briefcase-variant-outline" 
              backgroundColor="transparent" 
              color={COLORS.accent} 
            />
          </Card.Content>
        </Card>

        {/* Trust Badges */}
        <View style={styles.trustRow}>
          <View style={styles.trustItem}>
            <MaterialIcons name="verified" size={24} color={COLORS.success} />
            <Text variant="labelSmall" style={styles.trustText}>Verified Pros</Text>
          </View>
          <View style={styles.trustItem}>
            <MaterialIcons name="security" size={24} color={COLORS.success} />
            <Text variant="labelSmall" style={styles.trustText}>Secure Escrow</Text>
          </View>
          <View style={styles.trustItem}>
            <MaterialIcons name="star" size={24} color={COLORS.accent} />
            <Text variant="labelSmall" style={styles.trustText}>Top Rated</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.m,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  logoTextContainer: {
    flexDirection: 'row',
  },
  logoText: {
    fontWeight: '900',
    letterSpacing: -1,
  },
  profileButton: {
    margin: 0,
  },
  searchBar: {
    marginBottom: SPACING.l,
    borderRadius: BORDER_RADIUS.m,
    backgroundColor: '#FFF',
  },
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.l,
    marginBottom: SPACING.xl,
    overflow: 'hidden',
  },
  heroContent: {
    flexDirection: 'row',
    padding: SPACING.l,
    minHeight: 180,
  },
  heroTextContainer: {
    flex: 1,
    zIndex: 1,
  },
  heroTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    lineHeight: 38,
  },
  heroSubtitle: {
    color: '#E0E0E0',
    marginTop: SPACING.s,
    marginBottom: SPACING.m,
  },
  heroButton: {
    alignSelf: 'flex-start',
    borderRadius: BORDER_RADIUS.round,
  },
  heroIconContainer: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  categoriesScroll: {
    marginBottom: SPACING.xl,
    paddingLeft: 2, // For shadow
  },
  categoryCard: {
    backgroundColor: '#FFF',
    borderRadius: BORDER_RADIUS.l,
    marginRight: SPACING.m,
    width: 110,
    height: 120,
    marginBottom: 5,
  },
  categoryTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.s,
  },
  categoryName: {
    marginTop: SPACING.s,
    fontWeight: '600',
    color: COLORS.primary,
  },
  artisanCard: {
    backgroundColor: '#E8F1FF',
    borderRadius: BORDER_RADIUS.l,
    marginBottom: SPACING.xl,
  },
  artisanContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.l,
  },
  artisanTextContainer: {
    flex: 1,
  },
  registerButton: {
    alignSelf: 'flex-start',
    marginTop: SPACING.m,
    borderRadius: BORDER_RADIUS.round,
  },
  trustRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.l,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginBottom: SPACING.l,
  },
  trustItem: {
    alignItems: 'center',
  },
  trustText: {
    marginTop: SPACING.xs,
    color: COLORS.text,
    fontWeight: '600',
  },
});

export default HomeScreen;
