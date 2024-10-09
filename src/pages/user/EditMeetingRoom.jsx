import { useState } from "react";
import { DivReserve, Space } from "../meetingRoom/MeetingRoomBookingStyled";
import TitleMobile from "../../components/title/Title";
import ContainerButtons from "../../components/container/ButtonsContainer";
import Calendar from "../../components/calendar/Calendar";
import { ButtonFind } from "../../components/buttons/ButtonStyled";
import { Hr2 } from "../../components/calendar/CalendarStyled";
import HourSelect from "../../components/inputs/HourSelect";
import ConfirmButton from "../../components/buttons/ConfirmButton";
import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import PopUpSuccess from "../../components/popup/reserve/PopUpSuccess";


const EditMeetingRoom = () => {
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState("");

  const handleOpenSuccess = () => {
    setSuccessPopupOpen(true);
  };

  const handleCloseSuccess = () => {
    setSuccessPopupOpen(false);
  };

  const handleOpenConfirm = () => {
    setConfirmPopupOpen(true);
  };

  const handleCloseConfirm = () => {
    setConfirmPopupOpen(false);
  };

  const handleAcceptConfirm = () => {
    handleCloseConfirm();
    handleOpenSuccess();
  };

  const handleFindResults = () => {
    if (!selectedDate) {
      setError("Si us plau, selecciona un dia.");
      return;
    }
    setError("");
    console.log("Fecha seleccionada:", selectedDate);
    handleOpenConfirm();
  };

  return (
    <>
      <DivReserve>
        <TitleMobile title="Edició de reserva sala de reunions" />

        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          setError={setError}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Buscar</ButtonFind>
        </ContainerButtons>
        <Hr2 />
        <HourSelect />
        <Hr2 />

        <ContainerButtons>
          <ConfirmButton onClick={handleOpenConfirm}>Acceptar</ConfirmButton>
        </ContainerButtons>


        <PopUpConfirmReserve
          open={confirmPopupOpen}
          onCancel={handleCloseConfirm}
          pageType="meetingRoom" 
          onConfirm={handleAcceptConfirm}
          slot='slot'
          month='month'
          day='day'
          button={{
            confirmText: "Confirmar", 
            cancelText: "Cancelar"    
          }}
        />

        <PopUpSuccess open={successPopupOpen} onClose={handleCloseSuccess} />
      </DivReserve>
      <Space/>
    </>
  );
};

export default EditMeetingRoom;