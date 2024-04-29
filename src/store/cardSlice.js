import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [],
  error: null,
  status: 'idle'
};

export const fetchCardsFromApi = createAsyncThunk(
  'cards/fetchCardsFromApi',
  async () => {
    const response = await fetch(`https://fakestoreapi.com/products`);
    const data = await response.json();
    return { cards: data };
  }
);

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardsFromApi.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCardsFromApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.cards) {
          state.cards = action.payload.cards.map((item) => ({
            ...item,
            count: 1
          }));
        }
      })
      .addCase(fetchCardsFromApi.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default cardSlice.reducer;
