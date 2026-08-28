import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import countryService from '../services/countryService';

export const fetchCountries = createAsyncThunk(
  'country/fetchCountries',
  async (_, { rejectWithValue }) => {
    try {
      const data = await countryService.getAll();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch country list.');
    }
  }
);

const initialState = {
  countries: [],
  loading: false,
  error: null,
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    clearCountryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load countries.';
      });
  },
});

export const { clearCountryError } = countrySlice.actions;

export const selectCountries = (state) => state.country.countries;
export const selectCountryLoading = (state) => state.country.loading;
export const selectCountryError = (state) => state.country.error;

export default countrySlice.reducer;
