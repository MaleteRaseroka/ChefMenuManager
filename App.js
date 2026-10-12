import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  BackHandler,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// ---------- Constants ----------
const COURSES = ['Starter', 'Main Course', 'Dessert'];
const CURRENCY = 'R'; // change to '$' if you prefer
const EMPTY_FORM = { name: '', description: '', course: '', price: '' };

// ---------- Validation ----------
// Returns an object of error messages (empty object = valid)
const validate = (form) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = 'Dish name is required.';
  } else if (form.name.trim().length < 2) {
    errors.name = 'Dish name must be at least 2 characters.';
  }

  if (!form.description.trim()) {
    errors.description = 'Description is required.';
  } else if (form.description.trim().length < 5) {
    errors.description = 'Please enter a longer description.';
  }

  if (!form.course) {
    errors.course = 'Please select a course.';
  }

  const priceText = form.price.trim().replace(',', '.');
  if (!priceText) {
    errors.price = 'Price is required.';
  } else if (!/^\d+(\.\d{1,2})?$/.test(priceText)) {
    errors.price = 'Enter a valid price, e.g. 85 or 85.50.';
  } else if (parseFloat(priceText) <= 0) {
    errors.price = 'Price must be greater than 0.';
  }

  return errors;
};

// ---------- Screen 1: Menu Items Dashboard ----------
function MenuListScreen({ items, onAddPress, successMessage }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <Text style={styles.dishName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>
          {CURRENCY}
          {item.price.toFixed(2)}
        </Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.course.toUpperCase()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.flex}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Restaurant Menu Manager</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.screenTitle}>Menu Items</Text>
            <Text style={styles.countText}>
              {items.length} {items.length === 1 ? 'item' : 'items'} on the menu
            </Text>
          </View>
          <TouchableOpacity
            style={styles.primaryButtonSmall}
            onPress={onAddPress}
            accessibilityLabel="Add menu item"
          >
            <Text style={styles.primaryButtonText}>+ Add Menu Item</Text>
          </TouchableOpacity>
        </View>

        {successMessage ? (
          <View style={styles.successBanner}>
            <Text style={styles.successText}>✓ {successMessage}</Text>
          </View>
        ) : null}

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={items.length === 0 ? styles.emptyContainer : styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>No menu items yet</Text>
              <Text style={styles.emptyText}>
                Tap "+ Add Menu Item" to add your first dish to the menu.
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
}

// ---------- Screen 2: Add Menu Item ----------
function AddMenuItemScreen({ onSave, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // clear the error for this field as soon as the chef starts fixing it
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSave = () => {
    const foundErrors = validate(form);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) {
      return; // stop: show error messages
    }
    onSave({
      id: Date.now().toString(),
      name: form.name.trim(),
      description: form.description.trim(),
      course: form.course,
      price: parseFloat(form.price.trim().replace(',', '.')),
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onCancel} accessibilityLabel="Go back">
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Menu Item</Text>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.formContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Dish name */}
        <Text style={styles.label}>Dish Name</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="e.g. Classic Margherita Pizza"
          placeholderTextColor="#9ca3af"
          value={form.name}
          onChangeText={(t) => updateField('name', t)}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea, errors.description && styles.inputError]}
          placeholder="e.g. Fresh mozzarella, tomato sauce, basil leaves, olive oil drizzle."
          placeholderTextColor="#9ca3af"
          value={form.description}
          onChangeText={(t) => updateField('description', t)}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}

        {/* Course */}
        <Text style={styles.label}>Course</Text>
        <View style={[styles.pickerWrapper, errors.course && styles.inputError]}>
          <Picker
            selectedValue={form.course}
            onValueChange={(v) => updateField('course', v)}
            style={styles.picker}
            dropdownIconColor="#374151"
          >
            <Picker.Item label="Select course" value="" color="#9ca3af" />
            {COURSES.map((c) => (
              <Picker.Item key={c} label={c} value={c} color="#111827" />
            ))}
          </Picker>
        </View>
        {errors.course ? <Text style={styles.errorText}>{errors.course}</Text> : null}

        {/* Price */}
        <Text style={styles.label}>Price ({CURRENCY})</Text>
        <TextInput
          style={[styles.input, errors.price && styles.inputError]}
          placeholder="e.g. 85.50"
          placeholderTextColor="#9ca3af"
          value={form.price}
          onChangeText={(t) => updateField('price', t)}
          keyboardType="decimal-pad"
        />
        {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
          <Text style={styles.primaryButtonText}>Save Menu Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onCancel}>
          <Text style={styles.secondaryButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ---------- Root component ----------
export default function App() {
  const [screen, setScreen] = useState('list'); // 'list' | 'add'
  const [menuItems, setMenuItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  // Hide the success message after 3 seconds
  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  // Android hardware back button returns to the menu list
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (screen === 'add') {
        setScreen('list');
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [screen]);

  const handleSave = (newItem) => {
    setMenuItems((prev) => [newItem, ...prev]); // newest first; list updates automatically
    setSuccessMessage(`"${newItem.name}" was added to the menu.`);
    setScreen('list');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
      {screen === 'list' ? (
        <MenuListScreen
          items={menuItems}
          successMessage={successMessage}
          onAddPress={() => setScreen('add')}
        />
      ) : (
        <AddMenuItemScreen onSave={handleSave} onCancel={() => setScreen('list')} />
      )}
    </View>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#f9fafb' },

  header: {
    backgroundColor: '#1f2937',
    paddingTop: (StatusBar.currentHeight || 44) + 14,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: { color: '#ffffff', fontSize: 18, fontWeight: '700' },
  backButton: {
    backgroundColor: '#374151',
    borderRadius: 8,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backButtonText: { color: '#ffffff', fontSize: 20 },

  body: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  screenTitle: { fontSize: 26, fontWeight: '800', color: '#111827' },
  countText: { fontSize: 13, color: '#6b7280', marginTop: 2 },

  primaryButtonSmall: {
    backgroundColor: '#111827',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  successBanner: {
    backgroundColor: '#dcfce7',
    borderColor: '#86efac',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  successText: { color: '#166534', fontWeight: '600' },

  listContent: { paddingBottom: 24 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 2,
  },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dishName: { flex: 1, fontSize: 16, fontWeight: '700', color: '#111827', marginRight: 8 },
  price: { fontSize: 16, fontWeight: '700', color: '#111827' },
  description: { fontSize: 13, color: '#6b7280', marginTop: 4, marginBottom: 10, lineHeight: 18 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeText: { fontSize: 11, fontWeight: '600', color: '#4b5563' },

  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
  emptyBox: { alignItems: 'center', padding: 24 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#374151', marginBottom: 6 },
  emptyText: { fontSize: 14, color: '#6b7280', textAlign: 'center' },

  formContent: { paddingBottom: 24 },
  label: { fontSize: 13, fontWeight: '600', color: '#374151', marginTop: 14, marginBottom: 6 },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  textArea: { minHeight: 100 },
  inputError: { borderColor: '#dc2626' },
  errorText: { color: '#dc2626', fontSize: 12, marginTop: 4 },
  pickerWrapper: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: { color: '#111827' },

  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  primaryButton: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#ffffff', fontWeight: '700', fontSize: 14 },
  secondaryButton: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
  },
  secondaryButtonText: { color: '#374151', fontWeight: '600', fontSize: 14 },
});