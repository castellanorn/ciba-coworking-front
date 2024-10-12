import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { apiRequest } from "../../services/apiRequest";
import {
API_UPDATE_RESERVATION,  
  API_GET_RESERVATIONS_BY_ID
} from "../../config/apiEndpoints";
import { AuthContext } from "../../auth/AuthProvider";

import Calendar from "../../components/calendar/Calendar";
import ContainerButtons from "../../components/container/ButtonsContainer";
import TitleMobile from "../../components/title/Title";
import { ButtonFind } from "../../components/buttons/ButtonStyled";
import ConfirmButton from "../../components/buttons/ConfirmButton";
import { Space } from "../office/OfficeBookingStyled";
import PlacesButton from "../../components/buttons/PlacesButton";
import { DivReserve } from "../office/OfficeBookingStyled";
import { Hr2, TitleSelectDate } from "../../components/calendar/CalendarStyled";
import { RoleInput } from "../../components/inputs/RoleInput";
import HourSelect from "../../components/inputs/HourSelect";
import CancelButton from "../../components/buttons/CancelButton";

import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import ConfirmationPopup from "../../components/popup/confirmationPopup/ConfirmationPopup";
import ErrorModal from "../../components/popup/modals/ErrorModal";

const ReserveOffice = () => {
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [error, setError] = useState("");
  const [focus, setFocus] = useState("offices");

  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); 
  const reservationId = location.state?.reservationId;
  const { authToken, userRole, user } = useContext(AuthContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  const dataRange = {};

  const generateDefaultHours = () => {
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

  const fetchAvailableHours = async (spaceId, dataRange) => {
    try {
      const response = await apiRequest(
        API_GET_RESERVATIONS_BY_ID(spaceId),
        "POST",
        dataRange,
        headers
      );

      if (
        !response ||
        response.status === 404 ||
        !response.availableHours ||
        response.availableHours.length === 0
      ) {
        console.log(
          "No se encontraron horas ocupadas. Mostrando horas por defecto."
        );
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
      console.log(error.message);
      const defaultHours = generateDefaultHours();
      setAvailableHours(defaultHours);
    }
  };

  const handleFindResults = async () => {
    if (selectedDates.length === 0) {
      setError("Si us plau, selecciona un o més dies.");
      return;
    }

    if (!selectedOffice) {
      setError("Si us plau, selecciona una oficina.");
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

    const dataRange = {
      startDate: startDate,
      endDate: endDate,
    };

    const spaceId = selectedOffice === "office1" ? 2 : 3;

    await fetchAvailableHours(spaceId, dataRange);
  };

  const handleCloseSuccess = () => {
    setConfirmationPopupOpen(false);
    userRole === "admin"
      ? navigate("/gestio-reserves")
      : navigate("/panell-usuari");
  };


  const handleOpenConfirm = () => {
    if (
      !selectedDates.length ||
      !selectedOffice ||
      !selectedHour.startTime ||
      !selectedHour.endTime
    ) {
      setError(
        "Selecciona la data, una oficina y una hora abans de continuar."
      );
      return;
    }
    setError("");
    setConfirmPopupOpen(true);
  };

  
  const handleCloseConfirm = () => {
    setConfirmPopupOpen(false);
    navigate("/edicio-reserva-oficina");
  };


  const handleAcceptConfirm = async () => {
  
    try {
      const formattedStartDate = selectedDates[0].format("YYYY-MM-DD");
      const formattedEndDate = selectedDates[0].format("YYYY-MM-DD");

      // Estructuramos el objeto que debe enviarse al backend
      const dataToSend = {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        startTime: selectedHour.startTime,
        endTime: selectedHour.endTime,
        userDTO: {
          id: user.id,
        },
        spaceDTO: {
          id: selectedOffice === "office1" ? 2 : 3,
        },
      };

      console.log(dataToSend)
      const response = await apiRequest(
        API_UPDATE_RESERVATION(reservationId),
        "PUT",
        dataToSend,
        headers
      );
      console.log(response);

      setConfirmPopupOpen(false);
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

  const handleRadioChange = (event) => {
    const office = event.target.value;
    setSelectedOffice(office);
  };

  const handleCancelUpdate = () => {
    console.log("click", userRole)
    userRole === "admin"
    ? navigate("/gestio-reserves")
    : navigate("/panell-usuari");
  }
  
  return (
    <>
      <DivReserve>
      <TitleMobile title="Edició de reserva d'oficines" />
        
        <Calendar
          onChange={setSelectedDates}
          value={selectedDates}
          setError={setError}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}

        <TitleSelectDate>Tria l'oficina</TitleSelectDate>
        <RoleInput
          label="Oficina 1"
          name="office1"
          selectedOption={selectedOffice}
          onChange={handleRadioChange}
          userRole={"USER"}
        />
        <RoleInput
          label="Oficina 2"
          name="office2"
          selectedOption={selectedOffice}
          onChange={handleRadioChange}
          userRole={"USER"}
        />

        <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Cercar</ButtonFind>
          <CancelButton 
            onClick = {handleCancelUpdate}
            type = "button">
              Cancel·lar
          </CancelButton>
        </ContainerButtons>

        <Hr2 />

        {availableHours.length > 0 && (
          <HourSelect
            availableHours={availableHours}
            selectedHour={selectedHour}
            onChange={handleHourChange}
          />
        )}
        <Hr2 />
        <ContainerButtons>
          <ConfirmButton onClick={handleOpenConfirm}>Acceptar</ConfirmButton>
        </ContainerButtons>

      </DivReserve>
      <Space />

      <PopUpConfirmReserve
        open={confirmPopupOpen}
        onConfirm={handleAcceptConfirm}
        onCancel={handleCloseConfirm}
        space={selectedOffice}
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

      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        message={errorModal.message}
      />
      {confirmationPopupOpen && (
        <ConfirmationPopup
          open={confirmationPopupOpen}
          onClose={handleCloseSuccess}
          subtitleConfirm={"La reserva s'ha actualitzat amb èxit."}
        />
      )}
    </>
  );
};

export default ReserveOffice;
