// src/utils/menuHelpers.js
// Pure functions (no React) so they are easy to test and reuse.
import { ALL_COURSES, COURSES } from '../constants/menu';

// Search by dish name and/or filter by course. Both are optional.
export function filterMenuItems(menuItems, searchText, selectedCourse) {
  const query = searchText.trim().toLowerCase();
  return menuItems.filter((item) => {
    const matchesCourse = selectedCourse === ALL_COURSES || item.course === selectedCourse;
    const matchesSearch = query === '' || item.name.toLowerCase().includes(query);
    return matchesCourse && matchesSearch;
  });
}

// Total items, average price and the number of items in each course.
export function calculateMenuStatistics(menuItems) {
  const totalItems = menuItems.length;
  const totalPrice = menuItems.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = totalItems === 0 ? 0 : totalPrice / totalItems;

  const courseCounts = {};
  COURSES.forEach((course) => {
    courseCounts[course] = menuItems.filter((item) => item.course === course).length;
  });

  return { totalItems, averagePrice, courseCounts };
}
