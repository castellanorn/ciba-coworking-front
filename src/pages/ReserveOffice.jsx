import { Link } from 'react-router-dom'
import Calendar from '../components/calendar/Calendar'
import { ButtonsContainer, DivReserve, H2, H3, Hr, Hr2 } from '../components/calendar/CalendarStyled'
import { ButtonConfirm, ButtonFind, ButtonPlaces, ButtonPlacesFocus } from '../components/buttons/ButtonStyled'
import RadioInput from '../components/inputs/RadioInput'
import HourSelect from '../components/inputs/HourSelect'
import { useState } from 'react'

const ReserveOffice = () => {
    const [selectedOffice, setSelectedOffice] = useState('');
    const handleOfficeChange = (event) => {
        setSelectedOffice(event.target.value)
    };
    return (
        <DivReserve>
            <H2>Reservar</H2>
            <Hr/>
            <ButtonsContainer>
                <Link to="/reserve_table_page"><ButtonPlaces>Taules individuals</ButtonPlaces></Link>
                <ButtonPlacesFocus>Despatxos privats</ButtonPlacesFocus>
                <Link to="/reserve_meeting_room_page"><ButtonPlaces>Sala de reunions</ButtonPlaces></Link>
            </ButtonsContainer>
            <H3>Selecciona la data:</H3>
            <Calendar/>
            <ButtonsContainer>
                <ButtonFind>Buscar</ButtonFind>
            </ButtonsContainer>
            <Hr2/>
            <H3>Selecciona l' hora:</H3>
            <HourSelect/>
            <Hr2/>
            <H3>Selecciona el despatx:</H3>
            <RadioInput 
                label="Despatx 1"
                selectedOption={selectedOffice}
                onChange={handleOfficeChange}
                />
            <RadioInput
                label="Despatx 2"
                selectedOption={selectedOffice}
                onChange={handleOfficeChange}
                />
            <ButtonsContainer>
                <ButtonConfirm>Acceptar</ButtonConfirm>
            </ButtonsContainer>
        </DivReserve>
    )
}

export default ReserveOffice;
