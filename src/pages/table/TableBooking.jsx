import { useState, useContext } from "react";

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

  

  // Función para obtener mesas disponibles utilizando Axios
  /* const fetchAvailableTables = async (date, startTime, endTime) => {
    const url = API_GET_TABLES_BY_DATE;
    const data = {
      startDate: date,
      endDate: date, // Ajusta esto si necesitas un rango de fechas
      startTime: startTime,
      endTime: endTime
    };
    console.log("Datos enviados a la API:", data); // Verifica los datos en la consola
    
    try {
      const response = await axios.get(url, data, headers );
      console.log("Datos recibidos de la API:", response.data); // Aquí se muestra la respuesta en la consola
      const availableTables = response.data
        .map(table => ({
          id: table.id,
          title: table.name,
          available: table.spaceStatus === 'actiu' ? 'color' : 'not_salable',
        }));
      setReservationData(availableTables);
    } catch (error) {
      console.error("Error fetching available tables:", error);
      setError("No s'han pogut obtenir les taules disponibles.");
    }
  }; 
   */
  
  console.log("Datos de reserva antes de pasar a SeatSpace:", reservationData);

  // Función para crear una reserva de mesa utilizando Axios
  const createTableReservation = async (reservationData) => {
    const url = `${API_CREATE_RESERVATION_TABLES_BY_USER}`;
    
    try {
      const response = await axios.post(url, reservationData, { headers });
      return response.data; // Devuelve la reserva creada
    } catch (error) {
      console.error("Error creating reservation:", error);
      setError("No s'ha pogut crear la reserva.");
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
  
    await fetchAvailableTables(startDate, startTime, endTime); 
  
    // Verifica los datos recibidos
    console.log("Datos de reserva:", reservationData);
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