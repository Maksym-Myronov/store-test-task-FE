import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basketItem: []
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      action.payload.forEach((newMovie) => {
        const existingMovie = state.basketItem.find(
          (item) => item.id === newMovie.id
        );
        if (!existingMovie) {
          state.basketItem.push({
            ...newMovie,
            count: 1,
            priceTotal: newMovie.price
          });
        }
      });
    },
    incrementCount: (state, action) => {
      const { payload: id } = action;
      const card = state.basketItem.find((item) => item.id === id);
      if (card) {
        state.basketItem = state.basketItem.map((item) =>
          item.id === id
            ? {
                ...item,
                count: item.count + 1,
                priceTotal: (item.count + 1) * card.price
              }
            : item
        );
      }
    },
    decrementCount: (state, action) => {
      const { payload: id } = action;
      state.basketItem = state.basketItem.map((item) => {
        if (item.id === id) {
          const newCount = Math.max(0, item.count - 1);
          const newPriceTotal = newCount * item.price;
          return { ...item, count: newCount, priceTotal: newPriceTotal };
        } else {
          return item;
        }
      });
      state.basketItem = state.basketItem.filter((item) => item.count > 0);
    },
    emptyArray: (state) => {
      state.basketItem = [];
    }
  }
});

export default basketSlice.reducer;
export const { addToBasket, incrementCount, decrementCount, emptyArray } =
  basketSlice.actions;
