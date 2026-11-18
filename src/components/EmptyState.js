// src/components/EmptyState.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import AppButton from './AppButton';

// Friendly message shown when there is nothing to display.
export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction && (
        <AppButton label={actionLabel} variant="secondary" size="small" onPress={onAction} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: SPACING.xl * 1.5, paddingHorizontal: SPACING.lg },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.textDark, marginBottom: 6 },
  message: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', marginBottom: SPACING.md },
});
