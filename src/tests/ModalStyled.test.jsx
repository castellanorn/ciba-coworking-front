import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/popup/Modal'; // Asegúrate de que la ruta sea correcta
import { describe, test, expect, vi } from 'vitest'; // Importar desde Vitest

describe('Componente Modal', () => {
    test('renderiza correctamente el modal cuando está abierto', () => {
        const onClose = vi.fn(); // Crear un mock para la función onClose
        render(
            <Modal open={true} onClose={onClose}>
                <div>Contenido del Modal</div>
            </Modal>
        );

        // Verifica que el contenido del modal esté presente
        expect(screen.getByText(/Contenido del Modal/i)).toBeTruthy(); // Vitest usa toBeTruthy
    });

    test('no renderiza el modal cuando está cerrado', () => {
        const onClose = vi.fn();
        const { container } = render(
            <Modal open={false} onClose={onClose}>
                <div>Contenido del Modal</div>
            </Modal>
        );

        // Verifica que el modal no esté en el DOM
        expect(container.firstChild).toBeNull(); // Verifica que el modal no se renderiza
    });

    test('cierra el modal al hacer clic en el fondo', () => {
        const onClose = vi.fn();
        render(
            <Modal open={true} onClose={onClose}>
                <div>Contenido del Modal</div>
            </Modal>
        );

        // Selecciona el ModalBackground buscando el primer elemento que envuelve al ModalContainer
        const modalBackground = screen.getByText(/Contenido del Modal/i).parentElement.parentElement;

        // Simula un clic en el fondo del modal
        fireEvent.click(modalBackground);
        expect(onClose).toHaveBeenCalledTimes(1); // Verifica que onClose haya sido llamado
    });

    test('cierra el modal al hacer clic en el botón de cierre', () => {
        const onClose = vi.fn();
        render(
            <Modal open={true} onClose={onClose}>
                <div>Contenido del Modal</div>
            </Modal>
        );

        // Simula un clic en el botón de cierre
        fireEvent.click(screen.getByRole('button', { name: /×/ })); // Click en el botón de cierre
        expect(onClose).toHaveBeenCalledTimes(1); // Verifica que onClose haya sido llamado
    });
});
