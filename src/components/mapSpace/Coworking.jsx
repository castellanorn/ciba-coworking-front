import { useState } from 'react';
/* import SeatMapCanvas from 'react-seatmap-canvas'; */
// @ts-ignore
import { Seatmap } from '@alisaitteke/seatmap-canvas-react';

import styled from 'styled-components';

// Definir el componente estilizado para las sillas
const Chair = styled.div`
  width: 50px;
  height: 50px;
  background-color: #4CAF50; /* Color verde */
  border: 2px solid #000; /* Borde negro */
  border-radius: 50%; /* Forma circular */
  display: inline-block;
  margin: 5px;
  text-align: center;
  line-height: 50px; /* Centrar el texto verticalmente */
  color: white; /* Color del texto */
  font-weight: bold;

  &.reserved {
    background-color: var(--lightgray); /* Color rojo para reservadas */
  }
`;

// Definir el componente estilizado para las mesas
/* const Table = styled.div` */
/*   display: flex; */
/*   flex-wrap: wrap; */
/*   width: 220px; /* Ajustar según el número de sillas */ 
/*   margin: 20px; */
/*   border: 2px solid #000; /* Borde negro */ 
/*   padding: 10px; */
/*   justify-content: center; */
/* `; */

// eslint-disable-next-line react/prop-types
const Coworking = ({ initialRows, /* maxReservableSeats */ }) => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(initialRows);

  const addSeatCallback = (row, number, id) => {
    setLoading(true);
    setTimeout(() => {
      console.log(`Added seat ${number}, row ${row}, id ${id}`);
      const newTooltip = `Asiento ${number} reservado`;
      setRows(prevRows => {
        const newRows = [...prevRows];
        newRows[row][number - 1].tooltip = newTooltip;
        return newRows;
      });
      setLoading(false);
    }, 1500);
  };

  const removeSeatCallback = (row, number, id) => {
    setLoading(true);
    setTimeout(() => {
      console.log(`Removed seat ${number}, row ${row}, id ${id}`);
      setRows(prevRows => {
        const newRows = [...prevRows];
        newRows[row][number - 1].tooltip = 'Disponible';
        return newRows;
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <h1>Selecciona tu Asiento</h1>
      <Seatmap
        rows={rows}
        /* maxReservableSeats={maxReservableSeats} */
        addSeatCallback={addSeatCallback}
        removeSeatCallback={removeSeatCallback}
        loading={loading}
        seatComponent={Chair}
      />
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const initialRows = [
  [
    { id: 1, number: 1, tooltip: 'Disponible' },
    { id: 2, number: 2, tooltip: 'Disponible' },
    { id: 3, number: 3, tooltip: 'Disponible' },
    { id: 4, number: 4, tooltip: 'Disponible' }
  ],
  [
    { id: 5, number: 5, tooltip: 'Disponible' },
    { id: 6, number: 6, tooltip: 'Disponible' },
    { id: 7, number: 7, tooltip: 'Disponible' },
    { id: 8, number: 8, tooltip: 'Disponible' }
  ],
  [
    { id: 9, number: 9, tooltip: 'Disponible' },
    { id: 10, number: 10, tooltip: 'Disponible' },
    { id: 11, number: 11, tooltip: 'Disponible' },
    { id: 12, number: 12, tooltip: 'Disponible' }
  ],
  [
    { id: 13, number: 13, tooltip: 'Disponible' },
    { id: 14, number: 14, tooltip: 'Disponible' },
    { id: 15, number: 15, tooltip: 'Disponible' },
    { id: 16, number: 16, tooltip: 'Disponible' }
  ]
];

/* const container = document.getElementById('root'); */
/* const root = createRoot(container); */
/* root.render(<CoworkingSpace initialRows={initialRows} maxReservableSeats={3} />); */

export { Coworking };