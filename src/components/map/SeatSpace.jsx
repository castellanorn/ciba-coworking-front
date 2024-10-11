/* eslint-disable no-undef */
import { useRef, useState, useEffect, useCallback } from 'react';
import { MapContainer, TitleSelectTable } from "./MapStyled"
import styled from 'styled-components';
import { SvgComponent } from "./SvgComponent";
import { Seatmap } from '@alisaitteke/seatmap-canvas-react';
import emptyBlocks from "../../assets/emptyBlocks.json"

const config = {
  legend: true,
  style: {
    seat: {
      hover: 'var(--white)',
      color: "var(--white)",
      selected: 'var(--lightviolet)',
      check_icon_color: '#fffff',
      not_salable: "var(--grey)",
      focus: 'var(--yellow)',
    },
    legend: {
      font_color: 'var(--blue)',
      show: false,
    },
    block: {
      title_color: 'var(--darkgray)',
    },
  },
};

const seatStates = {
  NOT_SALABLE: 'not_salable',
  SELECTED: 'selected',
  COLOR: 'color'
};

// Función para cambiar de estado
const getNextSeatState = (currentState) => {
  switch (currentState) {
    case seatStates.NOT_SALABLE:
      return seatStates.NOT_SALABLE; // El estado not_salable no cambia
    case seatStates.SELECTED:
      return seatStates.COLOR;
    case seatStates.COLOR:
      return seatStates.SELECTED;
    default:
      return seatStates.COLOR;
  }
};

//blocks, onSeatSelect
const initialBlocks = emptyBlocks.emptyBlocks;

const SeatSpace = ({availableTables, onSeatSelect }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const filteredBlocks = initialBlocks.map(seat => {
    const isAvailable = availableTables.some(fetchedSeat => fetchedSeat.id === seat.id);

    return {
      ...seat, 
      available: isAvailable ? "color" : "not_salable",
    };
  });
  console.log(initialBlocks)
  console.log(filteredBlocks)


  const seatmapRef = useRef(null);

  /* const handleSeatClick = (block) => {
    
    const updatedBlocks = filteredBlocks.map(b =>
      b.id === block.id
        ? { ...b, available: getNextSeatState(b.available) }
        : b
    );
    
    console.log(block)
    if (onSeatSelect) {
      onSeatSelect(block);
    }
  }; */

  const handleSeatClick = (selectBlock, blockId, seatIndex) => {
    const block = filteredBlocks.find(b => b.id === blockId);
    if (!block) return;

    const currentSeatState = filteredBlocks.seats[seatIndex].available;
    if (currentSeatState === seatStates.NOT_SALABLE) return;

    console.log(selectBlock)
    // No hacer nada 
    if (selectedSeat) {
      // Deseleccionar el asiento previamente seleccionado
      const prevBlock = filteredBlocks.find(b => b.id === selectedSeat.blockId);
      if (prevBlock) {
        prevBlock.seats[selectedSeat.seatIndex].available = seatStates.COLOR;
      }
    }
    // Seleccionar el nuevo asiento
    filteredBlocks.seats[seatIndex].available = seatStates.SELECTED;
    setSelectedSeat({ blockId, seatIndex });
    onSeatClick(block);

    const updatedBlocks = filteredBlocks.map(b =>
      b.id === block.id
        ? { ...b, available: getNextSeatState(b.available) }
        : b
    );


    console.log(selectBlock)
    if (onSeatSelect) {
      onSeatSelect(selectBlock);
    }
  }

  const getSelectedSeats = () => {
    if (seatmapRef.current) {
      return seatmapRef.current.getSelectedSeats();
    }
    return [];
  };

  const formatSelectedSeats = () => {
    const selectedSeats = getSelectedSeats();
    return selectedSeats.map(seat => ({
      blockId: seat.blockId,
      coordinates: {
        x: seat.x,
        y: seat.y,
        width: seat.width,
        height: seat.height
      }
    }));
  };

  return (
    <div>
      <TitleSelectTable>Selecciona taula:</TitleSelectTable>
      <MapContainer>
        <SvgComponent blocks={filteredBlocks} onSeatClick={handleSeatClick} config={config} />
      </MapContainer>
    </div>
  );
};

export { SeatSpace };