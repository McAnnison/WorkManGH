import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ARTISAN_CATEGORIES } from '../data/artisanData';

// Replace with your actual local IP address (e.g., 192.168.1.5)
const API_URL = 'http://192.168.56.1:3000';

export default function ArtisanRegistrationScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: null,
    experience: '',
    bio: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [experienceError, setExperienceError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  useEffect(() => {
    if (formData.name) setNameError('');
    if (formData.phone) setPhoneError('');
    if (formData.experience) setExperienceError('');
    if (formData.category) setCategoryError('');
  }, [formData]);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCategorySelect = (category) => {
    updateField('category', category);
  };

  const handleSubmit = async () => {
    // Reset errors
    setNameError('');
    setPhoneError('');
    setExperienceError('');
    setCategoryError('');

    let hasError = false;

    // Validate form
    if (!formData.name) {
      setNameError('Full Name is required.');
      hasError = true;
    }
    if (!formData.phone) {
      setPhoneError('Phone Number is required.');
      hasError = true;
    }
    if (!formData.category) {
      setCategoryError('Skill Category is required.');
      hasError = true;
    }
    if (!formData.experience) {
      setExperienceError('Years of Experience is required.');
      hasError = true;
    }

    // Validate Ghanaian phone number format
    const phoneRegex = /^(\+233|0)[0-9]{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setPhoneError('Please enter a valid Ghanaian phone number (e.g., +233244123456 or 0244123456).');
      hasError = true;
    }

    const experienceNum = parseInt(formData.experience);
    if (formData.experience && (isNaN(experienceNum) || experienceNum < 0)) {
      setExperienceError('Please enter a valid number of years.');
      hasError = true;
    }

    if (hasError) {
      Alert.alert('Missing Information', 'Please fill in all required fields correctly.');
      return;
    }

    setSubmitting(true);

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
    } finally {
      setSubmitting(false);
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
            style={[styles.input, nameError ? styles.inputError : {}]}
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(text) => updateField('name', text)}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        </View>

        {/* Phone Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={[styles.input, phoneError ? styles.inputError : {}]}
            placeholder="+233244123456"
            value={formData.phone}
            onChangeText={(text) => updateField('phone', text)}
            keyboardType="phone-pad"
          />
          {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
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
                <View style={styles.categoryChipIconContainer}>
                  <Text style={styles.categoryChipIcon}>{category.icon}</Text>
                </View>
                <Text
                  style={[
                    styles.categoryChipText,
                    formData.category?.id === category.id && styles.categoryChipTextSelected,
                  ]}
                >
                  {category.name}
                </Text>
                {formData.category?.id === category.id && <MaterialIcons name="check-circle" size={16} color="#FFF" style={styles.selectedCheckIcon} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
          {categoryError ? <Text style={styles.errorText}>{categoryError}</Text> : null}
        </View>

        {/* Experience Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Years of Experience *</Text>
          <TextInput
            style={[styles.input, experienceError ? styles.inputError : {}]}
            placeholder="e.g., 5"
            value={formData.experience}
            onChangeText={(text) => updateField('experience', text)}
            keyboardType="numeric"
          />
          {experienceError ? <Text style={styles.errorText}>{experienceError}</Text> : null}
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
          <TouchableOpacity style={styles.uploadButton} activeOpacity={0.8}>
            <MaterialIcons name="camera-alt" size={20} color="#0B3A6A" style={styles.uploadButtonIcon} />
            <Text style={styles.uploadButtonText}>Add Photos</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={submitting}>
          {submitting ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.submitButtonText}>Complete Registration</Text>
          )}
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
    fontSize: 28,
    fontWeight: '900',
    color: '#0B3A6A',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7C97',
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
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
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
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryChipSelected: {
    backgroundColor: '#0B3A6A',
    borderColor: '#0B3A6A',
  },
  categoryChipIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E8F1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryChipIcon: {
    fontSize: 18,
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  uploadButtonIcon: {
    marginRight: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#0B3A6A',
  },
  submitButton: {
    backgroundColor: '#0B3A6A',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 12,
  },
  submitButtonIcon: {
    marginLeft: 10,
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
  selectedCheckIcon: {
    marginLeft: 8,
  },
});
