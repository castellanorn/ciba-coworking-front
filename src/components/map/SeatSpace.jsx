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
      focus: 'var(--white)',
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
const SeatSpace = ({onSeatSelect }) => {
    
 /*  const filteredBlocks = initialBlocks.map(seat => {
    const isAvailable = blocks.some(fetchedSeat => fetchedSeat.id === seat.id);
    return {
      ...seat, 
      available: isAvailable ? "color" : "not_salable",
    };
  }); */
  

  const seatmapRef = useRef(null);

  const handleSeatClick = (block) => {
    console.log(block.id);  // Log block.id for debugging
    const updatedBlocks = initialBlocks.map(b =>
      b.id === block.id
        ? { ...b, available: getNextSeatState(b.available) }
        : b
    );
    
    // Pass the selected block.id to the parent component
    if (onSeatSelect) {
      onSeatSelect(block);
    }
  };

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
        <SvgComponent blocks={initialBlocks} onSeatClick={handleSeatClick} config={config} />
        {/* <Seatmap>
          ref={seatmapRef}
          seatClick={handleSeatClick}
          blocks={filteredBlocks}
          config={config}
                    
        </Seatmap> */}
      </MapContainer>
    </div>
  );
};

export { SeatSpace };