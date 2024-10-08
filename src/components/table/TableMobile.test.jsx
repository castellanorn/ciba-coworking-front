import { render, screen } from '@testing-library/react';
import TableMobile from './TableMobile'; // Asegúrate de que la ruta sea correcta

describe('Componente TableMobile', () => {
    const mockData = [
        {
            id: 1,
            spaceDTO: {
                spaceType: 'Espai reservat',
                name: 'Taula 1',
            },
            startTime: '10:00',
            endTime: '12:00',
            startDate: '2024-10-01',
            endDate: '2024-10-01',
        },
        {
            id: 2,
            spaceDTO: {
                spaceType: 'Otro espai',
                name: 'Taula 2',
            },
            startTime: '12:00',
            endTime: '14:00',
            startDate: '2024-10-01',
            endDate: '2024-10-01',
        },
    ];

    test('renderiza correctamente el tipo reserveUser', () => {
        render(<TableMobile data={mockData} type="reserveUser" actions={[]} />);

        // Verifica que haya 2 elementos con el texto "Espai reservat:"
        const reserveElements = screen.getAllByText(/Espai reservat:/i);
        expect(reserveElements.length).toBe(2); // Asegúrate de que haya 2 elementos

        // Verifica el contenido adicional para Taula 1
        expect(screen.getByText(/Taula 1/i)).toBeTruthy();
        expect(screen.getByText(/10:00 - 12:00, 2024-10-01 - 2024-10-01/i)).toBeTruthy();

        // Verifica el contenido adicional para Taula 2
        expect(screen.getByText(/Taula 2/i)).toBeTruthy();
        expect(screen.getByText(/12:00 - 14:00, 2024-10-01 - 2024-10-01/i)).toBeTruthy();
    });
});
