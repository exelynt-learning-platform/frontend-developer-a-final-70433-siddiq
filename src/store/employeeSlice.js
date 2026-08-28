import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import employeeService from '../services/employeeService';

export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const data = await employeeService.getAll();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch employees.');
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  'employee/fetchEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await employeeService.getById(id);
      if (!data || (typeof data === 'string' && data.toLowerCase().includes('not found'))) {
        return rejectWithValue('Employee not found.');
      }
      return data;
    } catch (err) {
      if (err.message?.includes('404') || err.message?.toLowerCase().includes('not found')) {
        return rejectWithValue('Employee not found.');
      }
      return rejectWithValue(err.message || 'Error searching employee by ID.');
    }
  }
);

export const createEmployee = createAsyncThunk(
  'employee/createEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const newEmployee = await employeeService.create(employeeData);
      return newEmployee;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to create employee.');
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const updatedEmployee = await employeeService.update(id, data);
      return updatedEmployee;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to update employee.');
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (id, { rejectWithValue }) => {
    try {
      await employeeService.delete(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to delete employee.');
    }
  }
);

const initialState = {
  employees: [],
  selectedEmployee: null,
  
  // Search state
  searchResult: null,
  searchStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'not_found' | 'failed'
  searchError: null,
  
  // Main list fetch state
  loading: false,
  error: null,
  
  // Mutation action states (create / update / delete)
  actionLoading: false,
  actionError: null,
  actionSuccessMessage: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    clearSearchResult: (state) => {
      state.searchResult = null;
      state.searchStatus = 'idle';
      state.searchError = null;
    },
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
    clearActionNotification: (state) => {
      state.actionError = null;
      state.actionSuccessMessage = null;
    },
    clearEmployeeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load employees.';
      })

      // Fetch Employee By ID (Search)
      .addCase(fetchEmployeeById.pending, (state) => {
        state.searchStatus = 'loading';
        state.searchResult = null;
        state.searchError = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchResult = action.payload;
        state.searchError = null;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        const isNotFound = action.payload === 'Employee not found.';
        state.searchStatus = isNotFound ? 'not_found' : 'failed';
        state.searchResult = null;
        state.searchError = action.payload || 'Employee not found.';
      })

      // Create Employee
      .addCase(createEmployee.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
        state.actionSuccessMessage = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.employees.unshift(action.payload);
        state.actionSuccessMessage = 'Employee created successfully!';
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload || 'Failed to create employee.';
      })

      // Update Employee
      .addCase(updateEmployee.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
        state.actionSuccessMessage = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.employees.findIndex(
          (emp) => String(emp.id) === String(action.payload.id)
        );
        if (index !== -1) {
          state.employees[index] = { ...state.employees[index], ...action.payload };
        }
        if (state.searchResult && String(state.searchResult.id) === String(action.payload.id)) {
          state.searchResult = { ...state.searchResult, ...action.payload };
        }
        state.actionSuccessMessage = 'Employee updated successfully!';
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload || 'Failed to update employee.';
      })

      // Delete Employee
      .addCase(deleteEmployee.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
        state.actionSuccessMessage = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.actionLoading = false;
        const deletedId = action.payload;
        state.employees = state.employees.filter((emp) => String(emp.id) !== String(deletedId));
        if (state.searchResult && String(state.searchResult.id) === String(deletedId)) {
          state.searchResult = null;
          state.searchStatus = 'idle';
        }
        state.actionSuccessMessage = 'Employee deleted successfully!';
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload || 'Failed to delete employee.';
      });
  },
});

export const {
  clearSearchResult,
  setSelectedEmployee,
  clearSelectedEmployee,
  clearActionNotification,
  clearEmployeeError,
} = employeeSlice.actions;

export const selectEmployees = (state) => state.employee.employees;
export const selectSelectedEmployee = (state) => state.employee.selectedEmployee;
export const selectEmployeeLoading = (state) => state.employee.loading;
export const selectEmployeeError = (state) => state.employee.error;

export const selectSearchResult = (state) => state.employee.searchResult;
export const selectSearchStatus = (state) => state.employee.searchStatus;
export const selectSearchError = (state) => state.employee.searchError;

export const selectActionLoading = (state) => state.employee.actionLoading;
export const selectActionError = (state) => state.employee.actionError;
export const selectActionSuccessMessage = (state) => state.employee.actionSuccessMessage;

export default employeeSlice.reducer;
