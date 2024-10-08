import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Map from './Map'; 

describe('Map', () => {
    it('Renderiza correctamente el componente Map', () => {
        render(<Map />);
        
        // Verifica que el texto "Selecciona taula:" esté en el documento
        expect(screen.getByText(/selecciona taula:/i)).toBeInTheDocument();

        // Verifica que la imagen del mapa esté en el documento
        const mapImage = screen.getByAltText(/map/i);
        expect(mapImage).toBeInTheDocument();
        expect(mapImage).toHaveAttribute('src', expect.stringContaining('plano.svg')); 
    });
});
