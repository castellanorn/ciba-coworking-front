import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { describe, test, expect } from 'vitest';
import {
  TableWrapper,
  StyledTable,
  TableRow,
  TableHeader,
  TableData,
} from './TableStyled'; 

describe('Componentes de TableStyled', () => {
  test('Renderiza TableWrapper correctamente', () => {
    render(
      <TableWrapper>
        <StyledTable>
          <thead>
            <TableRow columns={2}>
              <TableHeader>Header 1</TableHeader>
              <TableHeader>Header 2</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            <TableRow columns={2}>
              <TableData>Data 1</TableData>
              <TableData>Data 2</TableData>
            </TableRow>
          </tbody>
        </StyledTable>
      </TableWrapper>
    );

    const tableElement = screen.getByRole('table'); 
    expect(tableElement).toBeInTheDocument();
  });

  test('Renderiza StyledTable correctamente', () => {
    render(
      <StyledTable>
        <thead>
          <TableRow columns={2}>
            <TableHeader>Header 1</TableHeader>
            <TableHeader>Header 2</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          <TableRow columns={2}>
            <TableData>Data 1</TableData>
            <TableData>Data 2</TableData>
          </TableRow>
        </tbody>
      </StyledTable>
    );

    
    expect(screen.getByText(/Header 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Header 2/i)).toBeInTheDocument();

    expect(screen.getByText(/Data 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Data 2/i)).toBeInTheDocument();
  });
});
