import { MapContainer, TitleSelectTable, MapSpace } from "./MapStyled"
import { SeatSpace } from "../map/SeatSpace"
import styled from "styled-components";


const SeatMap = () => {
return (
    <MapSpace>
        <TitleSelectTable>Selecciona taula:</TitleSelectTable>
        <MapContainer>
            <SeatSpace />
        </MapContainer>
    </MapSpace>
)
}

export { SeatMap }