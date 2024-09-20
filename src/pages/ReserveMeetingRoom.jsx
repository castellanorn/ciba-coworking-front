import { Link } from 'react-router-dom'
import Calendar from '../components/calendar/Calendar'
import {ButtonConfirm, ButtonFind, ButtonPlaces,ButtonPlacesFocus,ButtonsContainer,DivReserve,H2, H3, Hr, Hr2 } from '../components/calendar/styled-components'
import HourSelect from '../components/popup/reserve/HourSelect'

const ReserveMeetingRoom = () => {
    return (
        <DivReserve>
            <H2>Reservar</H2>
            <Hr/>
            <ButtonsContainer>
                <Link to="/reserve_table_page"><ButtonPlaces>Taules individuals</ButtonPlaces></Link>
                <Link to="/reserve_office_page"><ButtonPlaces>Despatxos privats</ButtonPlaces></Link>
                <ButtonPlacesFocus>Sala de reunions</ButtonPlacesFocus>
            </ButtonsContainer>
            <H3>Selecciona la data:</H3>
            <Calendar/>
            <ButtonsContainer>
                <ButtonFind>Buscar</ButtonFind>
            </ButtonsContainer>
            <Hr2/>
            <H3>Selecciona l' hora:</H3>
            <HourSelect/>
            <ButtonsContainer>
            <ButtonConfirm>Acceptar</ButtonConfirm>
            </ButtonsContainer>
        </DivReserve>
    )
}

export default ReserveMeetingRoom;
