import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SHADOWS, SPACING, BORDER_RADIUS } from '../theme';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleGetStarted = async () => {
    if (isChecking) return;
    setIsChecking(true);

    try {
      const token = await AsyncStorage.getItem('userToken');
      const role = await AsyncStorage.getItem('userRole'); 

      if (token) {
        if (role === 'ARTISAN') {
          navigation.replace('ArtisanDashboard');
        } else if (role === 'USER') {
          navigation.replace('UserDashboard');
        } else {
          navigation.replace('Home');
        }
      } else {
        navigation.replace('Home');
      }
    } catch (error) {
      navigation.replace('Home');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <Animated.View style={{ 
        opacity: fadeAnim, 
        transform: [{ translateY: slideAnim }],
        alignItems: 'center' 
      }}>
        <View style={styles.logoContainer}>
          <MaterialIcons name="engineering" size={64} color={COLORS.accent} />
          <Text style={[TYPOGRAPHY.h1, styles.logoText]}>WorkMan</Text>
          <Text style={[TYPOGRAPHY.h1, { color: COLORS.accent }]}>GH</Text>
        </View>
        <Text style={[TYPOGRAPHY.bodySecondary, styles.tagline]}>
          Connecting Ghana's finest artisans with people who value quality.
        </Text>
      </Animated.View>

      <Animated.View style={[styles.bottomContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity 
          activeOpacity={0.9}
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          disabled={isChecking}
        >
          {isChecking ? (
            <ActivityIndicator color={COLORS.primary} />
          ) : (
            <>
              <Text style={[TYPOGRAPHY.button, { color: COLORS.primary }]}>Get Started</Text>
              <MaterialIcons name="arrow-forward" size={20} color={COLORS.primary} style={{ marginLeft: SPACING.s }} />
            </>
          )}
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 2.0 (Elite) • Trusted by Millions</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  logoText: {
    color: '#FFF',
    marginLeft: SPACING.s,
  },
  tagline: {
    color: '#CBD5E1',
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
    fontSize: 18,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: SPACING.xxl,
    width: '100%',
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: COLORS.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.xxl,
    borderRadius: BORDER_RADIUS.round,
    width: '80%',
    ...SHADOWS.medium,
  },
  footer: {
    marginTop: SPACING.xl,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SplashScreen;
