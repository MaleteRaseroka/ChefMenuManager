// src/constants/menu.js
// Fixed values that describe the menu domain.
export const COURSES = ['Starter', 'Main Course', 'Dessert'];

// Extra option used only by the filter chips.
export const ALL_COURSES = 'All';

export const SCREENS = { LIST: 'list', FORM: 'form' };

// Change this one symbol (e.g. to 'R') to change every price in the app.
export const CURRENCY_SYMBOL = '$';

export const VALIDATION_LIMITS = {
  nameMin: 2,
  nameMax: 50,
  descriptionMin: 10,
  descriptionMax: 150,
  priceMax: 10000,
};
