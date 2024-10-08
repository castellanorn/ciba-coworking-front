import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import PopUpSuccess from '../components/popup/reserve/PopUpSuccess'; 

describe('PopUpSuccess', () => {
    const mockOnClose = vi.fn(); 

    it('Renderiza correctamente el pop-up de éxito', () => {
        render(<PopUpSuccess open={true} onClose={mockOnClose} />);
        
        // Verifica que el texto "Reserva confirmada" esté en el documento
        expect(screen.getByText(/reserva confirmada/i)).toBeInTheDocument();

        // Verifica que el botón "Acceptar" esté en el documento
        expect(screen.getByRole('button', { name: /acceptar/i })).toBeInTheDocument();
    });

    it('Llama a onClose al hacer clic en el botón "Acceptar"', () => {
        render(<PopUpSuccess open={true} onClose={mockOnClose} />);
        
        const acceptButton = screen.getByRole('button', { name: /acceptar/i });
        fireEvent.click(acceptButton);
        
        // Verifica que la función onClose se haya llamado una vez
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('No renderiza el pop-up cuando la propiedad "open" es false', () => {
        render(<PopUpSuccess open={false} onClose={mockOnClose} />);
        
        // Verifica que el pop-up no esté en el documento
        expect(screen.queryByText(/reserva confirmada/i)).not.toBeInTheDocument();
    });
});
