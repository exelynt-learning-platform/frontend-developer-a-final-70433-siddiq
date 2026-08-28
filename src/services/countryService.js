import apiClient from './apiClient';

export const countryService = {
  /**
   * Fetch list of countries from API
   */
  async getAll() {
    const response = await apiClient.get('/country');
    return response.data;
  },
};

export default countryService;
