import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import EmployeeForm from '../EmployeeForm';

describe('EmployeeForm Component', () => {
  const mockCountries = [
    { id: '1', country: 'Aruba' },
    { id: '2', country: 'India' },
  ];

  it('renders form inputs and title in Create mode', () => {
    render(
      <EmployeeForm
        open={true}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        countries={mockCountries}
      />
    );

    expect(screen.getByText('Add New Employee')).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/District/i)).toBeInTheDocument();
  });

  it('pre-populates employee data in Edit mode', () => {
    const initialEmp = {
      id: '526',
      name: 'Harsh Adawe',
      email: 'harshada@gmail.com',
      mobile: '8766596126',
      country: 'India',
      state: 'Karnataka',
      district: 'Udupi',
    };

    render(
      <EmployeeForm
        open={true}
        initialData={initialEmp}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        countries={mockCountries}
      />
    );

    expect(screen.getByText('Edit Employee Record')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Harsh Adawe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('harshada@gmail.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('8766596126')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Karnataka')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Udupi')).toBeInTheDocument();
  });

  it('shows required field validation errors on empty submit', async () => {
    render(
      <EmployeeForm
        open={true}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        countries={mockCountries}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /Create Employee/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Full name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Mobile phone number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/State is required/i)).toBeInTheDocument();
      expect(screen.getByText(/District is required/i)).toBeInTheDocument();
    });
  });

  it('shows email format validation error when email is invalid', async () => {
    render(
      <EmployeeForm
        open={true}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        countries={mockCountries}
      />
    );

    const emailInput = screen.getByLabelText(/Email Address/i);
    await userEvent.type(emailInput, 'invalid-email');

    const submitBtn = screen.getByRole('button', { name: /Create Employee/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });
});
