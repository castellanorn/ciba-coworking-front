import { MapContainer, TitleSelectTable, MapIni } from "./MapStyled"
import MapImg from '../../assets/plano.svg'


const Map = () => {
return (
    <div>
        <TitleSelectTable>Selecciona taula:</TitleSelectTable>
        <MapContainer>
            <MapIni src={MapImg} alt="map" />
        </MapContainer>
    
    </div>
)
}

export default Map

