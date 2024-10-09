import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest'; 
import Table from '../components/table/Table'; 

describe('Table Component', () => {
  const mockData = [
    {
      id: 1,
      name: 'Espai reservat',
      type: 'reserveUser',
    },
    {
      id: 2,
      name: 'Otro espai',
      type: 'other',
    },
  ];

  const mockColumns = ['id', 'name', 'type'];
  
  const mockColumnMapping = {
    id: 'id',
    name: 'name',
    type: 'type',
  };

  const mockActions = ['edit', 'delete'];
  const mockOnEdit = vi.fn(); 

  test('renders reserveUser type correctly', () => {
    render(<Table columns={mockColumns} data={mockData} columnMapping={mockColumnMapping} actions={mockActions} onEdit={mockOnEdit} />);

  
    const elements = screen.getAllByText(/Espai reservat/i);

    expect(elements.length).toBeGreaterThan(0);
  });

 
});
