/* eslint-disable react/prop-types */
import { useState } from 'react';
import { MapSVG } from "./MapStyled";

// eslint-disable-next-line react/prop-types
const SvgComponent = ({ blocks, title, titleId, onSeatClick, config, ...props }) => {
  if (!blocks || blocks.length === 0) {
    return <div>No se encontraron bloques de asientos.</div>;
  }
    const [hoveredBlock, setHoveredBlock] = useState(null);
  const [focusedBlock, setFocusedBlock] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null); 


 /*  const handleSeatClick = (block, seatIndex) => { */
 /*    if (block.available === seatStates.NOT_SALABLE) return; */

 /*    if (selectedSeat && selectedSeat.blockId !== block.id) { */
 /*      // Deseleccionar el asiento previamente seleccionado */
 /*      const prevSelectedBlock = blocks.find(b => b.id === selectedSeat.blockId) */;
 /*      if (prevSelectedBlock) { */
 /*        prevSelectedBlock.available = seatStates.COLOR; */
 /*      } */
 /*    } */

 const handleSeatClick = (block) => {
  // Prevent clicking on non-salable seats
  if (block.available === seatStates.NOT_SALABLE) return;

  // Deselect the previously selected seat if a different one is selected
  if (selectedSeat && selectedSeat !== block.id) {
    const prevSelectedBlock = blocks.find(b => b.id === selectedSeat);
    if (prevSelectedBlock) {
      prevSelectedBlock.available = seatStates.COLOR;
    }
  }

  // Toggle the seat state between selected and default
  const nextSeatState = block.available === seatStates.SELECTED ? seatStates.COLOR : seatStates.SELECTED;
  block.available = nextSeatState;

  // Update the selected seat state
  if (nextSeatState === seatStates.SELECTED) {
    setSelectedSeat(block.id);
  } else {
    setSelectedSeat(null);
  }

  // Trigger the click event only for salable seats
  if (block.available !== seatStates.NOT_SALABLE) {
    onSeatClick(block);
  }
};
  // Definir los estados posibles
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

  return (
    <MapSVG
      {...props}
      id="Capa_1"
      data-name="Capa 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 420.43 614.57"
      aria-labelledby={titleId}
    >
      {title ? <title id={titleId}>{title}</title> : null}

      <defs>
  <style>
    {`
      .cls-1, .cls-2 {
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .cls-1, .cls-2, .cls-3 {
        stroke: #1d1d1b;
      }
      .cls-1 {
        stroke-width: 4px;
      }
      .cls-2 {
        stroke-width: 1.25px;
      }
      .cls-3 {
        fill: #1d1d1b;
        stroke-miterlimit: 10;
        stroke-width: 0.25px;
      }

      .seat {
        cursor: pointer; /* Pointer for clickable seats */
      }

      .seat.not_salable {
        cursor: not-allowed;  /* Show 'not-allowed' cursor */
        pointer-events: none; /* Disable click events */
        opacity: 0.5;         /* Visually indicate non-salable */
      }
    `}
  </style>
</defs>

      {blocks.map(block => (
        <g 
          key={block.id} 
          onClick={() => block.available && onSeatClick(block)}
        >
          {block.seats.map((seat, index) => (
            <rect
              key={index}
              className={`seat ${block.available === seatStates.NOT_SALABLE ? 'not_salable' : ''}`}
              x={seat.x}
              y={seat.y}
              width={seat.width}
              height={seat.height}
              transform={seat.transform}
              translate={seat.translate}
              rotate={seat.rotate}
              fill={
                block.available === seatStates.NOT_SALABLE
                  ? config.style.seat.not_salable
                  : block.available === seatStates.SELECTED
                  ? config.style.seat.selected
                  : config.style.seat.color
              }
              stroke={
                block.id === focusedBlock
                  ? config.style.seat.focus
                  : block.id === hoveredBlock
                    ? config.style.seat.hover
                    : "none"
              }
              onClick={() => {
                if (block.available !== seatStates.NOT_SALABLE) {
                  const nextSeatState = getNextSeatState(block.available);
                  block.available = nextSeatState;
                  onSeatClick(block);
                }
              }}
              onMouseEnter={() => setHoveredBlock(block.id)}
              onMouseLeave={() => setHoveredBlock(null)}
              onFocus={() => setFocusedBlock(block.id)}
              onBlur={() => setFocusedBlock(null)}
            />
          ))}
          {block.path && (
            <path
              className='cls-3'
              d={block.path}
              fill={
                block.available === seatStates.NOT_SALABLE
                  ? config.style.seat.not_salable
                  : block.available === seatStates.SELECTED
                  ? config.style.seat.selected
                  : config.style.seat.color
              }
            />
          )}
          <text
            x={block.seats[0].x + block.seats[0].width / 2}
            y={block.seats[0].y + block.seats[0].height / 2}
            textAnchor="middle"
            alignmentBaseline="middle"
            fill={config.style.block.title_color}
            fontSize="18"
            fontFamily="Marianina FY Bold"
          >
            {block.title}
          </text>
        </g>
      ))}
    
    <path
      className="cls-1"
      d="M171.64,590.14h-36V607.5H9.64V283.56c.33-150,122-273.14,272-274.59l128.5,0V533.17H255.86v57h-36"
    />
    <rect className="cls-2" x={83.03} y={534.21} width={34.79} height={21.43} />
    <rect className="cls-2" x={94.31} y={559.82} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M100.39,577.3a.52.52,0,0,1-.52-.46l-.33-4.2H94a.5.5,0,0,1-.5-.5v-2.23H91.15a.5.5,0,1,1,0-1H94a.5.5,0,0,1,.5.5v2.23H100a.5.5,0,0,0,.75,0h5.52v-2.23a.5.5,0,0,1,.5-.5h2.84a.5.5,0,1,1,0,1h-2.34v2.23a.5.5,0,0,1-.5.5h-5.55l-.33,4.2A.5.5,0,0,1,100.39,577.3Z"
    />
    <rect className="cls-2" x={48.23} y={534.21} width={34.79} height={21.43} />
    <rect className="cls-2" x={59.52} y={559.82} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M65.6,577.3a.53.53,0,0,1-.53-.46l-.32-4.2H59.2a.5.5,0,0,1-.5-.5v-2.23H56.36a.5.5,0,0,1,0-1H59.2a.5.5,0,0,1,.5.5v2.23h5.51a.5.5,0,0,1,.37.17.54.54,0,0,1,.38-.17h5.51v-2.23a.5.5,0,0,1,.5-.5h2.84a.5.5,0,1,1,0,1H72.47v2.23a.5.5,0,0,1-.5.5H66.42l-.32,4.2A.5.5,0,0,1,65.6,577.3Z"
    />
    <rect className="cls-2" x={13.44} y={534.21} width={34.79} height={21.43} />
    <rect className="cls-2" x={24.72} y={559.82} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M30.8,577.3a.52.52,0,0,1-.52-.46l-.33-4.2H24.4a.5.5,0,0,1-.5-.5v-2.23H21.56a.5.5,0,1,1,0-1H24.4a.5.5,0,0,1,.5.5v2.23h5.51a.52.52,0,0,1,.38.17.52.52,0,0,1,.37-.17h5.52v-2.23a.5.5,0,0,1,.5-.5H40a.5.5,0,0,1,0,1H37.68v2.23a.5.5,0,0,1-.5.5H31.63l-.33,4.2A.5.5,0,0,1,30.8,577.3Z"
    />
    <rect className="cls-2" x={83.03} y={512.78} width={34.79} height={21.43} />
    <rect className="cls-2" x={94.31} y={498.09} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M100.39,491.11a.52.52,0,0,0-.52.46l-.33,4.2H94a.5.5,0,0,0-.5.5v2.23H91.15a.51.51,0,0,0-.5.5.5.5,0,0,0,.5.5H94a.5.5,0,0,0,.5-.5v-2.23H100a.49.49,0,0,0,.38-.17.48.48,0,0,0,.37.17h5.52V499a.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5.51.51,0,0,0-.5-.5h-2.34v-2.23a.51.51,0,0,0-.5-.5h-5.55l-.33-4.2A.5.5,0,0,0,100.39,491.11Z"
    />
    <rect className="cls-2" x={48.23} y={512.78} width={34.79} height={21.43} />
    <rect className="cls-2" x={59.52} y={498.09} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M65.6,491.11a.53.53,0,0,0-.53.46l-.32,4.2H59.2a.5.5,0,0,0-.5.5v2.23H56.36a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5H59.2a.5.5,0,0,0,.5-.5v-2.23h5.51a.47.47,0,0,0,.37-.17.5.5,0,0,0,.38.17h5.51V499a.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5.5.5,0,0,0-.5-.5H72.47v-2.23a.5.5,0,0,0-.5-.5H66.42l-.32-4.2A.5.5,0,0,0,65.6,491.11Z"
    />
    <rect className="cls-2" x={13.44} y={512.78} width={34.79} height={21.43} />
    <rect className="cls-2" x={24.72} y={498.09} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M30.8,491.11a.52.52,0,0,0-.52.46l-.33,4.2H24.4a.51.51,0,0,0-.5.5v2.23H21.56a.51.51,0,0,0-.5.5.5.5,0,0,0,.5.5H24.4a.5.5,0,0,0,.5-.5v-2.23h5.51a.49.49,0,0,0,.38-.17.48.48,0,0,0,.37.17h5.52V499a.5.5,0,0,0,.5.5H40a.5.5,0,0,0,.5-.5.51.51,0,0,0-.5-.5H37.68v-2.23a.5.5,0,0,0-.5-.5H31.63l-.33-4.2A.5.5,0,0,0,30.8,491.11Z"
    />
    <rect className="cls-2" x={83.03} y={441.19} width={34.79} height={21.43} />
    <rect className="cls-2" x={94.31} y={466.8} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M100.39,484.28a.52.52,0,0,1-.52-.46l-.33-4.2H94a.5.5,0,0,1-.5-.5v-2.23H91.15a.51.51,0,0,1-.5-.5.5.5,0,0,1,.5-.5H94a.5.5,0,0,1,.5.5v2.23H100a.5.5,0,0,0,.75,0h5.52v-2.23a.5.5,0,0,1,.5-.5h2.84a.5.5,0,0,1,.5.5.51.51,0,0,1-.5.5h-2.34v2.23a.5.5,0,0,1-.5.5h-5.55l-.33,4.2A.5.5,0,0,1,100.39,484.28Z"
    />
    <rect className="cls-2" x={48.23} y={441.19} width={34.79} height={21.43} />
    <rect className="cls-2" x={59.52} y={466.8} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M65.6,484.28a.53.53,0,0,1-.53-.46l-.32-4.2H59.2a.5.5,0,0,1-.5-.5v-2.23H56.36a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5H59.2a.5.5,0,0,1,.5.5v2.23h5.51a.5.5,0,0,1,.37.17.54.54,0,0,1,.38-.17h5.51v-2.23a.5.5,0,0,1,.5-.5h2.84a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5H72.47v2.23a.5.5,0,0,1-.5.5H66.42l-.32,4.2A.5.5,0,0,1,65.6,484.28Z"
    />
    <rect className="cls-2" x={13.44} y={441.19} width={34.79} height={21.43} />
    <rect className="cls-2" x={24.72} y={466.8} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M30.8,484.28a.52.52,0,0,1-.52-.46l-.33-4.2H24.4a.5.5,0,0,1-.5-.5v-2.23H21.56a.51.51,0,0,1-.5-.5.5.5,0,0,1,.5-.5H24.4a.5.5,0,0,1,.5.5v2.23h5.51a.52.52,0,0,1,.38.17.52.52,0,0,1,.37-.17h5.52v-2.23a.5.5,0,0,1,.5-.5H40a.5.5,0,0,1,.5.5.51.51,0,0,1-.5.5H37.68v2.23a.5.5,0,0,1-.5.5H31.63l-.33,4.2A.5.5,0,0,1,30.8,484.28Z"
    />
    <rect className="cls-2" x={83.03} y={419.76} width={34.79} height={21.43} />
    <rect className="cls-2" x={94.31} y={405.07} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M100.39,398.09a.52.52,0,0,0-.52.46l-.33,4.2H94a.5.5,0,0,0-.5.5v2.23H91.15a.51.51,0,0,0-.5.5.5.5,0,0,0,.5.5H94a.5.5,0,0,0,.5-.5v-2.23H100a.5.5,0,0,1,.75,0h5.52V406a.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5.51.51,0,0,0-.5-.5h-2.34v-2.23a.5.5,0,0,0-.5-.5h-5.55l-.33-4.2A.5.5,0,0,0,100.39,398.09Z"
    />
    <rect className="cls-2" x={48.23} y={419.76} width={34.79} height={21.43} />
    <rect className="cls-2" x={59.52} y={405.07} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M65.6,398.09a.53.53,0,0,0-.53.46l-.32,4.2H59.2a.5.5,0,0,0-.5.5v2.23H56.36a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5H59.2a.5.5,0,0,0,.5-.5v-2.23h5.51a.5.5,0,0,0,.37-.17.54.54,0,0,0,.38.17h5.51V406a.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5.5.5,0,0,0-.5-.5H72.47v-2.23a.5.5,0,0,0-.5-.5H66.42l-.32-4.2A.5.5,0,0,0,65.6,398.09Z"
    />
    <rect className="cls-2" x={13.44} y={419.76} width={34.79} height={21.43} />
    <rect className="cls-2" x={24.72} y={405.07} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M30.8,398.09a.52.52,0,0,0-.52.46l-.33,4.2H24.4a.5.5,0,0,0-.5.5v2.23H21.56a.51.51,0,0,0-.5.5.5.5,0,0,0,.5.5H24.4a.5.5,0,0,0,.5-.5v-2.23h5.51a.52.52,0,0,0,.38-.17.52.52,0,0,0,.37.17h5.52V406a.5.5,0,0,0,.5.5H40a.5.5,0,0,0,.5-.5.51.51,0,0,0-.5-.5H37.68v-2.23a.5.5,0,0,0-.5-.5H31.63l-.33-4.2A.5.5,0,0,0,30.8,398.09Z"
    />
    <rect className="cls-2" x={83.03} y={345.04} width={34.79} height={21.43} />
    <rect className="cls-2" x={94.31} y={370.66} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M100.39,388.14a.52.52,0,0,1-.52-.46l-.33-4.2H94a.5.5,0,0,1-.5-.5v-2.23H91.15a.51.51,0,0,1-.5-.5.5.5,0,0,1,.5-.5H94a.5.5,0,0,1,.5.5v2.23H100a.49.49,0,0,1,.38.17.48.48,0,0,1,.37-.17h5.52v-2.23a.5.5,0,0,1,.5-.5h2.84a.5.5,0,0,1,.5.5.51.51,0,0,1-.5.5h-2.34V383a.51.51,0,0,1-.5.5h-5.55l-.33,4.2A.5.5,0,0,1,100.39,388.14Z"
    />
    <rect className="cls-2" x={48.23} y={345.04} width={34.79} height={21.43} />
    <rect className="cls-2" x={59.52} y={370.66} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M65.6,388.14a.53.53,0,0,1-.53-.46l-.32-4.2H59.2a.5.5,0,0,1-.5-.5v-2.23H56.36a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5H59.2a.5.5,0,0,1,.5.5v2.23h5.51a.47.47,0,0,1,.37.17.5.5,0,0,1,.38-.17h5.51v-2.23a.5.5,0,0,1,.5-.5h2.84a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5H72.47V383a.5.5,0,0,1-.5.5H66.42l-.32,4.2A.5.5,0,0,1,65.6,388.14Z"
    />
    <rect className="cls-2" x={13.44} y={345.04} width={34.79} height={21.43} />
    <rect className="cls-2" x={24.72} y={370.66} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M30.8,388.14a.52.52,0,0,1-.52-.46l-.33-4.2H24.4a.51.51,0,0,1-.5-.5v-2.23H21.56a.51.51,0,0,1-.5-.5.5.5,0,0,1,.5-.5H24.4a.5.5,0,0,1,.5.5v2.23h5.51a.49.49,0,0,1,.38.17.48.48,0,0,1,.37-.17h5.52v-2.23a.5.5,0,0,1,.5-.5H40a.5.5,0,0,1,.5.5.51.51,0,0,1-.5.5H37.68V383a.5.5,0,0,1-.5.5H31.63l-.33,4.2A.5.5,0,0,1,30.8,388.14Z"
    />
    <rect className="cls-2" x={83.03} y={323.61} width={34.79} height={21.43} />
    <rect className="cls-2" x={94.31} y={308.93} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M100.39,302a.52.52,0,0,0-.52.46l-.33,4.2H94a.5.5,0,0,0-.5.5v2.23H91.15a.5.5,0,0,0,0,1H94a.5.5,0,0,0,.5-.5v-2.23H100a.5.5,0,0,1,.75,0h5.52v2.23a.5.5,0,0,0,.5.5h2.84a.5.5,0,1,0,0-1h-2.34v-2.23a.5.5,0,0,0-.5-.5h-5.55l-.33-4.2A.5.5,0,0,0,100.39,302Z"
    />
    <rect className="cls-2" x={48.23} y={323.61} width={34.79} height={21.43} />
    <rect className="cls-2" x={59.52} y={308.93} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M65.6,302a.53.53,0,0,0-.53.46l-.32,4.2H59.2a.5.5,0,0,0-.5.5v2.23H56.36a.5.5,0,0,0,0,1H59.2a.5.5,0,0,0,.5-.5v-2.23h5.51a.5.5,0,0,0,.37-.17.54.54,0,0,0,.38.17h5.51v2.23a.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,0-1H72.47v-2.23a.5.5,0,0,0-.5-.5H66.42l-.32-4.2A.5.5,0,0,0,65.6,302Z"
    />
    <rect className="cls-2" x={13.44} y={323.61} width={34.79} height={21.43} />
    <rect className="cls-2" x={24.72} y={308.93} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M30.8,302a.52.52,0,0,0-.52.46l-.33,4.2H24.4a.5.5,0,0,0-.5.5v2.23H21.56a.5.5,0,0,0,0,1H24.4a.5.5,0,0,0,.5-.5v-2.23h5.51a.52.52,0,0,0,.38-.17.52.52,0,0,0,.37.17h5.52v2.23a.5.5,0,0,0,.5.5H40a.5.5,0,0,0,0-1H37.68v-2.23a.5.5,0,0,0-.5-.5H31.63l-.33-4.2A.5.5,0,0,0,30.8,302Z"
    />
    <rect className="cls-2" x={323.47} y={98.83} width={34.79} height={21.43} />
    <rect className="cls-2" x={334.76} y={124.44} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M340.84,141.92a.53.53,0,0,1-.53-.46l-.32-4.2h-5.55a.5.5,0,0,1-.5-.5v-2.23H331.6a.5.5,0,0,1,0-1h2.84a.5.5,0,0,1,.5.5v2.23h5.51a.5.5,0,0,1,.37.17.54.54,0,0,1,.38-.17h5.51V134a.5.5,0,0,1,.5-.5h2.84a.5.5,0,0,1,0,1h-2.34v2.23a.5.5,0,0,1-.5.5h-5.55l-.32,4.2A.5.5,0,0,1,340.84,141.92Z"
    />
    <rect className="cls-2" x={288.68} y={98.83} width={34.79} height={21.43} />
    <rect className="cls-2" x={299.96} y={124.44} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M306,141.92a.52.52,0,0,1-.52-.46l-.33-4.2h-5.55a.5.5,0,0,1-.5-.5v-2.23H296.8a.5.5,0,0,1,0-1h2.84a.5.5,0,0,1,.5.5v2.23h5.51a.5.5,0,0,0,.75,0h5.52V134a.5.5,0,0,1,.5-.5h2.84a.5.5,0,0,1,0,1h-2.34v2.23a.5.5,0,0,1-.5.5h-5.55l-.33,4.2A.5.5,0,0,1,306,141.92Z"
    />
    <rect className="cls-2" x={323.47} y={77.4} width={34.79} height={21.43} />
    <rect className="cls-2" x={334.76} y={62.71} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M340.84,55.73a.53.53,0,0,0-.53.46l-.32,4.2h-5.55a.5.5,0,0,0-.5.5v2.24H331.6a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5h2.84a.51.51,0,0,0,.5-.5V61.39h5.51a.47.47,0,0,0,.37-.17.5.5,0,0,0,.38.17h5.51v2.24a.51.51,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5.5.5,0,0,0-.5-.5h-2.34V60.89a.5.5,0,0,0-.5-.5h-5.55l-.32-4.2A.5.5,0,0,0,340.84,55.73Z"
    />
    <rect className="cls-2" x={288.68} y={77.4} width={34.79} height={21.43} />
    <rect className="cls-2" x={299.96} y={62.71} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M306,55.73a.52.52,0,0,0-.52.46l-.33,4.2h-5.55a.5.5,0,0,0-.5.5v2.24H296.8a.5.5,0,0,0-.5.5.51.51,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5V61.39h5.51a.49.49,0,0,0,.38-.17.48.48,0,0,0,.37.17h5.52v2.24a.5.5,0,0,0,.5.5h2.84a.51.51,0,0,0,.5-.5.5.5,0,0,0-.5-.5h-2.34V60.89a.51.51,0,0,0-.5-.5h-5.55l-.33-4.2A.5.5,0,0,0,306,55.73Z"
    />
    <rect className="cls-2" x={232.3} y={98.83} width={34.79} height={21.43} />
    <rect className="cls-2" x={243.58} y={124.44} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M249.66,141.92a.52.52,0,0,1-.52-.46l-.33-4.2h-5.55a.5.5,0,0,1-.5-.5v-2.23h-2.34a.5.5,0,0,1,0-1h2.84a.5.5,0,0,1,.5.5v2.23h5.51a.5.5,0,0,0,.75,0h5.52V134a.5.5,0,0,1,.5-.5h2.84a.5.5,0,0,1,0,1h-2.34v2.23a.5.5,0,0,1-.5.5h-5.55l-.33,4.2A.5.5,0,0,1,249.66,141.92Z"
    />
    <rect className="cls-2" x={197.5} y={98.83} width={34.79} height={21.43} />
    <rect className="cls-2" x={208.79} y={124.44} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M214.87,141.92a.53.53,0,0,1-.53-.46l-.32-4.2h-5.55a.5.5,0,0,1-.5-.5v-2.23h-2.34a.5.5,0,0,1,0-1h2.84a.5.5,0,0,1,.5.5v2.23h5.51a.5.5,0,0,1,.37.17.54.54,0,0,1,.38-.17h5.51V134a.5.5,0,0,1,.5-.5h2.84a.5.5,0,0,1,0,1h-2.34v2.23a.5.5,0,0,1-.5.5h-5.55l-.32,4.2A.5.5,0,0,1,214.87,141.92Z"
    />
    <rect className="cls-2" x={232.3} y={77.4} width={34.79} height={21.43} />
    <rect className="cls-2" x={243.58} y={62.71} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M249.66,55.73a.52.52,0,0,0-.52.46l-.33,4.2h-5.55a.51.51,0,0,0-.5.5v2.24h-2.34a.5.5,0,0,0-.5.5.51.51,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5V61.39h5.51a.49.49,0,0,0,.38-.17.48.48,0,0,0,.37.17h5.52v2.24a.5.5,0,0,0,.5.5h2.84a.51.51,0,0,0,.5-.5.5.5,0,0,0-.5-.5h-2.34V60.89a.51.51,0,0,0-.5-.5h-5.55l-.33-4.2A.5.5,0,0,0,249.66,55.73Z"
    />
    <rect className="cls-2" x={197.5} y={77.4} width={34.79} height={21.43} />
    <rect className="cls-2" x={208.79} y={62.71} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M214.87,55.73a.53.53,0,0,0-.53.46l-.32,4.2h-5.55a.5.5,0,0,0-.5.5v2.24h-2.34a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5h2.84a.51.51,0,0,0,.5-.5V61.39h5.51a.47.47,0,0,0,.37-.17.5.5,0,0,0,.38.17h5.51v2.24a.51.51,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5.5.5,0,0,0-.5-.5h-2.34V60.89a.5.5,0,0,0-.5-.5h-5.55l-.32-4.2A.5.5,0,0,0,214.87,55.73Z"
    />
    <rect
      className="cls-2"
      x={323.47}
      y={207.26}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={334.76} y={232.87} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M340.84,250.35a.53.53,0,0,1-.53-.46l-.32-4.2h-5.55a.5.5,0,0,1-.5-.5V243H331.6a.5.5,0,0,1,0-1h2.84a.5.5,0,0,1,.5.5v2.23h5.51a.5.5,0,0,1,.37.17.54.54,0,0,1,.38-.17h5.51v-2.23a.5.5,0,0,1,.5-.5h2.84a.5.5,0,0,1,0,1h-2.34v2.23a.5.5,0,0,1-.5.5h-5.55l-.32,4.2A.5.5,0,0,1,340.84,250.35Z"
    />
    <rect
      className="cls-2"
      x={288.68}
      y={207.26}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={299.96} y={232.87} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M306,250.35a.52.52,0,0,1-.52-.46l-.33-4.2h-5.55a.5.5,0,0,1-.5-.5V243H296.8a.5.5,0,0,1,0-1h2.84a.5.5,0,0,1,.5.5v2.23h5.51a.5.5,0,0,0,.75,0h5.52v-2.23a.5.5,0,0,1,.5-.5h2.84a.5.5,0,0,1,0,1h-2.34v2.23a.5.5,0,0,1-.5.5h-5.55l-.33,4.2A.5.5,0,0,1,306,250.35Z"
    />
    <rect
      className="cls-2"
      x={323.47}
      y={185.83}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={334.76} y={171.14} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M340.84,164.16a.53.53,0,0,0-.53.46l-.32,4.2h-5.55a.5.5,0,0,0-.5.5v2.23H331.6a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5v-2.23h5.51a.47.47,0,0,0,.37-.17.5.5,0,0,0,.38.17h5.51v2.23a.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5.5.5,0,0,0-.5-.5h-2.34v-2.23a.5.5,0,0,0-.5-.5h-5.55l-.32-4.2A.5.5,0,0,0,340.84,164.16Z"
    />
    <rect
      className="cls-2"
      x={288.68}
      y={185.83}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={299.96} y={171.14} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M306,164.16a.52.52,0,0,0-.52.46l-.33,4.2h-5.55a.5.5,0,0,0-.5.5v2.23H296.8a.51.51,0,0,0-.5.5.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5v-2.23h5.51a.49.49,0,0,0,.38-.17.48.48,0,0,0,.37.17h5.52v2.23a.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5.51.51,0,0,0-.5-.5h-2.34v-2.23a.51.51,0,0,0-.5-.5h-5.55l-.33-4.2A.5.5,0,0,0,306,164.16Z"
    />
    <rect className="cls-2" x={232.3} y={207.26} width={34.79} height={21.43} />
    <rect className="cls-2" x={243.58} y={232.87} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M249.66,250.35a.52.52,0,0,1-.52-.46l-.33-4.2h-5.55a.5.5,0,0,1-.5-.5V243h-2.34a.5.5,0,0,1,0-1h2.84a.5.5,0,0,1,.5.5v2.23h5.51a.5.5,0,0,0,.75,0h5.52v-2.23a.5.5,0,0,1,.5-.5h2.84a.5.5,0,0,1,0,1h-2.34v2.23a.5.5,0,0,1-.5.5h-5.55l-.33,4.2A.5.5,0,0,1,249.66,250.35Z"
    />
    <rect className="cls-2" x={197.5} y={207.26} width={34.79} height={21.43} />
    <rect className="cls-2" x={208.79} y={232.87} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M214.87,250.35a.53.53,0,0,1-.53-.46l-.32-4.2h-5.55a.5.5,0,0,1-.5-.5V243h-2.34a.5.5,0,0,1,0-1h2.84a.5.5,0,0,1,.5.5v2.23h5.51a.5.5,0,0,1,.37.17.54.54,0,0,1,.38-.17h5.51v-2.23a.5.5,0,0,1,.5-.5h2.84a.5.5,0,0,1,0,1h-2.34v2.23a.5.5,0,0,1-.5.5h-5.55l-.32,4.2A.5.5,0,0,1,214.87,250.35Z"
    />
    <rect className="cls-2" x={232.3} y={185.83} width={34.79} height={21.43} />
    <rect className="cls-2" x={243.58} y={171.14} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M249.66,164.16a.52.52,0,0,0-.52.46l-.33,4.2h-5.55a.51.51,0,0,0-.5.5v2.23h-2.34a.51.51,0,0,0-.5.5.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5v-2.23h5.51a.49.49,0,0,0,.38-.17.48.48,0,0,0,.37.17h5.52v2.23a.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5.51.51,0,0,0-.5-.5h-2.34v-2.23a.51.51,0,0,0-.5-.5h-5.55l-.33-4.2A.5.5,0,0,0,249.66,164.16Z"
    />
    <rect className="cls-2" x={197.5} y={185.83} width={34.79} height={21.43} />
    <rect className="cls-2" x={208.79} y={171.14} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M214.87,164.16a.53.53,0,0,0-.53.46l-.32,4.2h-5.55a.5.5,0,0,0-.5.5v2.23h-2.34a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5v-2.23h5.51a.47.47,0,0,0,.37-.17.5.5,0,0,0,.38.17h5.51v2.23a.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5.5.5,0,0,0-.5-.5h-2.34v-2.23a.5.5,0,0,0-.5-.5h-5.55l-.32-4.2A.5.5,0,0,0,214.87,164.16Z"
    />
    <rect
      className="cls-2"
      x={151.73}
      y={207.26}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={163.01} y={232.87} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M169.09,250.35a.52.52,0,0,1-.52-.46l-.33-4.2h-5.55a.5.5,0,0,1-.5-.5V243h-2.34a.5.5,0,0,1,0-1h2.84a.5.5,0,0,1,.5.5v2.23h5.51a.52.52,0,0,1,.38.17.5.5,0,0,1,.37-.17H175v-2.23a.5.5,0,0,1,.5-.5h2.84a.5.5,0,0,1,0,1H176v2.23a.5.5,0,0,1-.5.5h-5.55l-.33,4.2A.5.5,0,0,1,169.09,250.35Z"
    />
    <rect
      className="cls-2"
      x={151.73}
      y={185.83}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={163.01} y={171.14} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M169.09,164.16a.52.52,0,0,0-.52.46l-.33,4.2h-5.55a.5.5,0,0,0-.5.5v2.23h-2.34a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5v-2.23h5.51a.49.49,0,0,0,.38-.17.47.47,0,0,0,.37.17H175v2.23a.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5.51.51,0,0,0-.5-.5H176v-2.23a.51.51,0,0,0-.5-.5h-5.55l-.33-4.2A.5.5,0,0,0,169.09,164.16Z"
    />
    <rect
      className="cls-2"
      x={357.53}
      y={394.07}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={368.81} y={419.69} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M374.89,437.17a.52.52,0,0,1-.52-.46l-.33-4.2h-5.55a.5.5,0,0,1-.5-.5v-2.24h-2.34a.5.5,0,0,1-.5-.5.51.51,0,0,1,.5-.5h2.84a.5.5,0,0,1,.5.5v2.24h5.51a.49.49,0,0,1,.38.17.48.48,0,0,1,.37-.17h5.52v-2.24a.5.5,0,0,1,.5-.5h2.84a.51.51,0,0,1,.5.5.5.5,0,0,1-.5.5h-2.34V432a.51.51,0,0,1-.5.5h-5.55l-.33,4.2A.5.5,0,0,1,374.89,437.17Z"
    />
    <rect
      className="cls-2"
      x={322.73}
      y={394.07}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={334.02} y={419.69} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M340.1,437.17a.53.53,0,0,1-.53-.46l-.32-4.2H333.7a.5.5,0,0,1-.5-.5v-2.24h-2.34a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h2.84a.51.51,0,0,1,.5.5v2.24h5.51a.47.47,0,0,1,.37.17.5.5,0,0,1,.38-.17H346v-2.24a.51.51,0,0,1,.5-.5h2.84a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5H347V432a.5.5,0,0,1-.5.5h-5.55l-.32,4.2A.5.5,0,0,1,340.1,437.17Z"
    />
    <rect
      className="cls-2"
      x={287.94}
      y={394.07}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={299.22} y={419.69} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M305.3,437.17a.52.52,0,0,1-.52-.46l-.33-4.2H298.9a.51.51,0,0,1-.5-.5v-2.24h-2.34a.5.5,0,0,1-.5-.5.51.51,0,0,1,.5-.5h2.84a.5.5,0,0,1,.5.5v2.24h5.51a.49.49,0,0,1,.38.17.48.48,0,0,1,.37-.17h5.52v-2.24a.5.5,0,0,1,.5-.5h2.84a.51.51,0,0,1,.5.5.5.5,0,0,1-.5.5h-2.34V432a.5.5,0,0,1-.5.5h-5.55l-.33,4.2A.5.5,0,0,1,305.3,437.17Z"
    />
    <rect
      className="cls-2"
      x={357.53}
      y={372.64}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={368.81} y={357.96} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M374.89,351a.52.52,0,0,0-.52.46l-.33,4.2h-5.55a.5.5,0,0,0-.5.5v2.23h-2.34a.5.5,0,0,0-.5.5.51.51,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5v-2.23h5.51a.5.5,0,0,1,.75,0h5.52v2.23a.5.5,0,0,0,.5.5h2.84a.51.51,0,0,0,.5-.5.5.5,0,0,0-.5-.5h-2.34v-2.23a.5.5,0,0,0-.5-.5h-5.55l-.33-4.2A.5.5,0,0,0,374.89,351Z"
    />
    <rect
      className="cls-2"
      x={322.73}
      y={372.64}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={334.02} y={357.96} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M340.1,351a.53.53,0,0,0-.53.46l-.32,4.2H333.7a.5.5,0,0,0-.5.5v2.23h-2.34a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5h2.84a.51.51,0,0,0,.5-.5v-2.23h5.51a.5.5,0,0,0,.37-.17.54.54,0,0,0,.38.17H346v2.23a.51.51,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5.5.5,0,0,0-.5-.5H347v-2.23a.5.5,0,0,0-.5-.5h-5.55l-.32-4.2A.5.5,0,0,0,340.1,351Z"
    />
    <rect
      className="cls-2"
      x={287.94}
      y={372.64}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={299.22} y={357.96} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M305.3,351a.52.52,0,0,0-.52.46l-.33,4.2H298.9a.5.5,0,0,0-.5.5v2.23h-2.34a.5.5,0,0,0-.5.5.51.51,0,0,0,.5.5h2.84a.5.5,0,0,0,.5-.5v-2.23h5.51a.5.5,0,0,1,.75,0h5.52v2.23a.5.5,0,0,0,.5.5h2.84a.51.51,0,0,0,.5-.5.5.5,0,0,0-.5-.5h-2.34v-2.23a.5.5,0,0,0-.5-.5h-5.55l-.33-4.2A.5.5,0,0,0,305.3,351Z"
    />
    <rect
      className="cls-2"
      x={357.53}
      y={484.28}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={368.81} y={509.9} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M374.89,527.38a.52.52,0,0,1-.52-.46l-.33-4.2h-5.55a.5.5,0,0,1-.5-.5V520h-2.34a.5.5,0,0,1-.5-.5.51.51,0,0,1,.5-.5h2.84a.5.5,0,0,1,.5.5v2.24h5.51a.49.49,0,0,1,.38.17.48.48,0,0,1,.37-.17h5.52v-2.24a.5.5,0,0,1,.5-.5h2.84a.51.51,0,0,1,.5.5.5.5,0,0,1-.5.5h-2.34v2.24a.51.51,0,0,1-.5.5h-5.55l-.33,4.2A.5.5,0,0,1,374.89,527.38Z"
    />
    <rect
      className="cls-2"
      x={322.73}
      y={484.28}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={334.02} y={509.9} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M340.1,527.38a.53.53,0,0,1-.53-.46l-.32-4.2H333.7a.5.5,0,0,1-.5-.5V520h-2.34a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h2.84a.51.51,0,0,1,.5.5v2.24h5.51a.47.47,0,0,1,.37.17.5.5,0,0,1,.38-.17H346v-2.24a.51.51,0,0,1,.5-.5h2.84a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5H347v2.24a.5.5,0,0,1-.5.5h-5.55l-.32,4.2A.5.5,0,0,1,340.1,527.38Z"
    />
    <rect
      className="cls-2"
      x={287.94}
      y={484.28}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={299.22} y={509.9} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M305.3,527.38a.52.52,0,0,1-.52-.46l-.33-4.2H298.9a.51.51,0,0,1-.5-.5V520h-2.34a.5.5,0,0,1-.5-.5.51.51,0,0,1,.5-.5h2.84a.5.5,0,0,1,.5.5v2.24h5.51a.49.49,0,0,1,.38.17.48.48,0,0,1,.37-.17h5.52v-2.24a.5.5,0,0,1,.5-.5h2.84a.51.51,0,0,1,.5.5.5.5,0,0,1-.5.5h-2.34v2.24a.5.5,0,0,1-.5.5h-5.55l-.33,4.2A.5.5,0,0,1,305.3,527.38Z"
    />
    <rect
      className="cls-2"
      x={357.53}
      y={462.85}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={368.81} y={448.17} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M374.89,441.19a.52.52,0,0,0-.52.46l-.33,4.2h-5.55a.5.5,0,0,0-.5.5v2.23h-2.34a.5.5,0,0,0,0,1h2.84a.5.5,0,0,0,.5-.5v-2.23h5.51a.5.5,0,0,1,.75,0h5.52v2.23a.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,0-1h-2.34v-2.23a.5.5,0,0,0-.5-.5h-5.55l-.33-4.2A.5.5,0,0,0,374.89,441.19Z"
    />
    <rect
      className="cls-2"
      x={322.73}
      y={462.85}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={334.02} y={448.17} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M340.1,441.19a.53.53,0,0,0-.53.46l-.32,4.2H333.7a.5.5,0,0,0-.5.5v2.23h-2.34a.5.5,0,0,0,0,1h2.84a.5.5,0,0,0,.5-.5v-2.23h5.51a.5.5,0,0,0,.37-.17.54.54,0,0,0,.38.17H346v2.23a.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,0-1H347v-2.23a.5.5,0,0,0-.5-.5h-5.55l-.32-4.2A.5.5,0,0,0,340.1,441.19Z"
    />
    <rect
      className="cls-2"
      x={287.94}
      y={462.85}
      width={34.79}
      height={21.43}
    />
    <rect className="cls-2" x={299.22} y={448.17} width={12.16} height={10.5} />
    <path
      className="cls-3"
      d="M305.3,441.19a.52.52,0,0,0-.52.46l-.33,4.2H298.9a.5.5,0,0,0-.5.5v2.23h-2.34a.5.5,0,0,0,0,1h2.84a.5.5,0,0,0,.5-.5v-2.23h5.51a.5.5,0,0,1,.75,0h5.52v2.23a.5.5,0,0,0,.5.5h2.84a.5.5,0,0,0,0-1h-2.34v-2.23a.5.5,0,0,0-.5-.5h-5.55l-.33-4.2A.5.5,0,0,0,305.3,441.19Z"
    />
    <rect
      className="cls-2"
      x={107.11}
      y={430.47}
      width={42.86}
      height={21.43}
      transform="translate(-312.65 569.72) rotate(-90)"
    />
    <rect
      className="cls-2"
      x={142.61}
      y={435.97}
      width={12.16}
      height={10.5}
      transform="translate(-292.53 589.91) rotate(-90)"
    />
    <path
      className="cls-3"
      d="M160.92,441.22a.52.52,0,0,1-.46.52l-4.2.33v5.55a.5.5,0,0,1-.5.5h-2.23v2.34a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5v-2.84a.5.5,0,0,1,.5-.5h2.23v-5.51a.49.49,0,0,1,.17-.38.47.47,0,0,1-.17-.37v-5.52H153a.5.5,0,0,1-.5-.5V432a.5.5,0,0,1,.5-.5.51.51,0,0,1,.5.5v2.34h2.23a.5.5,0,0,1,.5.5v5.55l4.2.33A.5.5,0,0,1,160.92,441.22Z"
    />
    <rect
      className="cls-2"
      x={107.11}
      y={334.33}
      width={42.86}
      height={21.43}
      transform="translate(-216.5 473.58) rotate(-90)"
    />
    <rect
      className="cls-2"
      x={142.61}
      y={339.83}
      width={12.16}
      height={10.5}
      transform="translate(-196.39 493.76) rotate(-90)"
    />
    <path
      className="cls-3"
      d="M160.92,345.08a.52.52,0,0,1-.46.52l-4.2.33v5.55a.5.5,0,0,1-.5.5h-2.23v2.34a.51.51,0,0,1-.5.5.5.5,0,0,1-.5-.5v-2.84a.5.5,0,0,1,.5-.5h2.23v-5.52a.48.48,0,0,1,.17-.37.49.49,0,0,1-.17-.38V339.2H153a.5.5,0,0,1-.5-.5v-2.84a.5.5,0,0,1,.5-.5.51.51,0,0,1,.5.5v2.34h2.23a.5.5,0,0,1,.5.5v5.55l4.2.33A.49.49,0,0,1,160.92,345.08Z"
    />
  </MapSVG>
)
}
export { SvgComponent };
