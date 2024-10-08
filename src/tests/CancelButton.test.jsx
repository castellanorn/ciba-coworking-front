import { render, screen, fireEvent } from '@testing-library/react';
import CancelButton from '../components/buttons/CancelButton';
import { describe, it, expect, vi } from 'vitest';

describe('CancelButton Component', () => {
  it('should render the CancelButton with children', () => {
    render(<CancelButton>Cancel</CancelButton>);
    const button = screen.getByText('Cancel');
    expect(button).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const mockOnClick = vi.fn();
    render(<CancelButton onClick={mockOnClick}>Cancel</CancelButton>);
    const button = screen.getByText('Cancel');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
