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
  ProgressBar,
  Card,
  Avatar,
  Surface
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../theme';

const IdentityVerificationScreen = ({ navigation }) => {
  const [pin, setPin] = useState('');
  const [step, setStep] = useState(1); // 1: PIN, 2: Document Scan, 3: Liveness

  const handlePinSubmit = () => {
    // Regex for Ghana Card: GHA-7XXXXXXXX-X
    const pinRegex = /^GHA-\d{9}-\d$/;
    if (pinRegex.test(pin)) {
      setStep(2);
    } else {
      Alert.alert('Invalid PIN', 'Please enter a valid Ghana Card PIN (e.g., GHA-700000000-0)');
    }
  };

  const progress = step / 3;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <IconButton
            icon="arrow-left"
            size={28}
            iconColor={COLORS.primary}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />

          <View style={styles.header}>
            <Text variant="headlineMedium" style={styles.title}>Identity Verification</Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Verified professionals earn more and build faster trust with customers.
            </Text>
          </View>

          <View style={styles.progressContainer}>
            <ProgressBar progress={progress} color={COLORS.accent} style={styles.progressBar} />
            <View style={styles.stepLabels}>
              <Text variant="labelSmall" style={step >= 1 ? styles.activeLabel : styles.inactiveLabel}>ID PIN</Text>
              <Text variant="labelSmall" style={step >= 2 ? styles.activeLabel : styles.inactiveLabel}>DOCUMENT</Text>
              <Text variant="labelSmall" style={step >= 3 ? styles.activeLabel : styles.inactiveLabel}>LIVENESS</Text>
            </View>
          </View>

          {step === 1 && (
            <Card style={styles.card} mode="elevated">
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Avatar.Icon size={48} icon="card-account-details-outline" backgroundColor={COLORS.primary} />
                  <View style={styles.headerText}>
                    <Text variant="titleLarge">Ghana Card PIN</Text>
                    <Text variant="bodySmall">Enter your unique identity number</Text>
                  </View>
                </View>
                
                <TextInput
                  label="GHA-XXXXXXXXX-X"
                  placeholder="GHA-712345678-9"
                  value={pin}
                  onChangeText={setPin}
                  mode="outlined"
                  autoCapitalize="characters"
                  maxLength={15}
                  style={styles.input}
                  activeOutlineColor={COLORS.primary}
                />
                
                <Button 
                  mode="contained" 
                  onPress={handlePinSubmit}
                  style={styles.actionButton}
                  contentStyle={styles.buttonContent}
                >
                  Next: Scan Document
                </Button>
              </Card.Content>
            </Card>
          )}

          {step === 2 && (
            <Card style={styles.card} mode="elevated">
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Avatar.Icon size={48} icon="camera-outline" backgroundColor={COLORS.primary} />
                  <View style={styles.headerText}>
                    <Text variant="titleLarge">Scan Document</Text>
                    <Text variant="bodySmall">Front of your Ghana Card</Text>
                  </View>
                </View>
                
                <Text variant="bodyMedium" style={styles.instruction}>
                  Position the front of your card within the frame. Ensure all details are clear and legible.
                </Text>
                
                <Surface style={styles.cameraPlaceholder} elevation={1}>
                  <Avatar.Icon size={80} icon="card-outline" backgroundColor="transparent" color="rgba(255,255,255,0.3)" />
                </Surface>
                
                <Button 
                  mode="contained" 
                  onPress={() => setStep(3)}
                  style={styles.actionButton}
                  contentStyle={styles.buttonContent}
                >
                  Capture & Next
                </Button>
                <Button 
                  mode="text" 
                  onPress={() => setStep(1)}
                  style={styles.secondaryButton}
                >
                  Back
                </Button>
              </Card.Content>
            </Card>
          )}

          {step === 3 && (
            <Card style={styles.card} mode="elevated">
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Avatar.Icon size={48} icon="face-recognition" backgroundColor={COLORS.primary} />
                  <View style={styles.headerText}>
                    <Text variant="titleLarge">Liveness Check</Text>
                    <Text variant="bodySmall">Confirm it's really you</Text>
                  </View>
                </View>
                
                <Text variant="bodyMedium" style={styles.instruction}>
                  Look into the camera and follow the instructions. We'll ask you to blink or turn your head.
                </Text>
                
                <Surface style={styles.selfiePlaceholder} elevation={1}>
                  <Avatar.Icon size={120} icon="account-outline" backgroundColor="transparent" color={COLORS.border} />
                </Surface>
                
                <Button 
                  mode="contained" 
                  onPress={() => {
                    Alert.alert('Success!', 'Your verification is being processed.');
                    navigation.goBack();
                  }}
                  buttonColor={COLORS.success}
                  style={styles.actionButton}
                  contentStyle={styles.buttonContent}
                >
                  Complete Verification
                </Button>
                <Button 
                  mode="text" 
                  onPress={() => setStep(2)}
                  style={styles.secondaryButton}
                >
                  Back
                </Button>
              </Card.Content>
            </Card>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
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
  progressContainer: {
    marginBottom: SPACING.xl,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.s,
  },
  activeLabel: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  inactiveLabel: {
    color: COLORS.placeholder,
  },
  card: {
    borderRadius: BORDER_RADIUS.l,
    backgroundColor: '#FFF',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  headerText: {
    marginLeft: SPACING.m,
  },
  input: {
    marginBottom: SPACING.l,
    backgroundColor: '#FFF',
  },
  instruction: {
    marginBottom: SPACING.l,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  cameraPlaceholder: {
    height: 220,
    backgroundColor: '#1A1A1A',
    borderRadius: BORDER_RADIUS.m,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  selfiePlaceholder: {
    height: 280,
    backgroundColor: '#F8F9FA',
    borderRadius: 140,
    width: 280,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.l,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  actionButton: {
    borderRadius: BORDER_RADIUS.m,
  },
  buttonContent: {
    height: 56,
  },
  secondaryButton: {
    marginTop: SPACING.s,
  },
});

export default IdentityVerificationScreen;
