/**
 * WorkManGH - Premium Design System (WorkMan Elite)
 * This file serves as the single source of truth for styles.
 */

export const COLORS = {
  // Brand Colors
  primary: '#1A2B48', // Deep Navy - Authority & Trust
  accent: '#FF9F1C',  // Vibrant Amber - Action & Energy
  success: '#2EC4B6', // Mint Green - Success & Completion
  error: '#E71D36',   // Imperial Red - Errors & Alerts
  
  // Neutral Colors
  background: '#F8F9FA',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6C757D',
  border: '#E9ECEF',
  placeholder: '#ADB5BD',
  
  // Gradients (Visual hints for future implementation)
  gradientPrimary: ['#1A2B48', '#2C3E50'],
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  s: 4,
  m: 8,
  l: 12,
  xl: 20,
  round: 999,
};

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    color: COLORS.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: COLORS.text,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    color: COLORS.text,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: COLORS.text,
  },
  bodySecondary: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: COLORS.textSecondary,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: COLORS.card,
  },
};
