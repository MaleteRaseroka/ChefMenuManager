// src/components/AppHeader.js
import React from 'react';
import { StatusBar as RNStatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

// Dark title bar. Shows a back arrow when onBack is supplied.
export default function AppHeader({ title, onBack }) {
  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.header,
    paddingTop: (RNStatusBar.currentHeight || 0) + SPACING.md,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginRight: SPACING.md,
  },
  backText: { color: COLORS.white, fontSize: 18 },
});
