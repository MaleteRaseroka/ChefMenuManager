// src/utils/format.js
import { CURRENCY_SYMBOL } from '../constants/menu';

// 14.5 -> "$14.50"
export const formatPrice = (amount) => `${CURRENCY_SYMBOL}${Number(amount).toFixed(2)}`;

// Simple unique id for each menu item.
export const createId = () => `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
