// src/components/CoursePicker.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, SPACING } from '../constants/theme';
import { COURSES } from '../constants/menu';

// Course dropdown with label and inline error, matching FormField.
export default function CoursePicker({ value, onChange, error }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Course</Text>
      <View style={[styles.pickerBox, error && styles.pickerError]}>
        <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
          <Picker.Item label="Select course" value="" color="#9CA3AF" />
          {COURSES.map((course) => (
            <Picker.Item key={course} label={course} value={course} />
          ))}
        </Picker>
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: SPACING.lg },
  label: { fontSize: 13, fontWeight: '700', color: '#374151', marginBottom: 6 },
  pickerBox: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  pickerError: { borderColor: COLORS.danger },
  picker: { color: COLORS.textDark },
  errorText: { color: COLORS.danger, fontSize: 12, marginTop: 4 },
});
