import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { describe, test, expect, vi } from 'vitest';
import PopUpConfirmReserve from '../components/popup/reserve/PopUpConfirmReserve'; 

describe('PopUpConfirmReserve Component', () => {
  const mockOnConfirm = vi.fn();
  const mockOnCancel = vi.fn();
  const buttonText = {
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    deleteText: 'Eliminar'
  };

  const defaultProps = {
    open: true,
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
    table: '5',
    pageType: 'office',
    slot: '10:00 - 11:00',
    month: 'Octubre',
    day: '5',
    button: buttonText,
    actionType: 'confirm'
  };

  test('Renderiza correctamente el texto para una reserva de oficina', () => {
    render(<PopUpConfirmReserve {...defaultProps} />);
    
    // Verifica que el título se renderiza correctamente
    expect(screen.getByText('Confirmar reserva oficina')).toBeInTheDocument();
    
    // Verifica que la fecha y la hora se muestren correctamente
    expect(screen.getByText(/10:00 - 11:00/i)).toBeInTheDocument();
    expect(screen.getByText(/Octubre 5/i)).toBeInTheDocument();

    // Verifica que el espacio reservado se muestre correctamente
    expect(screen.getByText('Espai reservat: Oficina privada')).toBeInTheDocument();

    // Verifica que el número de mesa se muestre
    expect(screen.getByText('Taula: 5')).toBeInTheDocument();

    // Verifica los textos de los botones
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  test('Renderiza correctamente el texto para eliminar una reserva de oficina', () => {
    render(<PopUpConfirmReserve {...defaultProps} actionType="delete" />);
    
    // Verifica que el título se renderiza correctamente
    expect(screen.getByText('Eliminar reserva oficina')).toBeInTheDocument();

    // Verifica los textos de los botones
    expect(screen.getByText('Eliminar')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  test('Llama a la función onConfirm cuando se hace click en el botón de confirmar', () => {
    render(<PopUpConfirmReserve {...defaultProps} />);
    
    const confirmButton = screen.getByText('Confirmar');
    fireEvent.click(confirmButton);

    // Verifica que se haya llamado a la función onConfirm
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  test('Llama a la función onCancel cuando se hace click en el botón de cancelar', () => {
    render(<PopUpConfirmReserve {...defaultProps} />);
    
    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    // Verifica que se haya llamado a la función onCancel
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test('Renderiza correctamente el texto para una reserva de taula', () => {
    render(<PopUpConfirmReserve {...defaultProps} pageType="table" />);
    
    // Verifica que el título se renderiza correctamente
    expect(screen.getByText('Confirmar reserva taula')).toBeInTheDocument();

    // Verifica que el número de mesa se muestre
    expect(screen.getByText('Taula: 5')).toBeInTheDocument();
  });
});
