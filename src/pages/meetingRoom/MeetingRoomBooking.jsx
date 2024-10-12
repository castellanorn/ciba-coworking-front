import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ButtonFind } from "../../components/buttons/ButtonStyled";
import ConfirmButton from "../../components/buttons/ConfirmButton";
import PopUpSuccess from "../../components/popup/reserve/PopUpSuccess";
import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import { Space } from "../../pages/meetingRoom/MeetingRoomBookingStyled";
import { DivReserve } from "./MeetingRoomBookingStyled";
import PlacesButton from "../../components/buttons/PlacesButton";
import Calendar from "../../components/calendar/Calendar";
import { Hr2 } from "../../components/calendar/CalendarStyled";
import ContainerButtons from "../../components/container/ButtonsContainer";
import TitleMobile from "../../components/title/Title";
import { apiRequest } from "../../services/apiRequest";
import { API_GET_RESERVATIONS_BY_ID,API_CREATE_RESERVATIONS } from "../../config/apiEndpoints";
import ErrorModal from "../../components/popup/modals/ErrorModal";
import OfficesInput from "../../components/inputs/OfficesInput";
import { array } from 'prop-types';
import { Subtitle } from '../user/UserPagesStyled';

const ReserveMeetingRoom = () => {
  const { authToken,user } = useContext(AuthContext);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);

  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);

  const [selectedDates, setSelectedDates] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);
  const [error, setError] = useState("");
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  const [focus, setFocus] = useState("meetings");
  const navigate = useNavigate();
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  //formatear la hora en 00:00
  const formatHour24hFormat = (hour) => {
    if(hour < 10)
      return "0" + hour;
    return hour + "";// Ensures returning always a string
  }

  const generateDefaultHours = (bookedHours=[]) => {
    const hours = [];
    let startHour = 8;
    let endHour = 20; 

    // First generate all the hours as usual 
    for (let i = startHour; i < endHour; i++) {
      hours.push({
        startDate: `${formatHour24hFormat(i)}:00`,
        endDate: `${formatHour24hFormat(i + 1)}:00`,
      });
    }
    // Then, checks if are there existing bookings 
    // given by the bookedHours arg
    if(bookedHours && Array.isArray(bookedHours) && bookedHours.length > 0){
      // Contains the real hours without the already booked hours 
      const newAvailableHours = [];

      hours.forEach(availableHour => {
        // First check if the start time of the available 
        // hour is already taken 
        const isBusyStartTime = bookedHours.find(busyHour => busyHour.startTime.startsWith(availableHour.startDate));
        const isBusyEndTime = bookedHours.find(busyHour => busyHour.endTime.startsWith(availableHour.endDate));

        if(!isBusyStartTime && !isBusyEndTime){
          //console.log("DISPONIBLE");          
          //console.log(availableHour);          
          newAvailableHours.push(availableHour);
        }
      });
      return newAvailableHours;
    }
    return hours;
  };

  const handleHourChange = (event) => {
    const selectedSlot = availableHours.find(
      (slot) => slot.startDate === event.target.value
    );

    if (selectedSlot) {
      setSelectedHour({
        startTime: selectedSlot.startDate,
        endTime: selectedSlot.endDate,
      });
    }
  };

  const fetchAvailableHours = async (dataRange) => {
    try {
      const response = await apiRequest(
        API_GET_RESERVATIONS_BY_ID(1), 
        "POST",
        dataRange,
        headers
      );

      if (!response || response.length === 0) {
        // Si no se encontraron horas, generar horas por defecto
        const defaultHours = generateDefaultHours();
        setAvailableHours(defaultHours);
      } else {
        const reservedHours = response.map((item) => ({
          startDate: item.startDate,
          endDate: item.endDate,
          startTime: item.startTime,
          endTime: item.endTime,
        }));

        const availableHours = generateDefaultHours(reservedHours);
        setAvailableHours(availableHours);
      }
    } catch (error) {
      console.log("Error obteniendo las horas disponibles:", error.message);
      //setear todo el conjunto de horas
      const defaultHours = generateDefaultHours();
      setAvailableHours(defaultHours);
    }
  };

  const handleFindResults = async () => {
    if (selectedDates.length === 0) {
      setError("Si us plau, selecciona un o més dies.");
      return;
    }
    setError("");

    const startDate = selectedDates[0].format("YYYY-MM-DD");
    const endDate = selectedDates[selectedDates.length - 1].format("YYYY-MM-DD");

    const dataRange = { startDate, endDate };

    await fetchAvailableHours(dataRange);
  };

  const handleOpenSuccess = () => {
    setSuccessPopupOpen(true);
  };

  const handleCloseSuccess = () => {
    setSuccessPopupOpen(false);
    setConfirmationPopupOpen(false); 
    navigate("/panell-usuari")
  };

  const handleOpenConfirm = () => {
    setConfirmationPopupOpen(true);
  };

  const handleCloseConfirm = () => {
    setConfirmationPopupOpen(false);
  };

  const handleAcceptConfirm = async () => {
    if (
      !selectedDates.length ||
      !selectedHour.startTime ||
      !selectedHour.endTime
    ) {
      setError("Selecciona fechas y una hora antes de continuar.");
      return;
    }
  
    try {
      const formattedStartDate = selectedDates[0].format("YYYY-MM-DD");
      const formattedEndDate = selectedDates[0].format("YYYY-MM-DD");
  
      const dataToSend = {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        startTime: selectedHour.startTime,
        endTime: selectedHour.endTime,
        userDTO: {
          id: user.id,
        },
        spaceDTO: {
          id: '1',
        },
      };
  
      console.log("Cuerpo de la solicitud:", dataToSend);
  
      const response = await apiRequest(
        API_CREATE_RESERVATIONS,
        "POST",
        dataToSend,
        headers
      );
  
      const newAvailableHours = availableHours
      .filter((hour) => hour.startDate != selectedHour.startTime && hour.endDate !=selectedHour.endTime)
      setAvailableHours(newAvailableHours)
      handleCloseConfirm();
      handleOpenSuccess();
    } catch (error) {
      setErrorModal({
        isOpen: true,
        message: `No s'ha pogut fet la reserva: ${error.message}`,
     });
    }
  };

  const handleManageClick = (target) => {
    switch (target) {
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
  };

  return (
    <>
      <DivReserve>
        <TitleMobile title="Fer reserva de sala de reunions" />

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

        <Calendar onChange={setSelectedDates} value={selectedDates} setError={setError} />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Buscar</ButtonFind>
        </ContainerButtons>

        <Hr2 />

        {availableHours.length > 0 ? (
          <OfficesInput
            availableHours={availableHours}
            selectedHour={selectedHour}
            onChange={handleHourChange}
          />
        ) : <Subtitle>Tria una data vàlid</Subtitle>}

        <Hr2 />

        <ContainerButtons>
          <ConfirmButton onClick={handleOpenConfirm}>Acceptar</ConfirmButton>
        </ContainerButtons>

         {/* Confirmation and Success Popups */}
         {confirmationPopupOpen && (
          <PopUpConfirmReserve
            open={confirmationPopupOpen}
            onCancel={handleCloseConfirm}
            onConfirm={handleAcceptConfirm}
            reservation={{
              startDate: selectedDates[0].format("YYYY-MM-DD"),
              endDate: selectedDates[0].format("YYYY-MM-DD"),
              startTime: selectedHour.startTime,
              endTime: selectedHour.endTime,
              spaceDTO: { spaceType: '1' }, 
              userDTO: { name: user.name },
            }}
            button={{
              confirmText: "Confirmar",
              cancelText: "Cancelar",
            }}
            actionType="confirm"
          />
        )}

        <PopUpSuccess open={successPopupOpen} onClose={handleCloseSuccess} />
      </DivReserve>

      <Space></Space>
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        message={errorModal.message}
      />
    </>
  );
};

export default ReserveMeetingRoom;

