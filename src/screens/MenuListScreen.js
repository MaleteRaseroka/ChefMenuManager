// src/screens/MenuListScreen.js
// Menu Items Dashboard: statistics, search, course filter and the list of dishes.
import React, { useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { ALL_COURSES } from '../constants/menu';
import { calculateMenuStatistics, filterMenuItems } from '../utils/menuHelpers';
import AppHeader from '../components/AppHeader';
import AppButton from '../components/AppButton';
import FeedbackBanner from '../components/FeedbackBanner';
import StatsPanel from '../components/StatsPanel';
import SearchBar from '../components/SearchBar';
import CourseFilter from '../components/CourseFilter';
import MenuItemCard from '../components/MenuItemCard';
import EmptyState from '../components/EmptyState';

export default function MenuListScreen({ menuItems, feedback, onAdd, onEdit, onDelete }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(ALL_COURSES);

  // Recalculated only when the data or the search / filter changes.
  const statistics = useMemo(() => calculateMenuStatistics(menuItems), [menuItems]);
  const visibleItems = useMemo(
    () => filterMenuItems(menuItems, searchText, selectedCourse),
    [menuItems, searchText, selectedCourse]
  );

  const isFiltering = searchText.trim() !== '' || selectedCourse !== ALL_COURSES;

  const clearSearchAndFilter = () => {
    setSearchText('');
    setSelectedCourse(ALL_COURSES);
  };

  // Ask before deleting so the chef cannot remove a dish by accident.
  const confirmDelete = (item) => {
    Alert.alert('Delete menu item', `Are you sure you want to delete "${item.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(item) },
    ]);
  };

  const renderEmpty = () =>
    menuItems.length === 0 ? (
      <EmptyState
        title="Your menu is empty"
        message='Tap "+ Add Menu Item" to create your first dish.'
      />
    ) : (
      <EmptyState
        title="No dishes found"
        message="No menu items match your search or filter."
        actionLabel="Clear search and filter"
        onAction={clearSearchAndFilter}
      />
    );

  return (
    <View style={styles.container}>
      <AppHeader title="Restaurant Menu Manager" />
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Menu Items</Text>
          <AppButton label="+ Add Menu Item" size="small" onPress={onAdd} />
        </View>

        <FeedbackBanner feedback={feedback} />
        <StatsPanel statistics={statistics} />
        <SearchBar value={searchText} onChangeText={setSearchText} />
        <CourseFilter selectedCourse={selectedCourse} onSelect={setSelectedCourse} />

        {isFiltering && (
          <View style={styles.resultsRow}>
            <Text style={styles.resultsText}>
              Showing {visibleItems.length} of {menuItems.length} items
            </Text>
            <AppButton label="Clear" variant="secondary" size="small" onPress={clearSearchAndFilter} />
          </View>
        )}

        <FlatList
          data={visibleItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MenuItemCard item={item} onEdit={onEdit} onDelete={confirmDelete} />
          )}
          ListEmptyComponent={renderEmpty}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: SPACING.lg },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.textDark },
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  resultsText: { fontSize: 13, color: COLORS.textMuted },
  listContent: { paddingBottom: SPACING.xl },
});
