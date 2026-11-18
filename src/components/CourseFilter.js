// src/components/CourseFilter.js
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { ALL_COURSES, COURSES } from '../constants/menu';

const OPTIONS = [ALL_COURSES, ...COURSES];

// Row of chips: All / Starter / Main Course / Dessert. "All" clears the filter.
export default function CourseFilter({ selectedCourse, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
      {OPTIONS.map((option) => {
        const isActive = option === selectedCourse;
        return (
          <TouchableOpacity
            key={option}
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={() => onSelect(option)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexGrow: 0, marginBottom: SPACING.md },
  chip: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: SPACING.sm,
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 13, fontWeight: '600', color: COLORS.textDark },
  chipTextActive: { color: COLORS.white },
});
