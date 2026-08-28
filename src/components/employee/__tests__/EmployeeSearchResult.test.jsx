import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import EmployeeSearchResult from '../EmployeeSearchResult';

describe('EmployeeSearchResult Component', () => {
  const mockFoundEmployee = {
    id: '526',
    name: 'Harsh Adawe',
    email: 'harshada@gmail.com',
    mobile: '8766596126',
    country: 'india',
    state: 'Karnataka',
    district: 'Udupi',
  };

  it('renders nothing when searchStatus is idle', () => {
    const { container } = render(
      <EmployeeSearchResult searchStatus="idle" searchResult={null} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders employee card when search succeeds', () => {
    render(
      <EmployeeSearchResult
        searchStatus="succeeded"
        searchResult={mockFoundEmployee}
        onClearSearch={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText('Harsh Adawe')).toBeInTheDocument();
    expect(screen.getByText('ID: 526')).toBeInTheDocument();
    expect(screen.getByText(/harshada@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/8766596126/i)).toBeInTheDocument();
  });

  it('renders clear not-found message when employee is not found', () => {
    render(
      <EmployeeSearchResult
        searchStatus="not_found"
        searchError="Employee not found."
        onClearSearch={vi.fn()}
      />
    );

    expect(screen.getByText(/Employee not found/i)).toBeInTheDocument();
    expect(screen.getByText(/No matching employee record was found/i)).toBeInTheDocument();
  });
});
