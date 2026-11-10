import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { 
  TextInput, 
  Button, 
  Text, 
  IconButton, 
  Surface,
  SegmentedButtons
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../config/api';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../theme';


const SignUpScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [role, setRole] = useState('USER'); // USER or ARTISAN
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (!formData.email || !formData.password || !formData.name) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userRole', data.user.role);
        
        if (data.user.role === 'ARTISAN') {
          Alert.alert('Welcome!', 'Account created. Now let\'s set up your professional profile.', [
            { text: 'Continue', onPress: () => navigation.replace('ArtisanRegistration') }
          ]);
        } else {
          navigation.replace('UserDashboard');
        }
      } else {
        Alert.alert('Sign Up Failed', data.error || 'Could not create account');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <IconButton
            icon="arrow-left"
            size={28}
            iconColor={COLORS.primary}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />

          <View style={styles.header}>
            <Text variant="headlineLarge" style={styles.title}>Create Account</Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Join the most trusted artisan marketplace in Ghana.
            </Text>
          </View>

          <View style={styles.roleContainer}>
            <Text variant="labelLarge" style={styles.roleLabel}>I want to use the app as:</Text>
            <SegmentedButtons
              value={role}
              onValueChange={setRole}
              buttons={[
                {
                  value: 'USER',
                  label: 'Customer',
                  icon: 'account',
                  checkedColor: '#FFF',
                  style: role === 'USER' ? { backgroundColor: COLORS.primary } : {},
                },
                {
                  value: 'ARTISAN',
                  label: 'Artisan',
                  icon: 'hammer-wrench',
                  checkedColor: '#FFF',
                  style: role === 'ARTISAN' ? { backgroundColor: COLORS.primary } : {},
                },
              ]}
              style={styles.segmentedButtons}
            />
          </View>

          <Surface style={styles.form} elevation={0}>
            <TextInput
              label="Full Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              mode="outlined"
              style={styles.input}
              outlineColor={COLORS.border}
              activeOutlineColor={COLORS.primary}
              left={<TextInput.Icon icon="account-outline" />}
            />

            <TextInput
              label="Email Address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              outlineColor={COLORS.border}
              activeOutlineColor={COLORS.primary}
              left={<TextInput.Icon icon="email-outline" />}
            />

            <TextInput
              label="Phone Number"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.input}
              outlineColor={COLORS.border}
              activeOutlineColor={COLORS.primary}
              left={<TextInput.Icon icon="phone-outline" />}
            />

            <TextInput
              label="Password"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              mode="outlined"
              secureTextEntry={!showPassword}
              style={styles.input}
              outlineColor={COLORS.border}
              activeOutlineColor={COLORS.primary}
              left={<TextInput.Icon icon="lock-outline" />}
              right={
                <TextInput.Icon 
                  icon={showPassword ? "eye-off" : "eye"} 
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            <Button
              mode="contained"
              onPress={handleSignUp}
              loading={loading}
              disabled={loading}
              style={styles.signUpButton}
              labelStyle={styles.buttonLabel}
              contentStyle={styles.buttonContent}
            >
              Sign Up
            </Button>

            <View style={styles.footer}>
              <Text variant="bodyMedium" style={{ color: COLORS.textSecondary }}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text variant="bodyMedium" style={styles.loginLink}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  content: { 
    padding: SPACING.l 
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
  roleContainer: {
    marginBottom: SPACING.xl,
  },
  roleLabel: {
    marginBottom: SPACING.s,
    color: COLORS.primary,
    fontWeight: '600',
  },
  segmentedButtons: {
    backgroundColor: '#FFF',
  },
  form: { 
    backgroundColor: 'transparent'
  },
  input: {
    marginBottom: SPACING.m,
    backgroundColor: '#FFF',
  },
  signUpButton: {
    marginTop: SPACING.m,
    borderRadius: BORDER_RADIUS.m,
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  loginLink: { 
    color: COLORS.primary, 
    fontWeight: 'bold' 
  },
});

export default SignUpScreen;
