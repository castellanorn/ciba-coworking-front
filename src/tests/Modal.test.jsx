import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/popup/Modal'; 
import { describe, test, expect, vi } from 'vitest'; 

describe('Componente Modal', () => {
    test('renderiza correctamente el modal cuando está abierto', () => {
        const onClose = vi.fn(); 
        render(
            <Modal open={true} onClose={onClose}>
                <div>Contenido del Modal</div>
            </Modal>
        );

        expect(screen.getByText(/Contenido del Modal/i)).toBeTruthy(); 
    });

    test('no renderiza el modal cuando está cerrado', () => {
        const onClose = vi.fn();
        const { container } = render(
            <Modal open={false} onClose={onClose}>
                <div>Contenido del Modal</div>
            </Modal>
        );

        
        expect(container.firstChild).toBeNull(); 
    });

    test('cierra el modal al hacer clic en el fondo', () => {
        const onClose = vi.fn();
        render(
            <Modal open={true} onClose={onClose}>
                <div>Contenido del Modal</div>
            </Modal>
        );

        
        fireEvent.click(screen.getByText(/Contenido del Modal/i).parentNode.parentNode); 
        expect(onClose).toHaveBeenCalledTimes(1); 
    });

    test('cierra el modal al hacer clic en el botón de cierre', () => {
        const onClose = vi.fn();
        render(
            <Modal open={true} onClose={onClose}>
                <div>Contenido del Modal</div>
            </Modal>
        );

        
        fireEvent.click(screen.getByRole('button', { name: /×/ })); 
        expect(onClose).toHaveBeenCalledTimes(1); 
    });
});
