import PlacesButton from "../components/buttons/PlacesButton";
import Calendar from "../components/calendar/Calendar";
import { DivReserve, Hr2 } from "../components/calendar/CalendarStyled";
import ContainerButtons from "../components/container/ButtonsContainer";
import TitleMobile from "../components/title/Title";
import { ButtonFind } from "../components/buttons/ButtonStyled";
import ConfirmButton from "../components/buttons/ConfirmButton";
import { useState } from "react";
import PopUpSuccess from "../components/popup/reserve/PopUpSuccess";
import HourSelect from "../components/inputs/HourSelect";
import PopUpConfirmReserve from "../components/popup/reserve/PopUpConfirmReserve";

const ReserveMeetingRoom = () => {
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
        <TitleMobile title="Fer reserva de sala de reunions" />
        <ContainerButtons>
          <PlacesButton
            text="Taules individuals"
            focus={false}
            link="/reservar-taula"
          />
          <PlacesButton
            text="Despatxos privats"
            link="/reservar-despatx"
            focus={false}
          />
          <PlacesButton text="Sala de reunions" focus={true} />
        </ContainerButtons>

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
          <ConfirmButton onClick={handleOpenSuccess}>Acceptar</ConfirmButton>
        </ContainerButtons>
        <PopUpConfirmReserve
          open={confirmPopupOpen}
          onClose={handleCloseConfirm}
          pageType="meetingroom"
          onAccept={handleAcceptConfirm}
        />

        <PopUpSuccess open={successPopupOpen} onClose={handleCloseSuccess} />
      </DivReserve>
    </>
  );
};

export default ReserveMeetingRoom;
