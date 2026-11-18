// src/components/FeedbackBanner.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

// Success (green) or error (red) message bar. Renders nothing without a message.
export default function FeedbackBanner({ feedback }) {
  if (!feedback) return null;
  const isError = feedback.type === 'error';
  return (
    <View style={[styles.banner, isError ? styles.error : styles.success]}>
      <Text style={[styles.text, isError ? styles.errorText : styles.successText]}>
        {feedback.message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { borderRadius: 10, padding: SPACING.md, marginBottom: SPACING.md },
  success: { backgroundColor: COLORS.successBackground },
  error: { backgroundColor: COLORS.dangerBackground },
  text: { fontSize: 14, fontWeight: '600' },
  successText: { color: COLORS.success },
  errorText: { color: COLORS.danger },
});
