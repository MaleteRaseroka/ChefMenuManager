// src/components/FormField.js
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

// Label + TextInput + inline error message in one reusable piece.
export default function FormField({ label, error, multiline = false, ...inputProps }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline, error && styles.inputError]}
        placeholderTextColor="#9CA3AF"
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...inputProps}
      />
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: SPACING.lg },
  label: { fontSize: 13, fontWeight: '700', color: '#374151', marginBottom: 6 },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.textDark,
  },
  multiline: { minHeight: 90 },
  inputError: { borderColor: COLORS.danger },
  errorText: { color: COLORS.danger, fontSize: 12, marginTop: 4 },
});
