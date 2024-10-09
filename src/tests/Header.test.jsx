import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/header/Header'; 
import { MemoryRouter } from 'react-router-dom'; 

describe('Header', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        // Busca por el elemento de logo
        const logo = container.querySelector('img[alt="Logo"]');
        const userIcon = container.querySelector('svg'); 

        expect(logo).toBeInTheDocument();
        expect(userIcon).toBeInTheDocument();
    });
});

