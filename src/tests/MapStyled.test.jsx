import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { Plano, MapContainer, TitleSelectTable } from '../components/map/MapStyled'; // Ajusta la ruta según sea necesario

describe('Styled Components', () => {
    it('Renderiza el componente Plano correctamente', () => {
        const { container } = render(<Plano src="test-image.png" alt="map" />);
        const planoElement = container.firstChild;

        // Verifica que el componente se haya renderizado
        expect(planoElement).toBeInTheDocument();
        expect(planoElement).toHaveAttribute('src', 'test-image.png');
        expect(planoElement).toHaveAttribute('alt', 'map');

        // Verifica que el ancho sea de 290px
        expect(planoElement).toHaveStyle('width: 290px');
        expect(planoElement).toHaveStyle('color: var(--ligthgray)');
    });

    it('Renderiza el componente MapContainer correctamente', () => {
        const { container } = render(<MapContainer />);
        const mapContainerElement = container.firstChild;

        // Verifica que el componente se haya renderizado
        expect(mapContainerElement).toBeInTheDocument();

        // Verifica el estilo de flex y justify-content
        expect(mapContainerElement).toHaveStyle('display: flex');
        expect(mapContainerElement).toHaveStyle('justify-content: center');
    });

    it('Renderiza el componente TitleSelectTable correctamente', () => {
        const { getByText } = render(<TitleSelectTable>Selecciona taula:</TitleSelectTable>);
        
        // Verifica que el texto esté en el documento
        const titleElement = getByText(/selecciona taula:/i);
        expect(titleElement).toBeInTheDocument();

        // Verifica el estilo del componente
        expect(titleElement).toHaveStyle('font-family: "Marianina FY Black"');
        expect(titleElement).toHaveStyle('font-size: 25px');
        expect(titleElement).toHaveStyle('margin-left: 20px');
    });
});
