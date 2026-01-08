import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>WorkManGH</Text>
          <Text style={styles.subtitle}>
            Connect with skilled local artisans
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('CategorySelection')}
          >
            <Text style={styles.buttonText}>Find an Artisan</Text>
            <Text style={styles.buttonSubtext}>
              Browse skilled workers near you
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate('ArtisanRegistration')}
          >
            <Text style={styles.buttonText}>Register as Artisan</Text>
            <Text style={styles.buttonSubtext}>
              Join our network of skilled workers
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How It Works</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoNumber}>1</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoHeading}>Choose Category</Text>
              <Text style={styles.infoText}>
                Select the type of artisan you need
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoNumber}>2</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoHeading}>View Nearby Artisans</Text>
              <Text style={styles.infoText}>
                See skilled workers near your location
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoNumber}>3</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoHeading}>Call & Connect</Text>
              <Text style={styles.infoText}>
                Contact artisans directly via phone
              </Text>
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
    backgroundColor: '#F5F5F5',
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
    color: '#FF6B35',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 30,
  },
  button: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
  },
  secondaryButton: {
    backgroundColor: '#4ECDC4',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  buttonSubtext: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
  infoSection: {
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  infoNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginRight: 15,
    width: 40,
  },
  infoContent: {
    flex: 1,
  },
  infoHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
});
