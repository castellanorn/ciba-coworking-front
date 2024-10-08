import { MapContainer, TitleSelectTable } from "./MapStyled"
/* import { SeatSpace } from "../mapSpace/SeatSpace" */
import { Coworking } from "../mapSpace/Coworking"
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
          {/*   <SeatSpace /> */}
            <Coworking />
        </MapContainer>
        
    </MapSpace>
)
}

export default SeatMap