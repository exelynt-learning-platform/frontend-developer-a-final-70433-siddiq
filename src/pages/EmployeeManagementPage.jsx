import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Snackbar, Alert } from '@mui/material';

// Store imports
import {
  fetchEmployees,
  fetchEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  clearSearchResult,
  setSelectedEmployee,
  clearSelectedEmployee,
  clearActionNotification,
  selectEmployees,
  selectSelectedEmployee,
  selectEmployeeLoading,
  selectEmployeeError,
  selectSearchResult,
  selectSearchStatus,
  selectSearchError,
  selectActionLoading,
  selectActionError,
  selectActionSuccessMessage,
} from '../store/employeeSlice';

import {
  fetchCountries,
  selectCountries,
  selectCountryLoading,
} from '../store/countrySlice';

// Dumb components imports
import Header from '../components/common/Header';
import EmployeeSearch from '../components/employee/EmployeeSearch';
import EmployeeSearchResult from '../components/employee/EmployeeSearchResult';
import EmployeeTable from '../components/employee/EmployeeTable';
import EmployeeForm from '../components/employee/EmployeeForm';
import DeleteConfirmationDialog from '../components/employee/DeleteConfirmationDialog';

export const EmployeeManagementPage = () => {
  const dispatch = useDispatch();

  // Redux Selectors
  const employees = useSelector(selectEmployees);
  const selectedEmployee = useSelector(selectSelectedEmployee);
  const isLoading = useSelector(selectEmployeeLoading);
  const error = useSelector(selectEmployeeError);

  const searchResult = useSelector(selectSearchResult);
  const searchStatus = useSelector(selectSearchStatus);
  const searchError = useSelector(selectSearchError);

  const countries = useSelector(selectCountries);
  const countryLoading = useSelector(selectCountryLoading);

  const actionLoading = useSelector(selectActionLoading);
  const actionError = useSelector(selectActionError);
  const actionSuccessMessage = useSelector(selectActionSuccessMessage);

  // Local Modal & Dialog States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Fetch initial data on mount
  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchCountries());
  }, [dispatch]);

  // Handlers
  const handleOpenAddForm = () => {
    dispatch(clearSelectedEmployee());
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (employee) => {
    dispatch(setSelectedEmployee(employee));
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    dispatch(clearSelectedEmployee());
  };

  const handleFormSubmit = async (formData) => {
    if (selectedEmployee?.id) {
      // Update employee
      const resultAction = await dispatch(
        updateEmployee({ id: selectedEmployee.id, data: formData })
      );
      if (updateEmployee.fulfilled.match(resultAction)) {
        setIsFormOpen(false);
        dispatch(clearSelectedEmployee());
      }
    } else {
      // Create employee
      const resultAction = await dispatch(createEmployee(formData));
      if (createEmployee.fulfilled.match(resultAction)) {
        setIsFormOpen(false);
      }
    }
  };

  const handleSearch = (id) => {
    dispatch(fetchEmployeeById(id));
  };

  const handleClearSearch = () => {
    dispatch(clearSearchResult());
  };

  const handleOpenDeleteDialog = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteOpen(false);
    setEmployeeToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!employeeToDelete?.id) return;
    const resultAction = await dispatch(deleteEmployee(employeeToDelete.id));
    if (deleteEmployee.fulfilled.match(resultAction)) {
      handleCloseDeleteDialog();
    }
  };

  const handleCloseNotification = () => {
    dispatch(clearActionNotification());
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 6 }}>
      {/* Header Container */}
      <Header totalEmployees={employees.length} onAddClick={handleOpenAddForm} />

      {/* Main Content Area */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Search Bar */}
        <EmployeeSearch
          onSearch={handleSearch}
          onClear={handleClearSearch}
          isLoading={searchStatus === 'loading'}
        />

        {/* Search Result Card or Employee Not Found state */}
        <EmployeeSearchResult
          searchResult={searchResult}
          searchStatus={searchStatus}
          searchError={searchError}
          onClearSearch={handleClearSearch}
          onEdit={handleOpenEditForm}
          onDelete={handleOpenDeleteDialog}
        />

        {/* Employee List Table */}
        <EmployeeTable
          employees={employees}
          isLoading={isLoading}
          error={error}
          onRetry={() => dispatch(fetchEmployees())}
          onEdit={handleOpenEditForm}
          onDelete={handleOpenDeleteDialog}
          onAddClick={handleOpenAddForm}
        />
      </Container>

      {/* Add / Edit Form Modal */}
      <EmployeeForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        initialData={selectedEmployee}
        countries={countries}
        countryLoading={countryLoading}
        isSubmitting={actionLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationDialog
        open={isDeleteOpen}
        employee={employeeToDelete}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        isDeleting={actionLoading}
      />

      {/* Action Success Snackbar */}
      <Snackbar
        open={Boolean(actionSuccessMessage)}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity="success" variant="filled" sx={{ borderRadius: 2 }}>
          {actionSuccessMessage}
        </Alert>
      </Snackbar>

      {/* Action Error Snackbar */}
      <Snackbar
        open={Boolean(actionError)}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity="error" variant="filled" sx={{ borderRadius: 2 }}>
          {actionError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeeManagementPage;
