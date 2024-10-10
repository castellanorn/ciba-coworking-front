import { useState, useContext, useEffect } from "react";

import { AuthContext } from "../../auth/AuthProvider";  
import { apiRequest } from "../../services/apiRequest";
import { API_GET_TABLES_BY_DATE, API_CREATE_RESERVATION_TABLES_BY_USER } from "../../config/apiEndpoints"; 
import axios from 'axios';  // Importa Axios

import Calendar from "../../components/calendar/Calendar";
import ContainerButtons from "../../components/container/ButtonsContainer";
import TitleMobile from "../../components/title/Title";
import { ButtonFind } from "../../components/buttons/ButtonStyled";
import ConfirmButton from "../../components/buttons/ConfirmButton";
import PopUpSuccess from "../../components/popup/reserve/PopUpSuccess";
import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import { SeatSpace } from "../../components/map/SeatSpace"; 
import { Space } from "../../pages/office/OfficeBookingStyled";
import PlacesButton from "../../components/buttons/PlacesButton";
import { DivReserve } from "./TableBookingStyled";
import { Hr2, TitleSelectDate } from "../../components/calendar/CalendarStyled";
import { RoleInput } from "../../components/inputs/RoleInput";


const ReserveTable = () => {
  const { authToken, userRole } = useContext(AuthContext); 
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [availableTables, setAvailableTables] = useState([]);
  const [reservationData, setReservationData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    Authorization: `Bearer ${authToken}`,  
  };

  

  const handleTableSelection = (table) => {
    setSelectedTable(table);
  };

  const handleRadioChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  
  const fetchAvailableTables = async (dataRange) => {
    setLoading(true);  
    try {
      const response = await apiRequest(API_GET_TABLES_BY_DATE, "POST", dataRange, headers);
      const availableTables = response.map(table => ({
          id: table.id,
          title: table.name,
          available: table.spaceStatus === 'actiu' ? 'color' : 'not_salable',
        }));
      setAvailableTables(availableTables);
     
    } catch (error) {
      console.error("Error fetching tables: ", error.message);
      setError("No s'han pogut obtenir les taules disponibles.");
    } finally {
      setLoading(false); 
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

    const startDate = new Date(selectedDates[0].$d.getTime() - (selectedDates[0].$d.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    const endDate = new Date(selectedDates[selectedDates.length - 1].$d.getTime() - (selectedDates[selectedDates.length - 1].$d.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    let startTime, endTime;

    if (selectedTimeSlot === "Matí") {
      startTime = "08:00:00";
      endTime = "13:59:59";
    } else if (selectedTimeSlot === "Tarda") {
      startTime = "14:00:00";
      endTime = "20:00:00";
    }

    const dataRange = {
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
    };

    await fetchAvailableTables(dataRange);
  }

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

  
  // Función para crear una reserva de mesa utilizando Axios
 /*  const createTableReservation = async (reservationData) => {
    const url = `${API_CREATE_RESERVATION_TABLES_BY_USER}`;
    
    try {
      const response = await axios.post(url, reservationData, { headers });
      return response.data; // Devuelve la reserva creada
    } catch (error) {
      console.error("Error creating reservation:", error);
      setError("No s'ha pogut crear la reserva.");
    }
  }; */

  

  return (
    <>
      <DivReserve>
        <TitleMobile title="Fer reserva de taula individual" />
        <ContainerButtons>
          <PlacesButton text="taules individuals" focus={true} />
          <PlacesButton text="oficines privades" link="/reserva-oficina" focus={false} />
          <PlacesButton text="sala de reunions" link="/reserva-reunio" focus={false} />
        </ContainerButtons>

        <Calendar onChange={setSelectedDates} value={selectedDates} setError={setError} />
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Hr2 />
        <TitleSelectDate>Selecciona la franja horària</TitleSelectDate>

        <RoleInput label="Matí" name="morning" selectedOption={selectedTimeSlot} onChange={handleRadioChange} userRole={"USER"} />
        <RoleInput label="Tarda" name="afternoon" selectedOption={selectedTimeSlot} onChange={handleRadioChange} userRole={"USER"} />

        <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Buscar</ButtonFind>
        </ContainerButtons>
        <Hr2 />

        <SeatSpace blocks={reservationData} onSeatSelect={handleTableSelection} />

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