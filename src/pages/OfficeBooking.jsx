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
import PopUpConfirmReserve from "../components/popup/reserve/PopUpConfirmReserve";
import HourSelect from "../components/inputs/HourSelect";
import { Space } from "../components/styledComponentsPages/Contact";

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
        <TitleMobile title="Fer reserva d' oficina" />
        <ContainerButtons>
          <PlacesButton
            text="taules individuals"
            focus={false}
            link="/reservar-taula"
          />
          <PlacesButton text="oficines privades" focus={true} />
          <PlacesButton
            text="sala de reunions"
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
        <TitleSelectDate>Selecciona l'oficina</TitleSelectDate>
        <RadioInput
          label="Oficina 1"
          value="Oficina 1"
          selectedOption={selectedTable}
          onChange={handleTableChange}
        />
        <RadioInput
          label="Oficina 2"
          value="Oficina 2"
          selectedOption={selectedTable}
          onChange={handleTableChange}
        />

        <ContainerButtons>
          <ConfirmButton onClick={handleOpenConfirm}>Acceptar</ConfirmButton>
        </ContainerButtons>

        <PopUpConfirmReserve
          open={confirmPopupOpen}
          onCancel={handleCloseConfirm}
          table={selectedTable}
          pageType="office"
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
      <Space></Space>
    </>
  );
};

export default ReserveOffice;
