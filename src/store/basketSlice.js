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
      state.basketItem = state.basketItem.map((item) =>
        item.id === id ? { ...item, count: Math.max(0, item.count - 1) } : item
      );
      state.basketItem = state.basketItem.filter((item) => item.count > 0);
    }
  }
});

export default basketSlice.reducer;
export const { addToBasket, incrementCount, decrementCount } =
  basketSlice.actions;
