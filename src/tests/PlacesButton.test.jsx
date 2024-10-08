import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import PlacesButton from '../components/buttons/PlacesButton'; 
import { describe, it, expect } from 'vitest';

describe('PlacesButton Component', () => {
  it('should render the button with the correct text', () => {
    render(
      <MemoryRouter>
        <PlacesButton text="My Places" link="/" focus={false} />
      </MemoryRouter>
    );
    const button = screen.getByText('My Places');
    expect(button).toBeInTheDocument(); 
  });

  it('should render a focused button when focus is true', () => {
    render(<PlacesButton text="My Places" link="/" focus={true} />);
    const focusedButton = screen.getByText('My Places');
    expect(focusedButton).toBeInTheDocument(); 
  });

  it('should render a Link when focus is false', () => {
    render(
      <MemoryRouter>
        <PlacesButton text="My Places" link="/" focus={false} />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: 'My Places' });
    expect(link).toHaveAttribute('href', '/'); 
  });

  it('should not render a Link when focus is true', () => {
    render(<PlacesButton text="My Places" link="/" focus={true} />);
    const link = screen.queryByRole('link', { name: 'My Places' });
    expect(link).not.toBeInTheDocument(); 
  });
});
