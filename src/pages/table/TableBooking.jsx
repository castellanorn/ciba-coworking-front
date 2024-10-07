import { useState } from "react";
import Calendar from "../../components/calendar/Calendar";
import ContainerButtons from "../../components/container/ButtonsContainer";
import TitleMobile from "../../components/title/Title";
import { ButtonFind } from "../../components/buttons/ButtonStyled";
import ConfirmButton from "../../components/buttons/ConfirmButton";
import PopUpSuccess from "../../components/popup/reserve/PopUpSuccess";
import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import Map from "../../components/map/Map";
import { Space } from "../../pages/office/OfficeBookingStyled";
import PlacesButton from "../../components/buttons/PlacesButton";
import { DivReserve } from "./TableBookingStyled";
import { Hr2, TitleSelectDate } from "../../components/calendar/CalendarStyled";
import { RoleInput } from "../../components/inputs/RoleInput";
import { API_GET_SPACES_TABLES } from "../../config/apiEndpoints";
import {apiRequest} from "../../services/apiRequest"

const ReserveTable = () => {
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [reservationData, setReservationData] = useState(null); //reservation data lo usaremos para mapear las mesas
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

  const handleRadioChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };
  const fetchReservationData = async (startDate, endDate, startTime, endTime) => {
    try {
      const queryParams = new URLSearchParams({
        startDate,
        endDate,
        startTime,
        endTime,
      }).toString();
      const urlWithParams = `${API_GET_SPACES_TABLES()}?${queryParams}`;
      const response = await apiRequest(urlWithParams,"GET");
      
      setReservationData(response);
      
    } catch (error) {
      setError(error.response?.data.message || error.message);
    }
  };

  const handleFindResults = async () => {
    if (selectedDates.length === 0) {
      setError("Si us plau, selecciona un o més dies.");
      return;
    }

    if (!selectedTimeSlot) {
      setError("Si us plau, selecciona una franja horària.");
      return;
    }

    setError("");
    const startDate = selectedDates[0].toISOString().split('T')[0];
    const endDate = selectedDates[selectedDates.length - 1].toISOString().split('T')[0]; 
    let startTime;
    let endTime;
    if (selectedTimeSlot === "Matí") {
      startTime = "08:00:00";  
      endTime = "13:59:59";    
    } else if (selectedTimeSlot === "Tarda") {
      startTime = "14:00:00";  
      endTime = "20:00:00";    
    }
  
    console.log("Fechas seleccionadas:", startDate, endDate);
    console.log("Franja horaria seleccionada:", selectedTimeSlot);
    console.log("Horas de inicio:", startTime, "Horas de fin:", endTime);
  
    await fetchReservationData(startDate, endDate, startTime, endTime); 
  };
  
  const handleTableSelection = (table) => {
    setSelectedTable(table);
  };

  return (
    <>
      <DivReserve>
        <TitleMobile title="Fer reserva de taula individual" />
        <ContainerButtons>
          <PlacesButton text="taules individuals" focus={true} />
          <PlacesButton
            text="oficines privades"
            link="/reserva-oficina"
            focus={false}
          />
          <PlacesButton
            text="sala de reunions"
            link="/reserva-reunio"
            focus={false}
          />
        </ContainerButtons>

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
          selectedOption={selectedTimeSlot}
          onChange={handleRadioChange}
          userRole={"USER"}
        />
        <RoleInput
          label="Tarda"
          name="afternoon"
          selectedOption={selectedTimeSlot}
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
      <Space />
    </>
  );
};

export default ReserveTable;
