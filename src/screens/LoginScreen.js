import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { 
  TextInput, 
  Button, 
  Text, 
  IconButton, 
  ActivityIndicator,
  Surface
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../config/api';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../theme';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userRole', data.user.role);
        
        if (data.user.role === 'ARTISAN') {
          navigation.replace('ArtisanDashboard');
        } else if (data.user.role === 'USER') {
          navigation.replace('UserDashboard');
        } else {
          navigation.replace('Home');
        }
      } else {
        Alert.alert('Login Failed', data.error || 'Invalid credentials');
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
        <ScrollView contentContainerStyle={styles.content}>
          <IconButton
            icon="arrow-left"
            size={28}
            iconColor={COLORS.primary}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />

          <View style={styles.header}>
            <Text variant="headlineLarge" style={styles.title}>Welcome Back</Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Sign in to continue your journey with WorkManGH.
            </Text>
          </View>

          <Surface style={styles.form} elevation={0}>
            <TextInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              outlineColor={COLORS.border}
              activeOutlineColor={COLORS.primary}
              left={<TextInput.Icon icon="email-outline" />}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
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
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
              labelStyle={styles.buttonLabel}
              contentStyle={styles.buttonContent}
            >
              Login
            </Button>

            <View style={styles.footer}>
              <Text variant="bodyMedium" style={{ color: COLORS.textSecondary }}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text variant="bodyMedium" style={styles.signupLink}>
                  Sign Up
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
  form: { 
    backgroundColor: 'transparent'
  },
  input: {
    marginBottom: SPACING.m,
    backgroundColor: '#FFF',
  },
  loginButton: {
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
    marginTop: SPACING.xl 
  },
  signupLink: { 
    color: COLORS.primary, 
    fontWeight: 'bold' 
  },
});

const TouchableOpacity = ({ children, onPress }) => (
  <View onStartShouldSetResponder={() => { onPress(); return true; }}>
    {children}
  </View>
);

export default LoginScreen;
