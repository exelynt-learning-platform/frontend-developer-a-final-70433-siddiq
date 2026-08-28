import { describe, it, expect } from 'vitest';
import countryReducer, { fetchCountries, clearCountryError } from '../countrySlice';

describe('countrySlice Reducer & Actions', () => {
  const initialState = {
    countries: [],
    loading: false,
    error: null,
  };

  it('should return initial state', () => {
    expect(countryReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchCountries.pending', () => {
    const action = { type: fetchCountries.pending.type };
    const state = countryReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchCountries.fulfilled', () => {
    const payload = [{ id: '1', country: 'Aruba' }];
    const action = { type: fetchCountries.fulfilled.type, payload };
    const state = countryReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.countries).toEqual(payload);
  });

  it('should handle fetchCountries.rejected', () => {
    const action = { type: fetchCountries.rejected.type, payload: 'Network error' };
    const state = countryReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Network error');
  });

  it('should clear error with clearCountryError', () => {
    const prevState = { ...initialState, error: 'Err' };
    const state = countryReducer(prevState, clearCountryError());
    expect(state.error).toBeNull();
  });
});
