// Contact.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../pages/contact/Contact'; // Ajusta la ruta según la estructura de tu proyecto
import '@testing-library/jest-dom'; // Esta línea debería estar en tu setupTests.js, pero aquí se añade para referencia

describe('Contact Component', () => {
  it('renders without crashing', () => {
    render(<Contact />);
    expect(screen.getByText('Contacte')).toBeInTheDocument(); // Asegúrate de que el texto se encuentre en el componente
  });

  it('displays the phone number', () => {
    render(<Contact />);
    expect(screen.getByText('93 462 40 00')).toBeInTheDocument(); // Verifica que el número de teléfono esté presente
  });

  it('displays the website URL', () => {
    render(<Contact />);
    expect(screen.getByText('https://laciba.gramenet.cat')).toBeInTheDocument();
  });

  it('displays the address', () => {
    render(<Contact />);
    expect(screen.getByText('Ps. de LLorenç Serra, 64 08921 Santa Coloma de Gramanet')).toBeInTheDocument();
  });
});
