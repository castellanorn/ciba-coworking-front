import { MapContainer, TitleSelectTable, MapSpace } from "./MapStyled"
import styled from "styled-components";
import { Coworking } from "../mapSpace/Coworking";


const SeatMap = () => {
return (
    <MapSpace>
        <TitleSelectTable>Selecciona taula:</TitleSelectTable>
        <MapContainer>
            <Coworking />
        </MapContainer>
    </MapSpace>
)
}

export { SeatMap }