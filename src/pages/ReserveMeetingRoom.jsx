import { Link } from 'react-router-dom'
import Calendar from '../components/calendar/Calendar'
import HourSelect from '../components/inputs/HourSelect'
import {DivReserve, ButtonsContainer, Hr, Hr2} from '../components/calendar/CalendarStyled'
import { ButtonConfirm, ButtonFind, ButtonPlaces, ButtonPlacesFocus } from '../components/buttons/ButtonStyled'
import { H2, H3 } from '../components/titles/titleStyled'

const ReserveMeetingRoom = () => {
    return (
        <DivReserve>
            <H2>Nova reserva</H2>
            <Hr/>
            <ButtonsContainer>
                <Link to="/reserve_table_page"><ButtonPlaces>Taules individuals</ButtonPlaces></Link>
                <Link to="/reserve_office_page"><ButtonPlaces>Despatxos privats</ButtonPlaces></Link>
                <ButtonPlacesFocus>Sala de reunions</ButtonPlacesFocus>
            </ButtonsContainer>
            <H3>Selecciona un dia:</H3>
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
