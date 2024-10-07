import { render, screen, within } from '@testing-library/react';
import Table from './Table'; // Asegúrate de que esta ruta es correcta

// Datos de prueba para las columnas y las filas
const columns = ['Name', 'Price'];
const rowsData = [
  { name: 'Item 1', price: '$10' },
  { name: 'Item 2', price: '$20' },
];
const columnMapping = {
  name: 'Name',
  price: 'Price',
};

test('renders the correct column headers', () => {
  render(<Table columns={columns} data={rowsData} columnMapping={columnMapping} />);

  // Buscamos todos los encabezados de la tabla (columnheader)
  const headers = screen.getAllByRole('columnheader');
  
  // Verificamos que el primer encabezado sea 'Name' y el segundo sea 'Price'
  expect(headers[0]).toHaveTextContent('Name');
  expect(headers[1]).toHaveTextContent('Price');
});

test('renders the correct data in cells', () => {
  render(<Table columns={columns} data={rowsData} columnMapping={columnMapping} />);

  // Buscamos las filas de la tabla (excepto el encabezado)
  const rows = screen.getAllByRole('row');
  
  // Verificamos el contenido de la primera fila de datos (segunda fila de la tabla)
  const firstRow = within(rows[1]).getAllByRole('cell');
  expect(firstRow[0]).toHaveTextContent('Item 1');
  expect(firstRow[1]).toHaveTextContent('$10');

  // Verificamos el contenido de la segunda fila de datos (tercera fila de la tabla)
  const secondRow = within(rows[2]).getAllByRole('cell');
  expect(secondRow[0]).toHaveTextContent('Item 2');
  expect(secondRow[1]).toHaveTextContent('$20');
});
