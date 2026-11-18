// App.js
// Root component. Owns the menu data (via a custom hook), decides which screen
// is visible and shows success / error feedback to the chef.
import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { COLORS, FEEDBACK_DURATION_MS } from './src/constants/theme';
import { SCREENS } from './src/constants/menu';
import useMenuItems from './src/hooks/useMenuItems';
import MenuListScreen from './src/screens/MenuListScreen';
import MenuFormScreen from './src/screens/MenuFormScreen';

export default function App() {
  const { menuItems, addItem, updateItem, deleteItem } = useMenuItems();
  const [currentScreen, setCurrentScreen] = useState(SCREENS.LIST);
  const [editingItem, setEditingItem] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // ---------- Navigation helpers ----------
  const goToList = useCallback(() => {
    setEditingItem(null);
    setCurrentScreen(SCREENS.LIST);
  }, []);

  const goToAdd = () => {
    setEditingItem(null);
    setCurrentScreen(SCREENS.FORM);
  };

  const goToEdit = (item) => {
    setEditingItem(item);
    setCurrentScreen(SCREENS.FORM);
  };

  // ---------- Feedback banner ----------
  const showFeedback = (message, type = 'success') => {
    // The id makes sure the timer restarts even if the same message repeats.
    setFeedback({ id: Date.now(), message, type });
  };

  useEffect(() => {
    if (!feedback) return undefined;
    const timer = setTimeout(() => setFeedback(null), FEEDBACK_DURATION_MS);
    return () => clearTimeout(timer);
  }, [feedback]);

  // ---------- Android back button ----------
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (currentScreen !== SCREENS.LIST) {
        goToList();
        return true; // we handled it
      }
      return false; // let Android close the app
    });
    return () => subscription.remove();
  }, [currentScreen, goToList]);

  // ---------- Actions ----------
  const handleSave = (values) => {
    if (editingItem) {
      updateItem(editingItem.id, values);
      showFeedback(`"${values.name}" was updated successfully.`);
    } else {
      addItem(values);
      showFeedback(`"${values.name}" was added to the menu.`);
    }
    goToList();
  };

  const handleDelete = (item) => {
    deleteItem(item.id);
    showFeedback(`"${item.name}" was deleted from the menu.`, 'error');
    goToList();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {currentScreen === SCREENS.LIST ? (
        <MenuListScreen
          menuItems={menuItems}
          feedback={feedback}
          onAdd={goToAdd}
          onEdit={goToEdit}
          onDelete={handleDelete}
        />
      ) : (
        <MenuFormScreen
          itemToEdit={editingItem}
          onSave={handleSave}
          onCancel={goToList}
          onDelete={handleDelete}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
});
