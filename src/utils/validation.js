// src/utils/validation.js
import { COURSES, VALIDATION_LIMITS } from '../constants/menu';

// Accepts "14.5", "14,50" or " 14.50 " and returns a number (or NaN).
export const parsePrice = (text) => Number(String(text).trim().replace(',', '.'));

// Returns an object of error messages. An empty object means the input is valid.
export function validateMenuItem({ name, description, course, price }) {
  const errors = {};
  const limits = VALIDATION_LIMITS;
  const trimmedName = name.trim();
  const trimmedDescription = description.trim();

  if (!trimmedName) {
    errors.name = 'Please enter the dish name.';
  } else if (trimmedName.length < limits.nameMin) {
    errors.name = `The dish name must be at least ${limits.nameMin} characters.`;
  } else if (trimmedName.length > limits.nameMax) {
    errors.name = `The dish name must be ${limits.nameMax} characters or fewer.`;
  }

  if (!trimmedDescription) {
    errors.description = 'Please enter a description.';
  } else if (trimmedDescription.length < limits.descriptionMin) {
    errors.description = `The description must be at least ${limits.descriptionMin} characters.`;
  } else if (trimmedDescription.length > limits.descriptionMax) {
    errors.description = `The description must be ${limits.descriptionMax} characters or fewer.`;
  }

  if (!COURSES.includes(course)) {
    errors.course = 'Please select a course.';
  }

  const priceText = String(price).trim();
  const priceNumber = parsePrice(priceText);
  if (!priceText) {
    errors.price = 'Please enter the price.';
  } else if (Number.isNaN(priceNumber)) {
    errors.price = 'The price must be a number, e.g. 14.99.';
  } else if (priceNumber <= 0) {
    errors.price = 'The price must be greater than 0.';
  } else if (priceNumber > limits.priceMax) {
    errors.price = `The price must not be more than ${limits.priceMax}.`;
  } else if (!/^\d+([.,]\d{1,2})?$/.test(priceText)) {
    errors.price = 'Use at most 2 decimal places, e.g. 14.99.';
  }

  return errors;
}
