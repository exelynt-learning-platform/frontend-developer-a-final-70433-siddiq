import { describe, it, expect } from 'vitest';
import employeeReducer, {
  clearSearchResult,
  setSelectedEmployee,
  clearSelectedEmployee,
  clearActionNotification,
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  fetchEmployeeById,
} from '../employeeSlice';

describe('employeeSlice Reducer & Actions', () => {
  const initialState = {
    employees: [],
    selectedEmployee: null,
    searchResult: null,
    searchStatus: 'idle',
    searchError: null,
    loading: false,
    error: null,
    actionLoading: false,
    actionError: null,
    actionSuccessMessage: null,
  };

  it('should handle initial state', () => {
    expect(employeeReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle clearSearchResult', () => {
    const previousState = {
      ...initialState,
      searchResult: { id: '1', name: 'John' },
      searchStatus: 'succeeded',
      searchError: 'Some error',
    };
    const nextState = employeeReducer(previousState, clearSearchResult());
    expect(nextState.searchResult).toBeNull();
    expect(nextState.searchStatus).toBe('idle');
    expect(nextState.searchError).toBeNull();
  });

  it('should handle setSelectedEmployee and clearSelectedEmployee', () => {
    const emp = { id: '1', name: 'Jane' };
    let state = employeeReducer(initialState, setSelectedEmployee(emp));
    expect(state.selectedEmployee).toEqual(emp);

    state = employeeReducer(state, clearSelectedEmployee());
    expect(state.selectedEmployee).toBeNull();
  });

  it('should handle fetchEmployees.fulfilled', () => {
    const payload = [
      { id: '1', name: 'User 1' },
      { id: '2', name: 'User 2' },
    ];
    const action = { type: fetchEmployees.fulfilled.type, payload };
    const state = employeeReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.employees).toEqual(payload);
  });

  it('should handle createEmployee.fulfilled', () => {
    const previousState = {
      ...initialState,
      employees: [{ id: '1', name: 'User 1' }],
    };
    const newEmp = { id: '2', name: 'User 2' };
    const action = { type: createEmployee.fulfilled.type, payload: newEmp };
    const state = employeeReducer(previousState, action);

    expect(state.actionLoading).toBe(false);
    expect(state.employees).toHaveLength(2);
    expect(state.employees[0]).toEqual(newEmp);
    expect(state.actionSuccessMessage).toContain('created successfully');
  });

  it('should handle updateEmployee.fulfilled', () => {
    const previousState = {
      ...initialState,
      employees: [{ id: '1', name: 'User Old' }],
    };
    const updatedEmp = { id: '1', name: 'User New' };
    const action = { type: updateEmployee.fulfilled.type, payload: updatedEmp };
    const state = employeeReducer(previousState, action);

    expect(state.employees[0].name).toBe('User New');
  });

  it('should handle deleteEmployee.fulfilled', () => {
    const previousState = {
      ...initialState,
      employees: [{ id: '1', name: 'User 1' }, { id: '2', name: 'User 2' }],
    };
    const action = { type: deleteEmployee.fulfilled.type, payload: '1' };
    const state = employeeReducer(previousState, action);

    expect(state.employees).toHaveLength(1);
    expect(state.employees[0].id).toBe('2');
  });

  it('should handle fetchEmployeeById.rejected for not found', () => {
    const action = {
      type: fetchEmployeeById.rejected.type,
      payload: 'Employee not found.',
    };
    const state = employeeReducer(initialState, action);

    expect(state.searchStatus).toBe('not_found');
    expect(state.searchError).toBe('Employee not found.');
    expect(state.searchResult).toBeNull();
  });
});
