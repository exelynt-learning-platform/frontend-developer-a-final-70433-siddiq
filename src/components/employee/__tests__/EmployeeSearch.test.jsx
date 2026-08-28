import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import EmployeeSearch from '../EmployeeSearch';

describe('EmployeeSearch Component', () => {
  it('renders search input and button', () => {
    render(<EmployeeSearch onSearch={vi.fn()} onClear={vi.fn()} isLoading={false} />);

    expect(
      screen.getByPlaceholderText(/Search Employee by ID/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search ID/i })).toBeInTheDocument();
  });

  it('shows error if submitted with empty string', async () => {
    const handleSearch = vi.fn();
    render(<EmployeeSearch onSearch={handleSearch} onClear={vi.fn()} isLoading={false} />);

    const searchInput = screen.getByPlaceholderText(/Search Employee by ID/i);
    await userEvent.clear(searchInput);
    
    const submitBtn = screen.getByRole('button', { name: /Search ID/i });
    expect(submitBtn).toBeDisabled();
  });

  it('calls onSearch callback with entered ID when submitted', async () => {
    const handleSearch = vi.fn();
    render(<EmployeeSearch onSearch={handleSearch} onClear={vi.fn()} isLoading={false} />);

    const searchInput = screen.getByPlaceholderText(/Search Employee by ID/i);
    await userEvent.type(searchInput, '526');

    const submitBtn = screen.getByRole('button', { name: /Search ID/i });
    await userEvent.click(submitBtn);

    expect(handleSearch).toHaveBeenCalledWith('526');
  });

  it('calls onClear callback when clear button is clicked', async () => {
    const handleClear = vi.fn();
    render(<EmployeeSearch onSearch={vi.fn()} onClear={handleClear} isLoading={false} />);

    const searchInput = screen.getByPlaceholderText(/Search Employee by ID/i);
    await userEvent.type(searchInput, '526');

    const clearIconBtn = screen.getByLabelText(/clear search/i);
    await userEvent.click(clearIconBtn);

    expect(handleClear).toHaveBeenCalledTimes(1);
    expect(searchInput.value).toBe('');
  });
});
