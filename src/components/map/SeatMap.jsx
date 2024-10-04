import { MapContainer, TitleSelectTable } from "./MapStyled"
import { SeatSpace } from "../mapSpace/SeatSpace"
import styled from "styled-components";

const MapSpace = styled.div`
    width: auto;
    height: 100vh;

`;


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

export default SeatMap