import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basketItem: []
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.basketItem.push({ ...action.payload });
    }
  }
});

export default basketSlice.reducer;
export const { addToBasket } = basketSlice.actions;
