import { useState } from 'react';
import Calendar from '../components/calendar/Calendar';
import PopUpSuccess from '../components/popup/reserve/PopUpSuccess';
import ConfirmImage from '../assets/confirm-big.png';
import ConfirmButton from '../components/buttons/ConfirmButton';
import ContainerButtons from '../components/container/ButtonsContainer';
import { ButtonFind, ButtonPlaces, ButtonPlacesFocus } from '../components/buttons/ButtonStyled';
import TitleMobile from '../components/title/Title';
import { DivReserve, Hr2, TitleSelectDate } from '../components/calendar/CalendarStyled';
import HourSelect from '../components/inputs/HourSelect';

const ReserveMeetingRoom = () => {
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState('');

  const handleReserveClick = () => {
    setSuccessPopupOpen(true);
  };

  const handleClose = () => {
    setSuccessPopupOpen(false);
  };

  const handleFindResults = () => {
    if (!selectedDate) {
      setError('Por favor, selecciona una fecha.');
      return;
    }
    setError('');
    console.log('Fecha seleccionada:', selectedDate);
  };

  return (
    <>
      <DivReserve>
        <TitleMobile title="Fer reserva de sala de reunions" />
        <ContainerButtons>
          <ButtonPlaces text="Taules individuals" link="/reserve_table_page" />
          <ButtonPlacesFocus text="Despatxos privats" focus />
          <ButtonPlaces text="Sala de reunions" link="/reserve_meeting_room_page" />
        </ContainerButtons>
        <Calendar onChange={setSelectedDate} value={selectedDate} setError={setError} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Buscar</ButtonFind>
        </ContainerButtons>
        <Hr2 />
        <TitleSelectDate>Selecciona la hora</TitleSelectDate>
        <HourSelect />
        <Hr2 />
        <ContainerButtons>
          <ConfirmButton onClick={handleReserveClick}>Acceptar</ConfirmButton>
        </ContainerButtons>
        <PopUpSuccess
          open={successPopupOpen}
          onClose={handleClose}
          title="Reserva confirmada"
          imageSrc={ConfirmImage}
          buttonText="Acceptar"
        />
      </DivReserve>
    </>
  );
};

export default ReserveMeetingRoom;