import { MapContainer, TitleSelectTable } from "./MapStyled"
import MapImg from '../../assets/plano.svg'


const Map = () => {
return (
    <div>
        <TitleSelectTable>Selecciona taula:</TitleSelectTable>
        <MapContainer>
            <img src={MapImg} alt="map" />
        </MapContainer>
    
    </div>
)
}

export default Map