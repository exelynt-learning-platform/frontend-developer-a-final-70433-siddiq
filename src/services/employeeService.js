import apiClient from './apiClient';

export const employeeService = {
  /**
   * Fetch all employees from API
   */
  async getAll() {
    const response = await apiClient.get('/employee');
    return response.data;
  },

  /**
   * Fetch employee by ID
   * @param {string|number} id
   */
  async getById(id) {
    const response = await apiClient.get(`/employee/${id}`);
    return response.data;
  },

  /**
   * Create new employee
   * @param {Object} data
   */
  async create(data) {
    const response = await apiClient.post('/employee', data);
    return response.data;
  },

  /**
   * Update existing employee
   * @param {string|number} id
   * @param {Object} data
   */
  async update(id, data) {
    const response = await apiClient.put(`/employee/${id}`, data);
    return response.data;
  },

  /**
   * Delete employee by ID
   * @param {string|number} id
   */
  async delete(id) {
    const response = await apiClient.delete(`/employee/${id}`);
    return response.data;
  },
};

export default employeeService;
