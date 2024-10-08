import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest'; 
import PopUpConfirmReserve from './PopUpConfirmReserve'; 
import { ButtonConfirm, ButtonCancel } from '../../buttons/ButtonStyled'; 

describe('PopUpConfirmReserve', () => {
    const mockOnConfirm = vi.fn(); 
    const mockOnCancel = vi.fn(); 

    test('Renderiza el pop-up de confirmación correctamente', () => {
        render(
            <PopUpConfirmReserve 
                open={true} 
                onConfirm={mockOnConfirm} 
                onCancel={mockOnCancel} 
                table="A1" 
                pageType="table" 
                slot="10:00 AM - 11:00 AM" 
                month="Octubre" 
                day="10" 
                button={{ confirmText: 'Confirmar', cancelText: 'Cancelar', deleteText: 'Eliminar' }} 
                actionType="confirm" 
            />
        );

        expect(screen.getByText(/confirmar reserva taula/i)).toBeInTheDocument();
        expect(screen.getByText(/taula: a1/i)).toBeInTheDocument();
    });

    test('Llama a onConfirm al hacer click en el botón de confirmar', () => {
        render(
            <PopUpConfirmReserve 
                open={true} 
                onConfirm={mockOnConfirm} 
                onCancel={mockOnCancel} 
                table="A1" 
                pageType="table" 
                slot="10:00 AM - 11:00 AM" 
                month="Octubre" 
                day="10" 
                button={{ confirmText: 'Confirmar', cancelText: 'Cancelar', deleteText: 'Eliminar' }} 
                actionType="confirm" 
            />
        );

        const confirmButton = screen.getByRole('button', { name: /confirmar/i });
        fireEvent.click(confirmButton);
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    test('Llama a onCancel al hacer click en el botón de cancelar', () => {
        render(
            <PopUpConfirmReserve 
                open={true} 
                onConfirm={mockOnConfirm} 
                onCancel={mockOnCancel} 
                table="A1" 
                pageType="table" 
                slot="10:00 AM - 11:00 AM" 
                month="Octubre" 
                day="10" 
                button={{ confirmText: 'Confirmar', cancelText: 'Cancelar', deleteText: 'Eliminar' }} 
                actionType="confirm" 
            />
        );

        const cancelButton = screen.getByRole('button', { name: /cancelar/i });
        fireEvent.click(cancelButton);
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
});
