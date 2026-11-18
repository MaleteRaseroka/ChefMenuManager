// src/components/StatsPanel.js
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { COURSES } from '../constants/menu';
import { formatPrice } from '../utils/format';

// Small tile used inside the panel.
function StatTile({ label, value }) {
  return (
    <View style={styles.tile}>
      <Text style={styles.tileValue}>{value}</Text>
      <Text style={styles.tileLabel}>{label}</Text>
    </View>
  );
}

// Menu overview: total items, average price and items per course.
// Can be collapsed to save screen space.
export default function StatsPanel({ statistics }) {
  const [expanded, setExpanded] = useState(true);
  const { totalItems, averagePrice, courseCounts } = statistics;

  return (
    <View style={styles.panel}>
      <TouchableOpacity
        style={styles.headerRow}
        onPress={() => setExpanded((current) => !current)}
        accessibilityRole="button"
        accessibilityLabel="Show or hide menu statistics"
      >
        <Text style={styles.heading}>Menu Statistics</Text>
        <Text style={styles.toggle}>{expanded ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>

      {expanded && (
        <>
          <View style={styles.row}>
            <StatTile label="Total items" value={totalItems} />
            <StatTile label="Average price" value={formatPrice(averagePrice)} />
          </View>
          <View style={styles.row}>
            {COURSES.map((course) => (
              <StatTile key={course} label={course} value={courseCounts[course]} />
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heading: { fontSize: 15, fontWeight: '700', color: COLORS.textDark },
  toggle: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  row: { flexDirection: 'row', marginTop: SPACING.sm },
  tile: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingVertical: SPACING.sm,
    marginHorizontal: 3,
    alignItems: 'center',
  },
  tileValue: { fontSize: 18, fontWeight: '700', color: COLORS.textDark },
  tileLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
});
