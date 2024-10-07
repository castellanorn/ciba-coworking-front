import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import TitleMobile from './Title';
import { TitlePage } from './TitleStyled'; 

describe('TitleMobile Component', () => {
  it('renders the title correctly', () => {
    const { getByText } = render(<TitleMobile title="Test Title" />);
    const titleElement = getByText('Test Title');
    expect(titleElement).toBeTruthy(); 
  });

  it('renders the line element', () => {
    const { container } = render(<TitleMobile title="Test Title" />);
    const line = container.querySelector('hr');
    expect(line).toBeTruthy();
  });

  it('applies the correct styles to TitlePage', () => {
    const { container } = render(<TitleMobile title="Test Title" />);
    const titleElement = container.querySelector('h2');

    const computedStyle = window.getComputedStyle(titleElement);
    expect(computedStyle.fontFamily).toContain('"Marianina FY Black"'); 
    expect(computedStyle.fontSize).toBe('25px');
  });
});
