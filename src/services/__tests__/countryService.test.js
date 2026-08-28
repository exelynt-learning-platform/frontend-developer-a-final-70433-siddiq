import { describe, it, expect, vi, beforeEach } from 'vitest';
import countryService from '../countryService';
import apiClient from '../apiClient';

vi.mock('../apiClient', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('countryService API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAll should fetch list of countries', async () => {
    const mockCountries = [
      { id: '1', country: 'Aruba' },
      { id: '2', country: 'Singapore' },
    ];
    apiClient.get.mockResolvedValueOnce({ data: mockCountries });

    const result = await countryService.getAll();

    expect(apiClient.get).toHaveBeenCalledWith('/country');
    expect(result).toEqual(mockCountries);
  });
});
