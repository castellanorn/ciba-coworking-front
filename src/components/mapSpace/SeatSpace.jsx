import { useRef } from 'react';
import Seatmap from '@alisaitteke/seatmap-canvas-react';

const SeatSpace = () => {
  const seatmapRef = useRef(null);

  const blocks = [
    {
      id: '1',
      title: 'Mesa 1',
      seats: [
        { id: '1-1', number: '1', salable: true },
        { id: '1-2', number: '2', salable: true },
        { id: '1-3', number: '3', salable: true },
        { id: '1-4', number: '4', salable: true }
      ]
    },
    {
      id: '2',
      title: 'Mesa 2',
      seats: [
        { id: '2-1', number: '5', salable: true },
        { id: '2-2', number: '6', salable: true },
        { id: '2-3', number: '7', salable: true },
        { id: '2-4', number: '8', salable: true }
      ]
    }
    // Agrega más mesas según sea necesario
  ];

  const config = {
    legend: true,
    style: {
      seat: {
        hover: '#8fe100',
        color: '#f0f7fa',
        selected: '#8fe100',
        check_icon_color: '#fff',
        not_salable: '#0088d3',
        focus: '#8fe100'
      },
      legend: {
        font_color: '#3b3b3b',
        show: false
      },
      block: {
        title_color: '#fff'
      }
    }
  };

  const seatClick = (seat) => {
    if (!seat.isSelected() && seat.item.salable === true) {
      seat.select();
    } else {
      seat.unSelect();
    }
  };

  return (
    <div>
      <h1>Selecciona tu Asiento</h1>
      <Seatmap
        className="w-full flex-1 h-full"
        ref={seatmapRef}
        seatClick={seatClick}
        blocks={blocks}
        config={config}
      />
    </div>
  );
};

export { SeatSpace };
