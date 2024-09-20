import { Link } from 'react-router-dom'
import Calendar from '../components/calendar/Calendar'

import { ButtonConfirm, ButtonFind, ButtonPlaces, ButtonPlacesFocus } from '../components/buttons/ButtonStyled'
import RadioInput from '../components/inputs/RadioInput'
import { useState } from 'react'
import { ButtonsContainer, DivReserve, Hr, Hr2 } from '../components/calendar/CalendarStyled'
import { H2, H3 } from '../components/titles/titleStyled'

const ReserveTable = () => {
  const [selectedTable, setSelectedTable] = useState('');

    const handleTableChange = (event) => {
        setSelectedTable(event.target.value);
    };
  return (
    <DivReserve>
            <H2>Nova reserva</H2>
            <Hr/>
            <ButtonsContainer>
                <ButtonPlacesFocus>Taules individuals</ButtonPlacesFocus>
                <Link to="/reserve_office_page"><ButtonPlaces>Despatxos privats</ButtonPlaces></Link>
                <Link to="/reserve_meeting_room_page"><ButtonPlaces>Sala de reunions</ButtonPlaces></Link>
            </ButtonsContainer>
            <H3>Selecciona un dia:</H3>
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