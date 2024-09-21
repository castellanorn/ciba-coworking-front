import { Link } from 'react-router-dom'
import Calendar from '../components/calendar/Calendar'
import { ButtonConfirm, ButtonFind, ButtonPlaces, ButtonPlacesFocus } from '../components/buttons/ButtonStyled'
import RadioInput from '../components/inputs/RadioInput'
import { useState } from 'react'
import { ButtonsContainer, DivReserve, Hr, Hr2 } from '../components/calendar/CalendarStyled'
import { H2, H3 } from '../components/titles/titleStyled'
import PopUpConfirmReserve from '../components/popup/reserve/PopUpReserve'
import PopUpSuccess from '../components/popup/reserve/PopUpSuccess'

const ReserveTable = () => {
  const [selectedTable, setSelectedTable] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);

    const handleTableChange = (event) => {
        setSelectedTable(event.target.value);
    };
    const handleConfirmReserve = () => {
      setPopupOpen(false);
      setSuccessPopupOpen(true);
        
    };
    const handleCancelReserve = () => {
      setPopupOpen(false); 
    };
    const handleSuccessClose = () => {
      setSuccessPopupOpen(false);

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
            <H3>Selecciona un dia:</H3>
            <H3>(MAPA)</H3>
            <ButtonsContainer>
              <ButtonConfirm onClick={() => setPopupOpen(true)}>Fer reserva</ButtonConfirm>
            </ButtonsContainer>
            <PopUpConfirmReserve
              open={popupOpen}
              onConfirm={handleConfirmReserve}
              onCancel={handleCancelReserve}
          />
            <PopUpSuccess
              open={successPopupOpen}
              onClose={handleSuccessClose}
          />
        </DivReserve>
  )
};
export default ReserveTable;