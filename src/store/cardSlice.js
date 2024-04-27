import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [],
  error: null,
  status: 'idle'
};

export const fetchCardsFromApi = createAsyncThunk(
  'cards/fetchCardsFromApi',
  async () => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
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
        state.cards = action.payload;
      })
      .addCase(fetchCardsFromApi.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default cardSlice.reducer;
