import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './cardSlice';
import basketReducer from './basketSlice';

export const store = configureStore({
  reducer: {
    cards: cardReducer,
    basket: basketReducer
  }
});
