import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import TitleMobile from '../components/title/Title';

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
});
