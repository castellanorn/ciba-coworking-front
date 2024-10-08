import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmButton from '../components/buttons/ConfirmButton'; 
import { describe, it, expect, vi } from 'vitest';

describe('ConfirmButton Component', () => {
  it('should render the ConfirmButton with children', () => {
    render(<ConfirmButton>Confirm</ConfirmButton>);
    const button = screen.getByText('Confirm');
    expect(button).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const mockOnClick = vi.fn(); 
    render(<ConfirmButton onClick={mockOnClick}>Confirm</ConfirmButton>);
    const button = screen.getByText('Confirm');
    fireEvent.click(button); 
    expect(mockOnClick).toHaveBeenCalled(); 
  });

  it('should have the correct type attribute', () => {
    render(<ConfirmButton type="submit">Confirm</ConfirmButton>);
    const button = screen.getByText('Confirm');
    expect(button).toHaveAttribute('type', 'submit'); 
  });
  it('should render without crashing when onClick is not provided', () => {
    render(<ConfirmButton>Confirm</ConfirmButton>);
    const button = screen.getByText('Confirm');
    expect(button).toBeInTheDocument();
  });
  it('should have type "button" by default', () => {
    render(<ConfirmButton>Confirm</ConfirmButton>);
    const button = screen.getByText('Confirm');
    expect(button).toHaveAttribute('type', 'button'); 
  });
  
});
