// import { useState } from "react";
// import Calendar from "../components/calendar/Calendar";
// import PopUpConfirmReserve from "../components/popup/reserve/PopUpReserve";
// import PopUpSuccess from "../components/popup/reserve/PopUpSuccess";
// import ConfirmImage from "../assets/confirm-big.png";
// import ConfirmButton from "../components/buttons/ConfirmButton";
// import ContainerButtons from "../components/container/ButtonsContainer";
// import { ButtonFind } from "../components/buttons/ButtonStyled";
// import TitleMobile from "../components/title/Title";
// import {
//   DivReserve,
//   Hr2,
//   TitleSelectDate,
// } from "../components/calendar/CalendarStyled";
// import RadioInput from "../components/inputs/RadioInput";
// import Map from "../components/map/Map";
// import PlacesButton from "../components/buttons/PlacesButton";

import { DivReserve } from "../components/calendar/CalendarStyled";
import TitleMobile from "../components/title/Title";

const ReserveTable = () => {
  // const [popupOpen, setPopupOpen] = useState(false);
  // const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  // const [selectedTable, setSelectedTable] = useState("");
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [error, setError] = useState("");

  // const handleConfirmReserve = () => {
  //   setPopupOpen(false);
  //   setSuccessPopupOpen(true);
  // };

  // const handleCancelReserve = () => {
  //   setPopupOpen(false);
  // };

  // const handleClose = () => {
  //   setSuccessPopupOpen(false);
  // };

  // const handleTableChange = (event) => {
  //   setSelectedTable(event.target.value);
  // };

  // const handleFindResults = () => {
  //   if (!selectedDate) {
  //     setError("Por favor, selecciona una fecha.");
  //     return;
  //   }
  //   setError("");
  //   console.log("Fecha seleccionada:", selectedDate);
  // };
  return (
    <>
      <DivReserve>
      <TitleMobile title="Fer reserva de taula individual" />
{/*
        <ContainerButtons>
          <PlacesButton text="Taules individuals" focus={true} />
          <PlacesButton
            text="Despatxos privats"
            link="/reserve_office_page"
            focus={false}
          />
          <PlacesButton
            text="Sala de reunions"
            link="/reserve_meeting_room_page"
            focus={false}
          />
        </ContainerButtons>

        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          setError={setError}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Hr2 />

        <TitleSelectDate>Selecciona la franja horària</TitleSelectDate>
        <RadioInput
          label="Matí"
          value="Matí"
          selectedOption={selectedTable}
          onChange={handleTableChange}
        />
        <RadioInput
          label="Tarda"
          value="Tarda"
          selectedOption={selectedTable}
          onChange={handleTableChange}
        />
        <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Buscar</ButtonFind>
        </ContainerButtons>

        <Hr2 />

        <Map />

        <ContainerButtons>
          <ConfirmButton onClick={() => setPopupOpen(true)}>
            Acceptar
          </ConfirmButton>
        </ContainerButtons>

        <PopUpConfirmReserve
          open={popupOpen}
          onConfirm={handleConfirmReserve}
          onCancel={handleCancelReserve}
          title="Confirmar reserva"
          subtitle="Setembre 26"
          timeSlot={selectedTable}
          spaceType="Espai reservat: Taula individual"
          table="12"
          confirmText="Acceptar"
          cancelText="Cancel·lar"
        />

        <PopUpSuccess
          open={successPopupOpen}
          onClose={handleClose}
          title="Reserva confirmada"
          imageSrc={ConfirmImage}
          buttonText="Acceptar"
        />
        */}
      </DivReserve>
      
    </> 
  );
};

export default ReserveTable;
