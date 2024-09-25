import { useState } from "react";
import Calendar from "../components/calendar/Calendar";
// import PopUpConfirmReserve from '../components/popup/reserve/PopUpReserve';
// import PopUpSuccess from '../components/popup/reserve/PopUpSuccess';
// import ConfirmImage from '../assets/confirm-big.png';
import ConfirmButton from "../components/buttons/ConfirmButton";
import ContainerButtons from "../components/container/ButtonsContainer";
import { ButtonFind } from "../components/buttons/ButtonStyled";
import TitleMobile from "../components/title/Title";
import {
  DivReserve,
  Hr2,
  TitleSelectDate,
} from "../components/calendar/CalendarStyled";
import RadioInput from "../components/inputs/RadioInput";
import HourSelect from "../components/inputs/HourSelect";
import PlacesButton from "../components/buttons/PlacesButton";

const ReserveOffice = () => {
  // const [popupOpen, setPopupOpen] = useState(false);
  // const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState("");

  // const handleConfirmReserve = () => {
  //   setPopupOpen(false);
  //   setSuccessPopupOpen(true);
  // };

  // const handleCancelReserve = () => {
  //   setPopupOpen(false);
  // };

  // const handleClose = () => {
  //   setPopupOpen(false);
  // };
  // const handleReserveClick = () => {
  //   setPopupOpen(true);
  // };

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleFindResults = () => {
    if (!selectedDate) {
      setError("Por favor, selecciona una fecha.");
      return;
    }
    setError("");
    console.log("Fecha seleccionada:", selectedDate);
  };

  return (
    <>
      <DivReserve>
        <TitleMobile title="Fer reserva de despatx" />
        <PlacesButton text="Taules individuals" link="/reserve_table_page" />
        <PlacesButton text="Despatxos privats" focus={true} />
        <PlacesButton
          text="Sala de reunions"
          link="/reserve_meeting_room_page"
          focus={false}
        />
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
        <TitleSelectDate>Selecciona la hora</TitleSelectDate>
        <HourSelect />
        <Hr2 />
        <RadioInput
          label="Despatx 1"
          value="Despatx 1"
          selectedOption={selectedTable}
          onChange={handleTableChange}
        />
        <RadioInput
          label="Despatx 2"
          value="Despatx 2"
          selectedOption={selectedTable}
          onChange={handleTableChange}
        />
        <ContainerButtons>
          <ConfirmButton /*onClick={handleReserveClick}*/>
            Acceptar
          </ConfirmButton>
        </ContainerButtons>
        {/* <PopUpConfirmReserve
                open={successPopupOpen}
                onConfirm={handleConfirmReserve}
                onCancel={handleCancelReserve}
                title="Confirmar reserva"
                subtitle="Setembre 26"
                timeSlot="Matí"
                spaceType="Espai reservat: "
                table="12"
                confirmText="Acceptar"
                cancelText="Cancel·lar"
            />
            <PopUpSuccess
                open={popupOpen}
                onClose={handleClose}
                title="Reserva confirmada"
                imageSrc={ConfirmImage}
                buttonText="Acceptar"
            /> */}
      </DivReserve>
    </>
  );
};

export default ReserveOffice;
