import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="tools" size={64} color="#0B3A6A" />
          </View>
          <Text style={styles.title}>WorkManGH</Text>
          <Text style={styles.subtitle}>Professional help at your fingertips</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.mainButton, styles.primaryButton]}
            onPress={() => navigation.navigate('CategorySelection')}
          >
            <View style={styles.buttonIcon}>
              <MaterialIcons name="search" size={32} color="#FFF" />
            </View>
            <View>
              <Text style={styles.buttonText}>Find an Artisan</Text>
              <Text style={styles.buttonSubtext}>Browse skilled workers near you</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.mainButton, styles.secondaryButton]}
            onPress={() => navigation.navigate('ArtisanRegistration')}
          >
            <View style={styles.buttonIcon}>
              <MaterialIcons name="person-add" size={32} color="#FFF" />
            </View>
            <View>
              <Text style={styles.buttonText}>Register as Artisan</Text>
              <Text style={styles.buttonSubtext}>Join our network of skilled workers</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How It Works</Text>

          <View style={styles.infoCard}>
            <View style={[styles.stepNumber, { backgroundColor: '#0B3A6A' }]}>
              <Text style={styles.stepText}>1</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoHeading}>Choose Category</Text>
              <Text style={styles.infoText}>Select the type of artisan you need</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={[styles.stepNumber, { backgroundColor: '#1D4ED8' }]}>
              <Text style={styles.stepText}>2</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoHeading}>View Nearby Artisans</Text>
              <Text style={styles.infoText}>See skilled workers near your location</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={[styles.stepNumber, { backgroundColor: '#10B981' }]}>
              <Text style={styles.stepText}>3</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoHeading}>Call & Connect</Text>
              <Text style={styles.infoText}>Contact artisans directly via phone</Text>
            </View>
          </View>
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
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#0B3A6A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#3B4A66',
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 30,
  },
  button: {
    padding: 20,
    borderRadius: 12,
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 6,
    shadowColor: '#000',
  },
  
  buttonIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  primaryButton: {
    backgroundColor: '#0B3A6A',
  },
  secondaryButton: {
    backgroundColor: '#1D4ED8',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 2,
  },
  buttonSubtext: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
  infoSection: {
    marginTop: 20,
    paddingBottom: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0B3A6A',
    marginBottom: 15,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  stepNumber: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoContent: {
    flex: 1,
  },
  infoHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B1F3B',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#3B4A66',
  },
});
