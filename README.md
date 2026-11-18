# Chef's Menu Manager (Restaurant Menu Manager)

**Module:** Mobile App Scripting MAST5112 | **Assessment:** Portfolio of Evidence – Final PoE
**Student:** Malete Lethabo Josias Raseroka (ST10518036)

A React Native (Expo) Android app that lets Christoffel, the restaurant owner and chef, add, edit, delete, search, filter and review statistics for the restaurant's menu items.

## How to run
1. Clone the repository and open the folder in Visual Studio Code.
2. Run `npm install`
3. Run `npx expo install @react-native-picker/picker`
4. Run `npx expo start`
5. Press `a` to open the Android emulator, or scan the QR code with Expo Go.

## Features
- Add a menu item (dish name, description, course, price) with validation
- Edit an existing item (form is pre-filled) and save changes
- Delete an item (with a confirmation prompt) from the list or the edit screen
- Search by dish name; filter by Starter, Main Course or Dessert; clear the search / filter
- Menu statistics: total items, average price, number of items per course
- Success / error banners, inline validation messages and empty-state messages

## Project structure
```
App.js                      Root: screen switching, feedback banner, Android back button
src/constants/              theme.js (colours/spacing), menu.js (courses, limits, currency)
src/utils/                  validation.js, menuHelpers.js (filter + statistics), format.js
src/hooks/useMenuItems.js   Menu data + add / update / delete functions
src/components/             AppHeader, AppButton, FormField, CoursePicker, MenuItemCard,
                            SearchBar, CourseFilter, StatsPanel, FeedbackBanner, EmptyState
src/screens/                MenuListScreen (dashboard), MenuFormScreen (add + edit)
```

## Change log (since Part 2)

### New features
- **Edit menu items:** an Edit button on every card opens the form pre-filled with the dish's details; Save Changes updates the list immediately.
- **Delete menu items:** Delete on the card and on the edit screen, each with a confirmation alert; the list and statistics update immediately.
- **Search:** case-insensitive search by dish name with a clear (X) button.
- **Filter:** course chips (All, Starter, Main Course, Dessert); "All" and the Clear button reset the view.
- **Menu statistics:** collapsible panel showing total items, average price and items per course.
- **Feedback:** success banner for add/edit and a red banner for delete; "No dishes found" empty state with a clear button.

### Refactoring and improvements
- Split the single-file Part 2 code into `components`, `screens`, `hooks`, `utils` and `constants` folders.
- Merged the Add and Edit screens into one reusable `MenuFormScreen`.
- Created reusable components: `AppButton`, `FormField`, `CoursePicker`, `MenuItemCard`, `FeedbackBanner`, `EmptyState`.
- Moved the add / update / delete logic into the `useMenuItems` custom hook.
- Moved validation into `validateMenuItem` and search / statistics into pure functions in `menuHelpers.js`.
- Replaced repeated colours and spacing with shared constants (`theme.js`) and the courses / currency with `menu.js`.
- Improved validation: minimum and maximum lengths, numeric price greater than 0 with at most 2 decimals, errors cleared as the user types.
- Renamed variables and functions to meaningful names and added comments to every file.
- Added `useMemo` so filtering and statistics only recalculate when data changes.

## References
React, 2026. useMemo. [online] Available at: https://react.dev/reference/react/useMemo [Accessed 18 November 2026].
React Native, 2026. FlatList. [online] Available at: https://reactnative.dev/docs/flatlist [Accessed 18 November 2026].
