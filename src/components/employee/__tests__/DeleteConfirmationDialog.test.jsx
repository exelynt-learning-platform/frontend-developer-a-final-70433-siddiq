import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog';

describe('DeleteConfirmationDialog Component', () => {
  const mockEmp = {
    id: '526',
    name: 'Harsh Adawe',
    email: 'harshada@gmail.com',
  };

  it('renders confirmation title and employee info', () => {
    render(
      <DeleteConfirmationDialog
        open={true}
        employee={mockEmp}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    expect(screen.getByText(/Confirm Employee Deletion/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to delete this employee/i)).toBeInTheDocument();
    expect(screen.getByText('Harsh Adawe')).toBeInTheDocument();
  });

  it('calls onConfirm when Delete button is clicked', async () => {
    const handleConfirm = vi.fn();
    render(
      <DeleteConfirmationDialog
        open={true}
        employee={mockEmp}
        onClose={vi.fn()}
        onConfirm={handleConfirm}
      />
    );

    const deleteBtn = screen.getByRole('button', { name: /^Delete Employee$/i });
    await userEvent.click(deleteBtn);

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Cancel button is clicked', async () => {
    const handleClose = vi.fn();
    render(
      <DeleteConfirmationDialog
        open={true}
        employee={mockEmp}
        onClose={handleClose}
        onConfirm={vi.fn()}
      />
    );

    const cancelBtn = screen.getByRole('button', { name: /Cancel/i });
    await userEvent.click(cancelBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
