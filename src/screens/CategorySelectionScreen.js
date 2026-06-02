import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ARTISAN_CATEGORIES } from '../data/artisanData';
import { MaterialIcons } from '@expo/vector-icons';

export default function CategorySelectionScreen({ navigation }) {
  const handleCategorySelect = (category) => {
    navigation.navigate('ArtisanList', { category });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>What do you need help with?</Text>
          <Text style={styles.subtitle}>
            Select a category to find skilled workers near you
          </Text>
        </View>

        <View style={styles.categoryGrid}>
          {ARTISAN_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handleCategorySelect(category)}
            >
              <View style={styles.iconContainer}>
                <Text style={styles.categoryIconEmoji}>{category.icon}</Text>
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <View style={styles.badge}>
                <MaterialIcons name="chevron-right" size={20} color="#0B3A6A" />
              </View>
            </TouchableOpacity>
          ))}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B3A6A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7C97',
    marginBottom: 24,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIconEmoji: {
    fontSize: 32,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0B3A6A',
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    opacity: 0.5,
  },
});
