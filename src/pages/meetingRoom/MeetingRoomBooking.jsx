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

  const generateDefaultHours = () => {
    const hours = [];
    let startHour = 8;
    let endHour = 20; // 8 PM

    for (let i = startHour; i < endHour; i++) {
      hours.push({
        startDate: `${i}:00:00`,
        endDate: `${i + 1}:00:00`,
      });
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
        API_GET_RESERVATIONS_BY_ID(1), // ID estático como se mencionó
        "POST",
        dataRange,
        headers
      );

      if (!response || response.status === 404 || !response.availableHours || response.availableHours.length === 0) {
        // Si no se encontraron horas, generar horas por defecto
        const defaultHours = generateDefaultHours();
        setAvailableHours(defaultHours);
      } else {
        const availableHours = response.availableHours.map((item) => ({
          startDate: item.startDate,
          endDate: item.endDate,
        }));
        setAvailableHours(availableHours);
      }
    } catch (error) {
      console.log("Error obteniendo las horas disponibles:", error.message);
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
  
      console.log("Reserva creada exitosamente:", response);
  
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

          {availableHours.length > 0 && (
        <OfficesInput
          availableHours={availableHours}
          selectedHour={selectedHour}
          onChange={handleHourChange}
        />
      )}

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

