// src/hooks/useMenuItems.js
// Custom hook that holds the menu array and the three data operations.
// Because it uses useState, every screen updates immediately after a change.
import { useState } from 'react';
import { createId } from '../utils/format';

export default function useMenuItems() {
  const [menuItems, setMenuItems] = useState([]);

  const addItem = ({ name, description, course, price }) => {
    const newItem = {
      id: createId(),
      name: name.trim(),
      description: description.trim(),
      course,
      price,
    };
    setMenuItems((current) => [...current, newItem]);
  };

  const updateItem = (id, { name, description, course, price }) => {
    setMenuItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, name: name.trim(), description: description.trim(), course, price }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setMenuItems((current) => current.filter((item) => item.id !== id));
  };

  return { menuItems, addItem, updateItem, deleteItem };
}
