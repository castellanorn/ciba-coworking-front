import { render, screen, fireEvent } from '@testing-library/react';
import EditButton from './EditButton'; // Ajusta la ruta según sea necesario
import { describe, it, expect, vi } from 'vitest';

describe('EditButton Component', () => {
  
  it('should render the EditButton with the edit icon', () => {
    render(<EditButton />);
    const button = screen.getByRole('button'); // Busca el botón
    expect(button).toBeInTheDocument(); // Verifica que el botón esté en el documento

    // Verifica que el botón contenga un SVG
    const icon = button.querySelector('svg'); // Busca el SVG dentro del botón
    expect(icon).toBeInTheDocument(); // Asegura que el ícono SVG esté presente
  });

  it('should call onClick when clicked', () => {
    const mockOnClick = vi.fn(); // Crea una función simulada
    render(<EditButton onClick={mockOnClick} />);
    const button = screen.getByRole('button'); // Busca el botón
    fireEvent.click(button); // Simula un clic en el botón
    expect(mockOnClick).toHaveBeenCalled(); // Verifica que la función simulada fue llamada
  });

  it('should not crash if onClick is not provided', () => {
    render(<EditButton />);
    const button = screen.getByRole('button'); // Busca el botón
    expect(button).toBeInTheDocument(); // Asegura que el botón esté presente

    // Verifica que el botón contenga un SVG
    const icon = button.querySelector('svg'); // Busca el SVG dentro del botón
    expect(icon).toBeInTheDocument(); // Asegura que el ícono SVG esté presente
  });
});
