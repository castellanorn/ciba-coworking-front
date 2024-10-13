import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { array } from "prop-types";

import { apiRequest } from "../../services/apiRequest";
import { API_GET_RESERVATIONS_BY_ID, API_UPDATE_RESERVATION} from "../../config/apiEndpoints";
import { AuthContext } from "../../auth/AuthProvider";

import { ButtonFind } from "../../components/buttons/ButtonStyled";
import ConfirmButton from "../../components/buttons/ConfirmButton";
import HourSelect from "../../components/inputs/HourSelect";
import { Space } from "../../pages/meetingRoom/MeetingRoomBookingStyled";
import { DivReserve } from "../../pages/meetingRoom/MeetingRoomBookingStyled";
import PlacesButton from "../../components/buttons/PlacesButton";
import Calendar from "../../components/calendar/Calendar";
import { Hr2 } from "../../components/calendar/CalendarStyled";
import ContainerButtons from "../../components/container/ButtonsContainer";
import TitleMobile from "../../components/title/Title";
import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import ConfirmationPopup from "../../components/popup/confirmationPopup/ConfirmationPopup";
import ErrorModal from "../../components/popup/modals/ErrorModal";
import OfficesInput from "../../components/inputs/OfficesInput";

import { Subtitle } from "../user/UserPagesStyled";
import CancelButton from "../../components/buttons/CancelButton";

const ReserveMeetingRoom = () => {
  const navigate = useNavigate();
  const { authToken, userRole, user } = useContext(AuthContext);
  const location = useLocation(); 
  const reservationId = location.state?.reservationId;

  const [selectedDates, setSelectedDates] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState("");
  const [error, setError] = useState("");
  const [focus, setFocus] = useState("meetings");

  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  const formatHour24hFormat = (hour) => {
    if (hour < 10) return "0" + hour;
    return hour + ""; 
  };

  const generateDefaultHours = (bookedHours = []) => {
    const hours = [];
    let startHour = 8;
    let endHour = 20;

    for (let i = startHour; i < endHour; i++) {
      const startHourFormatted = String(i).padStart(2, "0");
      const endHourFormatted = String(i + 1).padStart(2, "0");

      hours.push({
        startDate: `${startHourFormatted}:00:00`,
        endDate: `${endHourFormatted}:00:00`,
      });
    }
    
    if (bookedHours && Array.isArray(bookedHours) && bookedHours.length > 0) {
      const newAvailableHours = [];

      hours.forEach((availableHour) => {
        const isBusyStartTime = bookedHours.find((busyHour) =>
          busyHour.startTime.startsWith(availableHour.startDate)
        );
        const isBusyEndTime = bookedHours.find((busyHour) =>
          busyHour.endTime.startsWith(availableHour.endDate)
        );

        if (!isBusyStartTime && !isBusyEndTime) {
          newAvailableHours.push(availableHour);
        }
      });
      return newAvailableHours;
    }

    if (bookedHours && Array.isArray(bookedHours) && bookedHours.length > 0) {
      const newAvailableHours = [];

      hours.forEach((availableHour) => {
        const isBusyStartTime = bookedHours.find((busyHour) =>
          busyHour.startTime.startsWith(availableHour.startDate)
        );
        const isBusyEndTime = bookedHours.find((busyHour) =>
          busyHour.endTime.startsWith(availableHour.endDate)
        );

        if (!isBusyStartTime && !isBusyEndTime) {
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

    const startDate = new Date(
      selectedDates[0].$d.getTime() -
        selectedDates[0].$d.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    const endDate = new Date(
      selectedDates[selectedDates.length - 1].$d.getTime() -
        selectedDates[selectedDates.length - 1].$d.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    const dataRange = { startDate, endDate };

    await fetchAvailableHours(dataRange);
  };

  const handleCloseSuccess = () => {
    setConfirmationPopupOpen(false);
    userRole === "admin"
      ? navigate("/gestio-reserves")
      : navigate("/panell-usuari");
  };

  const handleOpenConfirm = () => {
    setConfirmPopupOpen(true);
  };

  const handleCloseConfirm = () => {
    setConfirmPopupOpen(false);
    navigate("/edicio-reserva-sala-reunions");
  };

  const handleAcceptConfirm = async () => {
    if (
      !selectedDates.length ||
      !selectedHour.startTime ||
      !selectedHour.endTime
    ) {
      setError("Selecciona dates i una hora abans de continuar.");
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
          id: "1",
        },
      };

      const response = await apiRequest(
        API_UPDATE_RESERVATION(reservationId),
        "PUT",
        dataToSend,
        headers
      );

      const newAvailableHours = availableHours.filter(
        (hour) =>
          hour.startDate != selectedHour.startTime &&
          hour.endDate != selectedHour.endTime
      );
      setAvailableHours(newAvailableHours);
      handleCloseConfirm();
      setConfirmationPopupOpen(true);
    } catch (error) {
      console.error("Error al editar la reserva:", error.message);
      setConfirmPopupOpen(false);
      setErrorModal({
        isOpen: true,
        message: `No s'ha pogut editar la reserva.`,
      });
    }
  };

  const handleCancelUpdate = () => {
    userRole === "admin"
    ? navigate("/gestio-reserves")
    : navigate("/panell-usuari");
  }

  return (
    <>
      <DivReserve>
      <TitleMobile title="Edició de reserva sala de reunions" />

        <Calendar
          onChange={setSelectedDates}
          value={selectedDates}
          setError={setError}
          selectionMode="single"
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Cercar</ButtonFind>
          <CancelButton 
            onClick = {handleCancelUpdate}
            type = "button">
              Cancel·lar
          </CancelButton>
        </ContainerButtons>

        <Hr2 />

        {availableHours.length > 0 ? (
          <>
            <OfficesInput
              availableHours={availableHours}
              selectedHour={selectedHour}
              onChange={handleHourChange}
            />
            <Hr2 />

            <ContainerButtons>
              <ConfirmButton onClick={handleOpenConfirm}>
                Acceptar
              </ConfirmButton>
            </ContainerButtons>
          </>
        ) : (
          <Subtitle>Tria una data vàlid</Subtitle>
        )}
      </DivReserve>

      <Space></Space>

      <PopUpConfirmReserve
        open={confirmPopupOpen}
        onCancel={handleCloseConfirm}
        onConfirm={handleAcceptConfirm}
        space="Sala de reunions"
        reservation={{
          startDate: selectedDates[0],
          endDate: selectedDates[0],
          startTime: selectedHour.startTime,
          endTime: selectedHour.endTime,
        }}
        button={{
          confirmText: "Confirmar",
          cancelText: "Cancel·lar",
        }}
      />
      {confirmationPopupOpen && (
        <ConfirmationPopup
          open={confirmationPopupOpen}
          onClose={handleCloseSuccess}
          subtitleConfirm={"La reserva s'ha actualitzat amb èxit."}
        />
      )}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        message={errorModal.message}
      />
    </>
  );
};

export default ReserveMeetingRoom;
