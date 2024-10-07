import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmButton from './ConfirmButton'; // Ajusta la ruta según sea necesario
import { describe, it, expect, vi } from 'vitest';

describe('ConfirmButton Component', () => {
  it('should render the ConfirmButton with children', () => {
    render(<ConfirmButton>Confirm</ConfirmButton>);
    const button = screen.getByText('Confirm');
    expect(button).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const mockOnClick = vi.fn(); // Crea una función simulada
    render(<ConfirmButton onClick={mockOnClick}>Confirm</ConfirmButton>);
    const button = screen.getByText('Confirm');
    fireEvent.click(button); // Simula un clic en el botón
    expect(mockOnClick).toHaveBeenCalled(); // Verifica que la función simulada fue llamada
  });

  it('should have the correct type attribute', () => {
    render(<ConfirmButton type="submit">Confirm</ConfirmButton>);
    const button = screen.getByText('Confirm');
    expect(button).toHaveAttribute('type', 'submit'); // Verifica que el tipo del botón sea 'submit'
  });
  it('should not throw an error if onClick is not provided', () => {
    render(<ConfirmButton>Confirm</ConfirmButton>);
    const button = screen.getByText('Confirm');
    expect(button).toBeInTheDocument(); // Solo asegura que no falle al renderizar
  });
  
});
