import React, { Component } from "react";
import { SeatMapCanvas } from '@alisaitteke/seatmap-canvas';

class Seatmap extends Component {
    constructor(props) {
        super(props);
        this.seatMap = SeatMapCanvas;
        this.mountSeatmap = false;
        this.containerRef = React.createRef();
        // eslint-disable-next-line react/prop-types
        this.config = props.config;
        // eslint-disable-next-line react/prop-types, no-undef
        this.blocks = props.blocks || blocks; // Usa el array blocks definido arriba
        // eslint-disable-next-line react/prop-types
        this.seatClick = props.seatClick;
        // eslint-disable-next-line react/prop-types
        this.className = props.className;
    }

    componentDidMount() {
        if (!this.blocks) {
            throw new Error('Blocks data not found');
        }
        if (this.mountSeatmap) {
            this.seatMap = new SeatMapCanvas("#seatmap-container", this.config);
            this.seatMap.eventManager.addEventListener("SEAT.CLICK", (event) => {
                const seatId = event.detail.seatId;
                this.seatClick(seatId);
     /*        if (this.seatClick) { */
     /*            this.seatMap.eventManager.addEventListener("SEAT.CLICK", this.seatClick); */
            });

            this.seatMap.data.replaceData(this.blocks);
            this.zoomManager = this.seatMap.zoomManager;
        }

        this.mountSeatmap = true;
    }

    componentDidUpdate(prevProps) {
        // eslint-disable-next-line react/prop-types
        if (prevProps.blocks !== this.props.blocks) {
            // eslint-disable-next-line react/prop-types
            this.seatMap.data.replaceData(this.props.blocks);
        }
    }

    render() {
        return (
            <div className={this.className} style={{ height: '100%' }} id={'seatmap-container'}></div>
        );
    }
}

export { Seatmap };
