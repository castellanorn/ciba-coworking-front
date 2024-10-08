import { render, screen, fireEvent } from '@testing-library/react';
import EditButton from '../components/buttons/EditButton'; 
import { describe, it, expect, vi } from 'vitest';

describe('EditButton Component', () => {
  
  it('should render the EditButton with the edit icon', () => {
    render(<EditButton />);
    const button = screen.getByRole('button'); 
    expect(button).toBeInTheDocument(); 

    
    const icon = button.querySelector('svg'); 
    expect(icon).toBeInTheDocument(); 
  });

  it('should call onClick when clicked', () => {
    const mockOnClick = vi.fn(); 
    render(<EditButton onClick={mockOnClick} />);
    const button = screen.getByRole('button'); 
    fireEvent.click(button); 
    expect(mockOnClick).toHaveBeenCalled(); 
  });

  it('should not crash if onClick is not provided', () => {
    render(<EditButton />);
    const button = screen.getByRole('button'); 
    expect(button).toBeInTheDocument(); 

   
    const icon = button.querySelector('svg'); 
    expect(icon).toBeInTheDocument(); 
  });
});
