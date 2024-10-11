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
      return seatStates.NOT_SALABLE; 
    case seatStates.SELECTED:
      return seatStates.COLOR;
    case seatStates.COLOR:
      return seatStates.SELECTED;
    default:
      return seatStates.COLOR;
  }
};

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

  const [renderBlocks, setRenderBlocks] = useState(filteredBlocks)


  const seatmapRef = useRef(null);

  const handleSeatClick = (block) => {
    
    const currentSeatState = block.available;

    if (currentSeatState === seatStates.NOT_SALABLE) return;
    setSelectedSeat(block);

    const nextSeatState = block.available === "selected" ? seatStates.SELECTED : seatStates.COLOR;
    
    const updatedBlocks = filteredBlocks.map(b =>
      b.id === block.id
        ? { ...b, available: nextSeatState }
        : b
    );
    setRenderBlocks(updatedBlocks);

    if (onSeatSelect) {
      onSeatSelect(block);
    }
  };

  return (
    <div>
      <TitleSelectTable>Selecciona taula:</TitleSelectTable>
      <MapContainer>
        <SvgComponent blocks={renderBlocks} onSeatClick={handleSeatClick} config={config} />
      </MapContainer>
    </div>
  );
};

export { SeatSpace };