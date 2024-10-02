import React, { Component } from "react";
import PropTypes from 'prop-types';
import { SeatMapCanvas } from '@alisaitteke/seatmap-canvas';
import styled from 'styled-components';

const SeatmapContainer = styled.div`
  height: 100%;
`;

class Seatmap extends Component {
    constructor(props) {
        super(props);
        this.seatMap = null;
        this.mountSeatmap = false;
        this.containerRef = React.createRef();
        this.config = props.config;
        this.blocks = props.blocks || [];
        this.seatClick = props.seatClick;
        this.className = props.className;
    }

    componentDidMount() {
        console.log('Component did mount');
        console.log('Initial mountSeatmap:', this.mountSeatmap); // Verifica el valor inicial de mountSeatmap
        console.log('Blocks:', this.blocks); // Verifica el valor de blocks
        console.log('Config:', this.config); // Verifica el valor de config
        if (!this.blocks) {
            throw new Error('Blocks data not found');
        }
        if (!this.mountSeatmap) {
            console.log('Mounting seatmap');
            this.seatMap = new SeatMapCanvas("#seatmap-container", this.config);
            this.seatMap.eventManager.addEventListener("SEAT.CLICK", (event) => {
                const seatId = event.detail.seatId;
                this.seatClick(seatId);
            }, { passive: true });

            console.log('Blocks before replaceData:', this.blocks); // Verifica los datos antes de reemplazarlos
            this.seatMap.data.replaceData(this.blocks);
            this.zoomManager = this.seatMap.zoomManager;
            this.mountSeatmap = true; // Establecer en true después de montar el mapa de asientos
            console.log('Seatmap mounted:', this.mountSeatmap); // Verifica que mountSeatmap se establezca en true
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.blocks !== this.props.blocks) {
            console.log('Updating blocks:', this.props.blocks); // Verifica los nuevos bloques
            this.seatMap.data.replaceData(this.props.blocks);
        }
    }

    render() {
        return (
            <SeatmapContainer id={'seatmap-container'} className={this.className}></SeatmapContainer>
        );
    }
}

// Agregar validación de props
Seatmap.propTypes = {
    config: PropTypes.object.isRequired,
    blocks: PropTypes.array.isRequired,
    seatClick: PropTypes.func.isRequired,
    className: PropTypes.string
};

export { Seatmap };
