import { useState, useContext } from "react";

import { AuthContext } from "../../auth/AuthProvider";

import { useNavigate } from "react-router-dom";
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

import {
  API_GET_TABLES_BY_DATE,
  API_CREATE_RESERVATION_TABLES_BY_USER,
} from "../../config/apiEndpoints";

import axios from "axios";

const ReserveTable = () => {
  const { authToken } = useContext(AuthContext);

  const [successPopupOpen, setSuccessPopupOpen] = useState(false);

  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);

  const [selectedTable, setSelectedTable] = useState("");

  const [selectedDates, setSelectedDates] = useState([]);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const [reservationData, setReservationData] = useState(null);

  const [error, setError] = useState("");
  const [focus, setFocus] = useState("tables");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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

  const handleRadioChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  const fetchAvailableTables = async (date, startTime, endTime) => {
    const url = `${API_GET_TABLES_BY_DATE}?date=${date}&startTime=${startTime}&endTime=${endTime}`;

    try {
      const response = await axios.get(url, { headers });

      setReservationData(response.data); // Asume que la respuesta es un array de mesas disponibles
    } catch (error) {
      console.error("Error fetching available tables:", error);

      setError("No s'han pogut obtenir les taules disponibles.");
    }
  };

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

    const formatDateToLocal = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');  // Mes empieza desde 0
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    const startDate = formatDateToLocal(selectedDates[0]);
    const endDate = formatDateToLocal(selectedDates[selectedDates.length - 1]);

    let startTime;

    let endTime;

    if (selectedTimeSlot === "Matí") {
      startTime = "08:00:00";

      endTime = "13:59:59";
    } else if (selectedTimeSlot === "Tarda") {
      startTime = "14:00:00";

      endTime = "20:00:00";
    }

    console.log("Dia/dies seleccionats:", startDate, endDate);

    console.log("Franja horaria seleccionada:", selectedTimeSlot);

    console.log("Hora d'inici:", startTime, "Hora de fi:", endTime);

    // await fetchAvailableTables(startDate, startTime, endTime);
  };

  const handleTableSelection = (table) => {
    setSelectedTable(table);
  };
  const handleManageClick =(target)=>{
    switch(target){
      case "tables":
        setFocus("tables");
        navigate("/reserva-taula");
        break;
      case "offices":
        setFocus("offices");
        navigate("/reserva-oficina"); 
        break;
      case "meetings":
        setFocus("meetings");
        navigate("/reserva-reunio"); 
        break;
    }
  }

  return (
    <>
      <DivReserve>
        <TitleMobile title="Fer reserva de taula individual" />

        <ContainerButtons>
          <PlacesButton
                text="Taules individuals"
                onClick={() => handleManageClick("tables")}
                focus={focus === "tables"}
            />
            <PlacesButton
                text="Oficines privades"
                onClick={() => handleManageClick("offices")}
                focus={focus === "offices"}
            />
            <PlacesButton
                text="Sala de reunions"
                onClick={() => handleManageClick("meetings")}
                focus={focus === "meetings"}
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

        <Map onTableSelect={handleTableSelection} tableData={reservationData} />

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
