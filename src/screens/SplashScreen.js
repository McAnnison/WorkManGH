import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start(() => {
      // Fade in the button after the logo animation
      Animated.timing(buttonFadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    });
  }, [fadeAnim, buttonFadeAnim]);

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
      <StatusBar barStyle="light-content" backgroundColor="#0B3A6A" />
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Text style={styles.logo}>WorkManGH</Text>
        <View style={styles.divider} />
        <Text style={styles.tagline}>Quality Service, Right at Your Doorstep</Text>
      </Animated.View>

      <Animated.View style={[styles.buttonWrapper, { opacity: buttonFadeAnim }]}>
        <TouchableOpacity 
          activeOpacity={0.8}
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          disabled={isChecking}
        >
          {isChecking ? (
            <ActivityIndicator color="#0B3A6A" />
          ) : (
            <>
              <Text style={styles.buttonText}>Get Started</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#0B3A6A" />
            </>
          )}
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>v1.0.0 • Made with ❤️ in Ghana</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B3A6A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  divider: {
    height: 2,
    width: 80,
    backgroundColor: '#1D4ED8',
    marginVertical: 15,
  },
  tagline: {
    fontSize: 18,
    color: '#CBD5E1',
    fontWeight: '300',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 120,
    width: '100%',
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#0B3A6A',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  loader: {
    marginTop: 30,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
});

export default SplashScreen;