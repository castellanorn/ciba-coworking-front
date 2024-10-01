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
import PopUpConfirmReserve from "../components/popup/reserve/PopUpConfirmReserve";
import PopUpSuccess from "../components/popup/reserve/PopUpSuccess";
import Map from "../components/map/Map"; 
import { Space } from "../components/styledComponentsPages/Contact";

const ReserveTable = () => {
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSpace, setSelectedSpace] = useState(""); 
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

  const handleTableSelection = (table) => {
    setSelectedTable(table); 
  };

  const handleSpaceChange = (event) => {
    setSelectedSpace(event.target.value);
  };

  const handleFindResults = () => {
    if (!selectedDate) {
      setError("Si us plau, selecciona un dia.");
      return;
    }
    if (!selectedTable) {
      setError("Si us plau, selecciona una taula.");
      return;
    }
    if (!selectedSpace) {
      setError("Si us plau, selecciona una franja horària.");
      return;
    }
    setError("");
    console.log("Fecha seleccionada:", selectedDate);
    console.log("Taula seleccionada:", selectedTable);
    console.log("Franja horària seleccionada:", selectedSpace);
    handleOpenConfirm();
  };

  return (
    <>
      <DivReserve>
        <TitleMobile title="Fer reserva de taula individual" />
        <ContainerButtons>
          <PlacesButton text="taules individuals" focus={true} />
          <PlacesButton
            text="oficines privades"
            focus={false}
            link="/reservar-despatx"
          />
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

        <Hr2 />
        <TitleSelectDate>Selecciona la franja horària</TitleSelectDate>
        <RadioInput
          label="Matí"
          value="Matí"
          selectedOption={selectedSpace}
          onChange={handleSpaceChange}
        />
        <RadioInput
          label="Tarda"
          value="Tarda"
          selectedOption={selectedSpace}
          onChange={handleSpaceChange}
        />

        <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Buscar</ButtonFind>
        </ContainerButtons>
        <Hr2 />

        <Map onTableSelect={handleTableSelection} />

        <ContainerButtons>
          <ConfirmButton onClick={handleOpenConfirm}>Acceptar</ConfirmButton>
        </ContainerButtons>

        <PopUpConfirmReserve
          open={confirmPopupOpen}
          onCancel={handleCloseConfirm}
          table={selectedTable}
          pageType="table"
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

export default ReserveTable;
