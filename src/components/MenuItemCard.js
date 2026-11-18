// src/components/MenuItemCard.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { formatPrice } from '../utils/format';
import AppButton from './AppButton';

// One dish on the dashboard: name, price, description, course badge, Edit / Delete.
export default function MenuItemCard({ item, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.bottomRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.course.toUpperCase()}</Text>
        </View>
        <View style={styles.actions}>
          <AppButton label="Edit" variant="secondary" size="small" onPress={() => onEdit(item)} />
          <AppButton
            label="Delete"
            variant="danger"
            size="small"
            style={styles.deleteButton}
            onPress={() => onDelete(item)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { flex: 1, fontSize: 16, fontWeight: '700', color: COLORS.textDark, marginRight: SPACING.sm },
  price: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  description: { fontSize: 13, color: COLORS.textMuted, marginTop: 4, marginBottom: SPACING.md },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: {
    backgroundColor: COLORS.badgeBackground,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#4B5563' },
  actions: { flexDirection: 'row' },
  deleteButton: { marginLeft: SPACING.sm },
});
