// src/screens/MenuFormScreen.js
// One form used for BOTH adding and editing a dish (reusable component).
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { parsePrice, validateMenuItem } from '../utils/validation';
import AppHeader from '../components/AppHeader';
import AppButton from '../components/AppButton';
import FormField from '../components/FormField';
import CoursePicker from '../components/CoursePicker';

export default function MenuFormScreen({ itemToEdit, onSave, onCancel, onDelete }) {
  const isEditing = !!itemToEdit;

  // Pre-fill the fields when editing, start empty when adding.
  const [name, setName] = useState(itemToEdit ? itemToEdit.name : '');
  const [description, setDescription] = useState(itemToEdit ? itemToEdit.description : '');
  const [course, setCourse] = useState(itemToEdit ? itemToEdit.course : '');
  const [price, setPrice] = useState(itemToEdit ? String(itemToEdit.price) : '');
  const [errors, setErrors] = useState({});

  // Remove a field's error as soon as the chef starts fixing it.
  const clearError = (field) => setErrors((current) => ({ ...current, [field]: undefined }));

  const handleSave = () => {
    const validationErrors = validateMenuItem({ name, description, course, price });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onSave({ name, description, course, price: parsePrice(price) });
  };

  const confirmDelete = () => {
    Alert.alert('Delete menu item', `Are you sure you want to delete "${itemToEdit.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(itemToEdit) },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AppHeader title={isEditing ? 'Edit Menu Item' : 'Add Menu Item'} onBack={onCancel} />

      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        <FormField
          label="Dish Name"
          placeholder="e.g. Classic Margherita Pizza"
          value={name}
          onChangeText={(text) => { setName(text); clearError('name'); }}
          error={errors.name}
        />
        <FormField
          label="Description"
          placeholder="e.g. Fresh mozzarella, san marzano tomato sauce, fresh basil leaves"
          value={description}
          onChangeText={(text) => { setDescription(text); clearError('description'); }}
          error={errors.description}
          multiline
        />
        <CoursePicker
          value={course}
          onChange={(value) => { setCourse(value); clearError('course'); }}
          error={errors.course}
        />
        <FormField
          label="Price"
          placeholder="e.g. 14.99"
          value={price}
          onChangeText={(text) => { setPrice(text); clearError('price'); }}
          error={errors.price}
          keyboardType="decimal-pad"
        />
      </ScrollView>

      <View style={styles.footer}>
        <AppButton label={isEditing ? 'Save Changes' : 'Save Menu Item'} onPress={handleSave} />
        {isEditing ? (
          <AppButton
            label="Delete Item"
            variant="danger"
            style={styles.footerButton}
            onPress={confirmDelete}
          />
        ) : (
          <AppButton
            label="Cancel"
            variant="secondary"
            style={styles.footerButton}
            onPress={onCancel}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  form: { padding: SPACING.lg },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerButton: { marginTop: SPACING.sm },
});
