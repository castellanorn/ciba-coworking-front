import { useState } from "react";
import { DivReserve } from "../table/TableBookingStyled";
import TitleMobile from "../../components/title/Title";
import ContainerButtons from "../../components/container/ButtonsContainer";
import Calendar from "../../components/calendar/Calendar";
import { Hr2, TitleSelectDate } from "../../components/calendar/CalendarStyled";
import { RoleInput } from "../../components/inputs/RoleInput";
import { ButtonFind } from "../../components/buttons/ButtonStyled";
import Map from "../../components/map/Map";
import ConfirmButton from "../../components/buttons/ConfirmButton";
import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import PopUpSuccess from "../../components/popup/reserve/PopUpSuccess";
import { Space } from "../office/OfficeBookingStyled";


const EditIndividualTable = () => {
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    morning: false,
    afternoon: false,
  });
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
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCheckboxes((prev) => ({ ...prev, [name]: checked }));
  };
  const handleRadioChange = (event) => {
    setSelectedOffice(event.target.value);
  };

  const handleFindResults = () => {
    if (selectedDates.length === 0) {
      setError("Si us plau, selecciona un o més dies.");
      return;
    }
    const timeSlot = selectedCheckboxes.morning ? 'Matí' : selectedCheckboxes.afternoon ? 'Tarda' : '';

    if (!timeSlot) {
      setError("Si us plau, selecciona una franja horària.");
      return;
    }
  
    setError("");
  
    console.log("Datos enviados al backend:");
    console.log({
      dates: selectedDates.map(date => date.format("YYYY-MM-DD")), 
      timeSlot: selectedTimeSlot, 
      table: selectedTable, 
    });
  
    setTimeout(() => {
      setSelectedDates([]);
      // setSelectedTimeSlot("");
    }, 2000);
  };

  const handleTableSelection = (table) => {
    setSelectedTable(table);
  };

  return (
    <>
      <DivReserve>
        <TitleMobile title="Edició de reserva individual" />
        

        <Calendar
          onChange={setSelectedDates}
          value={selectedDates}
          setError={setError}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Hr2 />
        <TitleSelectDate>Selecciona la franja horària</TitleSelectDate>
        
        <RoleInput
          label="Matí"
          name="morning"
          selectedOption={selectedOffice}
          onChange={handleRadioChange}
          userRole={"USER"}
        />
        <RoleInput
          label="Tarda"
          name="afternoon"
          selectedOption={selectedOffice}
          onChange={handleRadioChange}
          userRole={"USER"}
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
      <Space/>
    </>
  );
};

export default EditIndividualTable;
