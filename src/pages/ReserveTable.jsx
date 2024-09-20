import { Link } from 'react-router-dom'
import Calendar from '../components/calendar/Calendar'
import { ButtonsContainer, DivReserve, H2, H3, Hr, Hr2 } from '../components/calendar/CalendarStyled'
import { ButtonConfirm, ButtonFind, ButtonPlaces, ButtonPlacesFocus } from '../components/buttons/ButtonStyled'
import RadioInput from '../components/inputs/RadioInput'
import { useState } from 'react'

const ReserveTable = () => {
  const [selectedTable, setSelectedTable] = useState('');

    const handleTableChange = (event) => {
        setSelectedTable(event.target.value);
    };
  return (
    <DivReserve>
            <H2>Reservar</H2>
            <Hr/>
            <ButtonsContainer>
                <ButtonPlacesFocus>Taules individuals</ButtonPlacesFocus>
                <Link to="/reserve_office_page"><ButtonPlaces>Despatxos privats</ButtonPlaces></Link>
                <Link to="/reserve_meeting_room_page"><ButtonPlaces>Sala de reunions</ButtonPlaces></Link>
            </ButtonsContainer>
            <H3>Selecciona la data:</H3>
            <Calendar/>
            <Hr2/>
            <H3>Selecciona la franja horària</H3>
            <RadioInput 
              label="Matí"
              selectedOption={selectedTable}
              onChange={handleTableChange}
              />
            <RadioInput 
              label="Tarda"
              selectedOption={selectedTable}
              onChange={handleTableChange}
                />
            <ButtonsContainer>
                <ButtonFind>Buscar</ButtonFind>
            </ButtonsContainer>
            <Hr2/>
            <ButtonsContainer>
              <ButtonConfirm>Acceptar</ButtonConfirm>
            </ButtonsContainer>
        </DivReserve>
  )
}

export default ReserveTable;