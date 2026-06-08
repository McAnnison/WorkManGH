import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { 
  TextInput, 
  Button, 
  Text, 
  IconButton, 
  Chip,
  HelperText,
  Surface,
  Avatar
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ARTISAN_CATEGORIES } from '../data/artisanData';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../theme';

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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Alert.alert('Authentication Required', 'You must be logged in to register as an artisan.');
      navigation.navigate('Login');
    }
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Full Name is required';
    if (!formData.phone) newErrors.phone = 'Phone Number is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.experience) newErrors.experience = 'Experience is required';

    const phoneRegex = /^(\+233|0)[0-9]{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid Ghanaian phone number format';
    }

    const experienceNum = parseInt(formData.experience);
    if (formData.experience && (isNaN(experienceNum) || experienceNum < 0)) {
      newErrors.experience = 'Must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

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
          experienceYears: parseInt(formData.experience),
          bio: formData.bio,
          latitude: 5.6037,
          longitude: -0.1870,
          address: "Accra, Ghana"
        }),
      });

      if (response.ok) {
        Alert.alert(
          'Registration Successful!', 
          'Welcome to the elite network. To start receiving high-value jobs, we recommend verifying your identity now.', 
          [
            { text: 'Get Verified Now', onPress: () => navigation.replace('IdentityVerification') },
            { text: 'Go to Dashboard', onPress: () => navigation.replace('ArtisanDashboard') },
          ]
        );
      } else {
        const data = await response.json();
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
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <IconButton
          icon="arrow-left"
          size={28}
          iconColor={COLORS.primary}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />

        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>Join Our Network</Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Register as a professional artisan and grow your business.
          </Text>
        </View>

        <Surface style={styles.form} elevation={0}>
          <View style={styles.inputGroup}>
            <TextInput
              label="Full Name *"
              value={formData.name}
              onChangeText={(text) => updateField('name', text)}
              mode="outlined"
              error={!!errors.name}
              style={styles.input}
              activeOutlineColor={COLORS.primary}
            />
            <HelperText type="error" visible={!!errors.name}>{errors.name}</HelperText>
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              label="Phone Number *"
              value={formData.phone}
              onChangeText={(text) => updateField('phone', text)}
              mode="outlined"
              keyboardType="phone-pad"
              error={!!errors.phone}
              style={styles.input}
              activeOutlineColor={COLORS.primary}
              left={<TextInput.Icon icon="phone-outline" />}
            />
            <HelperText type="error" visible={!!errors.phone}>{errors.phone}</HelperText>
          </View>

          <View style={styles.inputGroup}>
            <Text variant="labelLarge" style={styles.label}>Skill Category *</Text>
            <View style={styles.chipContainer}>
              {ARTISAN_CATEGORIES.slice(0, 12).map((category) => (
                <Chip
                  key={category.id}
                  selected={formData.category?.id === category.id}
                  onPress={() => updateField('category', category)}
                  style={styles.chip}
                  selectedColor="#FFF"
                  showSelectedOverlay
                  compact
                  avatar={<Text style={{fontSize: 16}}>{category.icon}</Text>}
                  theme={{ colors: { secondaryContainer: COLORS.primary } }}
                >
                  {category.name}
                </Chip>
              ))}
            </View>
            <HelperText type="error" visible={!!errors.category}>{errors.category}</HelperText>
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              label="Years of Experience *"
              value={formData.experience}
              onChangeText={(text) => updateField('experience', text)}
              mode="outlined"
              keyboardType="numeric"
              error={!!errors.experience}
              style={styles.input}
              activeOutlineColor={COLORS.primary}
            />
            <HelperText type="error" visible={!!errors.experience}>{errors.experience}</HelperText>
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              label="About You (Optional)"
              value={formData.bio}
              onChangeText={(text) => updateField('bio', text)}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={[styles.input, { height: 120 }]}
              activeOutlineColor={COLORS.primary}
            />
          </View>

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={submitting}
            disabled={submitting}
            style={styles.submitButton}
            contentStyle={{ height: 56 }}
            labelStyle={{ fontSize: 18, fontWeight: 'bold' }}
          >
            Complete Registration
          </Button>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.l,
  },
  backButton: { 
    marginLeft: -SPACING.s,
    marginBottom: SPACING.m 
  },
  header: { 
    marginBottom: SPACING.xl 
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subtitle: {
    color: COLORS.textSecondary,
    marginTop: SPACING.s,
  },
  form: {
    backgroundColor: 'transparent',
  },
  inputGroup: {
    marginBottom: SPACING.s,
  },
  input: {
    backgroundColor: '#FFF',
  },
  label: {
    marginBottom: SPACING.s,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginBottom: 4,
  },
  submitButton: {
    marginTop: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
    marginBottom: SPACING.xl,
  },
});
