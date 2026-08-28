import { describe, it, expect, vi, beforeEach } from 'vitest';
import employeeService from '../employeeService';
import apiClient from '../apiClient';

vi.mock('../apiClient', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('employeeService API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAll should fetch list of employees', async () => {
    const mockData = [{ id: '1', name: 'John Doe', email: 'john@example.com' }];
    apiClient.get.mockResolvedValueOnce({ data: mockData });

    const result = await employeeService.getAll();

    expect(apiClient.get).toHaveBeenCalledWith('/employee');
    expect(result).toEqual(mockData);
  });

  it('getById should fetch employee by ID', async () => {
    const mockEmp = { id: '526', name: 'Harsh' };
    apiClient.get.mockResolvedValueOnce({ data: mockEmp });

    const result = await employeeService.getById('526');

    expect(apiClient.get).toHaveBeenCalledWith('/employee/526');
    expect(result).toEqual(mockEmp);
  });

  it('create should post new employee data', async () => {
    const newEmp = { name: 'Alice', email: 'alice@example.com' };
    const createdEmp = { id: '100', ...newEmp };
    apiClient.post.mockResolvedValueOnce({ data: createdEmp });

    const result = await employeeService.create(newEmp);

    expect(apiClient.post).toHaveBeenCalledWith('/employee', newEmp);
    expect(result).toEqual(createdEmp);
  });

  it('update should put updated employee data', async () => {
    const updateData = { name: 'Alice Smith' };
    const updatedEmp = { id: '100', ...updateData };
    apiClient.put.mockResolvedValueOnce({ data: updatedEmp });

    const result = await employeeService.update('100', updateData);

    expect(apiClient.put).toHaveBeenCalledWith('/employee/100', updateData);
    expect(result).toEqual(updatedEmp);
  });

  it('delete should call delete endpoint', async () => {
    apiClient.delete.mockResolvedValueOnce({ data: { id: '100' } });

    const result = await employeeService.delete('100');

    expect(apiClient.delete).toHaveBeenCalledWith('/employee/100');
    expect(result).toEqual({ id: '100' });
  });
});
