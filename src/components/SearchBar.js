// src/components/SearchBar.js
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

// Search box with an "X" button that clears the text.
export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search dishes by name"
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
        >
          <Text style={styles.clear}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  input: { flex: 1, paddingVertical: 10, fontSize: 15, color: COLORS.textDark },
  clear: { fontSize: 16, color: COLORS.textMuted, paddingLeft: SPACING.sm },
});
