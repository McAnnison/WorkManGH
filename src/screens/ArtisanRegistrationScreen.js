import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ARTISAN_CATEGORIES } from '../data/artisanData';

// Replace with your actual local IP address (e.g., 192.168.1.5)
const API_URL = 'http://YOUR_API_URL:3000';

export default function ArtisanRegistrationScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: null,
    experience: '',
    bio: '',
  });

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCategorySelect = (category) => {
    updateField('category', category);
  };

  const handleSubmit = async () => {
    // Validate form
    if (!formData.name || !formData.phone || !formData.category || !formData.experience) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    // Validate Ghanaian phone number format
    const phoneRegex = /^(\+233|0)[0-9]{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      Alert.alert('Invalid Phone', 'Please enter a valid Ghanaian phone number (e.g., +233244123456 or 0244123456)');
      return;
    }

    const experienceNum = parseInt(formData.experience);
    if (isNaN(experienceNum) || experienceNum < 0) {
      Alert.alert('Invalid Experience', 'Please enter a valid number of years');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      
      const response = await fetch(`${API_URL}/api/artisans/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryId: formData.category.id,
          experienceYears: experienceNum,
          bio: formData.bio,
          latitude: 5.6037, // Default Accra coords
          longitude: -0.1870,
          address: "Accra, Ghana"
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Registration successful!', [
          { 
            text: 'Go to Dashboard', 
            onPress: () => navigation.replace('ArtisanDashboard') 
          },
        ]);
      } else {
        Alert.alert('Registration Failed', data.error || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not connect to the server');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Join Our Network</Text>
        <Text style={styles.subtitle}>
          Register as an artisan and start receiving job opportunities
        </Text>

        {/* Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(text) => updateField('name', text)}
          />
        </View>

        {/* Phone Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="+233244123456"
            value={formData.phone}
            onChangeText={(text) => updateField('phone', text)}
            keyboardType="phone-pad"
          />
        </View>

        {/* Category Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Skill Category *</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {ARTISAN_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  formData.category?.id === category.id && styles.categoryChipSelected,
                ]}
                onPress={() => handleCategorySelect(category)}
              >
                <Text style={styles.categoryChipIcon}>{category.icon}</Text>
                <Text
                  style={[
                    styles.categoryChipText,
                    formData.category?.id === category.id && styles.categoryChipTextSelected,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Experience Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Years of Experience *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 5"
            value={formData.experience}
            onChangeText={(text) => updateField('experience', text)}
            keyboardType="numeric"
          />
        </View>

        {/* Bio Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>About You (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell customers about your skills and experience..."
            value={formData.bio}
            onChangeText={(text) => updateField('bio', text)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Upload Section Placeholder */}
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>Profile & Portfolio Photos</Text>
          <Text style={styles.uploadNote}>
            (Photo upload would be available in the full version)
          </Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>📷 Add Photos</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Complete Registration</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          * Required fields
        </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B1F3B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#3B4A66',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B1F3B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  categoryScroll: {
    marginTop: 8,
  },
  categoryChip: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryChipSelected: {
    backgroundColor: '#0B3A6A',
    borderColor: '#0B3A6A',
  },
  categoryChipIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0B1F3B',
  },
  categoryChipTextSelected: {
    color: '#FFF',
  },
  uploadSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#B5C7E3',
    borderStyle: 'dashed',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B1F3B',
    marginBottom: 4,
  },
  uploadNote: {
    fontSize: 12,
    color: '#3B4A66',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  uploadButton: {
    backgroundColor: '#E8F1FF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#0B3A6A',
  },
  submitButton: {
    backgroundColor: '#0B3A6A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 12,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  note: {
    fontSize: 12,
    color: '#6B7C97',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
