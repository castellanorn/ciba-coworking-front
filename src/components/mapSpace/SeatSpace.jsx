import { useRef, useState } from 'react';
import styled from 'styled-components';
import Plano from '../../components/mapSpace/Plano';
/* import { Seatmap as OriginalSeatmap } from '@alisaitteke/seatmap-canvas-react'; */
import { Seatmap as OriginalSeatmap } from './Seat';

// Definir componentes estilizados
const Container = styled.div`
  width: 100%;
  height: 100%;
  display:flex;
  justify-content:center;
`;

const Title = styled.h3`
   font-family: "Marianina FY Black";
   font-size:25px;
   margin-left:20px;
`;

const StyledSeatmap = styled(OriginalSeatmap)`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  /* Puedes agregar más estilos personalizados aquí */
`;

const config = {
  legend: true, // Mostrar la leyenda
  style: {
    seat: {
      hover: '#8fe100', // Color al pasar el ratón por encima
      color: "var(--white)", // Color por defecto
      selected: '#8fe100', // Color cuando está seleccionado
      check_icon_color: '#fff', // Color del icono de check
      not_salable: '#0088d3', // Color para asientos no disponibles
      focus: '#8fe100', // Color cuando está enfocado
    },
    legend: {
      font_color: '#3b3b3b', // Color de la fuente en la leyenda
      show: false, // Mostrar u ocultar la leyenda
    },
    block: {
      title_color: '#810f0f', // Color del título del bloque
    },
  },
};





















const initialBlocks = [
  
  { id:1, x: 83.03, y: 534.21, width: 34.79, height: 21.43, title: 'T1', reserved: true  },
  { id:2, x: 94.31, y: 559.82, width: 12.16, height: 10.5, title: "T2", reserved: true },
  { id:3, x: 48.23, y: 534.21, width: 34.79, height: 21.43, title: 'T3', reserved: false  },
  { id:4, x: 59.52, y: 559.82, width: 12.16, height: 10.5, reserved: false  },
  { id:5, x: 13.44, y: 534.21, width: 34.79, height: 21.43, reserved: false  },
  { id:6, x: 24.72, y: 559.82, width: 12.16, height: 10.5, reserved: false  },
  { id:7, x: 83.03, y: 512.78, width: 34.79, height: 21.43, reserved: false },
  { id:8, x: 94.31, y: 498.09, width: 12.16, height: 10.5, reserved: false  },
  { id:9, x: 48.23, y: 512.78, width: 34.79, height: 21.43, reserved: false  },
  { id:10, x: 59.52, y: 498.09, width: 12.16, height: 10.5, reserved: false  },
  { id:11, x: 13.44, y: 512.78, width: 34.79, height: 21.43, reserved: false  },
  { id:12, x: 24.72, y: 498.09, width: 12.16, height: 10.5, reserved: false  }

];

const SeatSpace = () => {
  const seatmapRef = useRef(null);

  const [blocks, setBlocks] = useState(initialBlocks);

  /* const blocks = [ */
  /*   { */
  /*     id: '1', */
  /*     title: 'Mesa 1', */
  /*     seats: [ */
  /*       { id: '1-1', number: '1', salable: true }, */
  /*       { id: '1-2', number: '2', salable: true }, */
  /*       { id: '1-3', number: '3', salable: true }, */
  /*       { id: '1-4', number: '4', salable: true } */
  /*     ] */
  /*   }, */
  /*   { */
  /*     id: '2', */
  /*     title: 'Mesa 2', */
  /*     seats: [ */
  /*       { id: '2-1', number: '5', salable: true }, */
  /*       { id: '2-2', number: '6', salable: true }, */
  /*       { id: '2-3', number: '7', salable: true }, */
  /*       { id: '2-4', number: '8', salable: true } */
  /*     ] */
  /*   } */
  /*   // Agrega más mesas según sea necesario */
  /* ]; */


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  const handleSeatClick = (seatId) => {
    setBlocks(blocks.map(block => 
        block.id === seatId ? { ...block, reserved: !block.reserved } : block
    ));
};


/*   const handleSeatClick = (seat) => { */
/*     console.log('Seat clicked:', seat); */
/* }; */

/* const selectedSeats = seatmapRef.current.getSelectedSeats(); */

  return (
    <Container>
      <Title>Selecciona tu Asiento</Title>
      <Plano blocks={blocks} />
      <StyledSeatmap
        ref={seatmapRef}
        seatClick={handleSeatClick}
        blocks={blocks}
        config={config}
      />
    </Container>
  );
};

export { SeatSpace };
