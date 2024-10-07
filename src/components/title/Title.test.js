import { render } from '@testing-library/react';
import TitleMobile from './Title'; // Asegúrate de importar el componente correcto

describe('TitleMobile Component', () => {
  it('renders the title correctly', () => {
    const { getByText } = render(<TitleMobile title="Test Title" />);
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the line element', () => {
    const { container } = render(<TitleMobile title="Test Title" />);
    const line = container.querySelector('line-selector'); 
    expect(line).toBeInTheDocument();
  });
});
import { render } from '@testing-library/react';
import TitleMobile from './Title'; // Asegúrate de importar el componente correcto

describe('TitleMobile Component', () => {
  it('renders the title correctly', () => {
    const { getByText } = render(<TitleMobile title="Test Title" />);
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the line element', () => {
    const { container } = render(<TitleMobile title="Test Title" />);
    const line = container.querySelector('line-selector'); // Asegúrate de usar el selector correcto para el Line
    expect(line).toBeInTheDocument();
  });
});
