import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import EmployeeTable from '../EmployeeTable';

const mockEmployees = [
  {
    id: '526',
    name: 'Harsh Adawe',
    email: 'harshada@gmail.com',
    mobile: '8766596126',
    country: 'india',
    state: 'Karnataka',
    district: 'Udupi',
  },
  {
    id: '531',
    name: 'Gayatri Dhamak',
    email: 'dhamakgayatri2003@gmail.com',
    mobile: '8468912512',
    country: 'Aruba',
    state: 'Maharashtra',
    district: 'Amravati',
  },
];

describe('EmployeeTable Component', () => {
  it('renders employee data correctly in table', () => {
    render(
      <EmployeeTable
        employees={mockEmployees}
        isLoading={false}
        error={null}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText('Harsh Adawe')).toBeInTheDocument();
    expect(screen.getByText('harshada@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('8766596126')).toBeInTheDocument();
    expect(screen.getByText('Gayatri Dhamak')).toBeInTheDocument();
  });

  it('renders loading state when isLoading is true', () => {
    render(<EmployeeTable isLoading={true} employees={[]} />);
    // Skeleton loader rows rendered
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders empty state when employee list is empty', () => {
    render(<EmployeeTable isLoading={false} employees={[]} />);
    expect(screen.getByText(/No employees found/i)).toBeInTheDocument();
  });

  it('triggers onEdit callback when edit button is clicked', async () => {
    const handleEdit = vi.fn();
    render(
      <EmployeeTable
        employees={mockEmployees}
        isLoading={false}
        onEdit={handleEdit}
        onDelete={vi.fn()}
      />
    );

    const editButtons = screen.getAllByRole('button', { name: /edit employee/i });
    await userEvent.click(editButtons[0]);

    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledWith(mockEmployees[0]);
  });

  it('triggers onDelete callback when delete button is clicked', async () => {
    const handleDelete = vi.fn();
    render(
      <EmployeeTable
        employees={mockEmployees}
        isLoading={false}
        onEdit={vi.fn()}
        onDelete={handleDelete}
      />
    );

    const deleteButtons = screen.getAllByRole('button', { name: /delete employee/i });
    await userEvent.click(deleteButtons[0]);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(mockEmployees[0]);
  });
});
