import { useState } from "react";
import PlacesButton from "../components/buttons/PlacesButton";
import Calendar from "../components/calendar/Calendar";
import {
  DivReserve,
  Hr2,
  TitleSelectDate,
} from "../components/calendar/CalendarStyled";
import ContainerButtons from "../components/container/ButtonsContainer";
import TitleMobile from "../components/title/Title";
import { ButtonFind } from "../components/buttons/ButtonStyled";
import RadioInput from "../components/inputs/RadioInput";
import ConfirmButton from "../components/buttons/ConfirmButton";
import PopUpSuccess from "../components/popup/reserve/PopUpSuccess";
import PopUpConfirmReserve from "../components/popup/reserve/PopUpConfirmReserve"; // Importamos el nuevo popup dinámico
import HourSelect from "../components/inputs/HourSelect";

const ReserveOffice = () => {
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
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

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
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
        <TitleMobile title="Fer reserva de despatx" />
        <ContainerButtons>
          <PlacesButton
            text="Taules individuals"
            focus={false}
            link="/reservar-taula"
          />
          <PlacesButton text="Despatxos privats" focus={true} />
          <PlacesButton
            text="Sala de reunions"
            link="/reservar-reunio"
            focus={false}
          />
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
        <TitleSelectDate>Selecciona el despatx</TitleSelectDate>
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
          <ConfirmButton onClick={handleOpenConfirm}>Acceptar</ConfirmButton>
        </ContainerButtons>

        {/* PopUpConfirmReserve con lógica condicional */}
        <PopUpConfirmReserve
          open={confirmPopupOpen}
          onClose={handleCloseConfirm}
          pageType="office" // Le decimos que esta es la página de oficinas
          onAccept={handleAcceptConfirm}
        />

        {/* PopUpSuccess */}
        <PopUpSuccess open={successPopupOpen} onClose={handleCloseSuccess} />
      </DivReserve>
    </>
  );
};

export default ReserveOffice;
