// src/components/AppButton.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

// Reusable button. variant: 'primary' | 'secondary' | 'danger'. size: 'large' | 'small'.
export default function AppButton({ label, onPress, variant = 'primary', size = 'large', style }) {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], size === 'small' && styles.small, style]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={[styles.text, styles[`${variant}Text`], size === 'small' && styles.smallText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    borderWidth: 1,
  },
  small: { paddingVertical: 6, paddingHorizontal: SPACING.md, borderRadius: 8 },
  text: { fontSize: 15, fontWeight: '700' },
  smallText: { fontSize: 13, fontWeight: '600' },
  primary: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  primaryText: { color: COLORS.white },
  secondary: { backgroundColor: COLORS.card, borderColor: COLORS.border },
  secondaryText: { color: COLORS.textDark },
  danger: { backgroundColor: COLORS.dangerBackground, borderColor: COLORS.dangerBorder },
  dangerText: { color: COLORS.danger },
});
