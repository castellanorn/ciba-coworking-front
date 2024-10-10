import { ButtonFind } from "../../components/buttons/ButtonStyled";

import ConfirmButton from "../../components/buttons/ConfirmButton";

import { useState } from "react";

import PopUpSuccess from "../../components/popup/reserve/PopUpSuccess";

import HourSelect from "../../components/inputs/HourSelect";

import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";

import { Space } from "../../pages/meetingRoom/MeetingRoomBookingStyled";

import { DivReserve } from "./MeetingRoomBookingStyled";

import PlacesButton from "../../components/buttons/PlacesButton";

import Calendar from "../../components/calendar/Calendar";

import { Hr2 } from "../../components/calendar/CalendarStyled";

import ContainerButtons from "../../components/container/ButtonsContainer";

import TitleMobile from "../../components/title/Title";

import axios from "axios";

const ReserveMeetingRoom = () => {
  const { authToken } = useContext(AuthContext);

  const [successPopupOpen, setSuccessPopupOpen] = useState(false);

  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);

  const [selectedDates, setSelectedDates] = useState([]);

  const [error, setError] = useState("");

  const headers = {
    "Content-Type": "application/json",

    Authorization: `Bearer ${authToken}`,
  };

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
    if (selectedDates.length === 0) {
      setError("Si us plau, selecciona un o més dies.");

      return;
    }

    setError("");

    console.log("Datos enviados al backend:");

    console.log({
      dates: selectedDates.map((date) => date.format("YYYY-MM-DD")),
    });

    setTimeout(() => {
      setSelectedDates([]);
    }, 2000);
  };

  return (
    <>
      <DivReserve>
        <TitleMobile title="Fer reserva de sala de reunions" />

        <ContainerButtons>
          <PlacesButton
            text="taules individuals"
            focus={false}
            link="/reserva-taula"
          />

          <PlacesButton
            text="oficines privades"
            link="/reserva-oficina"
            focus={false}
          />

          <PlacesButton text="sala de reunions" focus={true} />
        </ContainerButtons>

        <Calendar
          onChange={setSelectedDates}
          value={selectedDates}
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
          slot="slot"
          month="month"
          day="day"
          button={{
            confirmText: "Confirmar",

            cancelText: "Cancelar",
          }}
        />

        <PopUpSuccess open={successPopupOpen} onClose={handleCloseSuccess} />
      </DivReserve>

      <Space></Space>
    </>
  );
};

export default ReserveMeetingRoom;
