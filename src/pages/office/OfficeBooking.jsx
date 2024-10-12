import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../../services/apiRequest";
import {
  API_CREATE_RESERVATIONS,
  API_GET_RESERVATIONS_BY_ID,
} from "../../config/apiEndpoints";
import { AuthContext } from "../../auth/AuthProvider";

import Calendar from "../../components/calendar/Calendar";
import ContainerButtons from "../../components/container/ButtonsContainer";
import TitleMobile from "../../components/title/Title";
import { ButtonFind } from "../../components/buttons/ButtonStyled";
import ConfirmButton from "../../components/buttons/ConfirmButton";
import { Space } from "../../pages/office/OfficeBookingStyled";
import PlacesButton from "../../components/buttons/PlacesButton";
import { DivReserve } from "./OfficeBookingStyled";
import { Hr2, TitleSelectDate } from "../../components/calendar/CalendarStyled";
import { RoleInput } from "../../components/inputs/RoleInput";
import HourSelect from "../../components/inputs/HourSelect";
import OfficesInput from "../../components/inputs/OfficesInput";
import { Subtitle } from "../user/UserPagesStyled";

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
  const { authToken, userRole, user } = useContext(AuthContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  const dataRange = {};

  const formatHour24hFormat = (hour) => {
    if (hour < 10) return "0" + hour;
    return hour + "";
  };

  const generateDefaultHours = (bookedHours = []) => {
    const hours = [];
    let startHour = 8;
    let endHour = 20;

    for (let i = startHour; i < endHour; i++) {
      hours.push({
        startDate: `${formatHour24hFormat(i)}:00`,
        endDate: `${formatHour24hFormat(i + 1)}:00`,
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

      if (!response || response.length === 0) {
        console.log(
          "No se encontraron horas ocupadas. Mostrando horas por defecto."
        );
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
        console.log("availableHours: ", availableHours);
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
    navigate("/reserva-oficina");
  };

  const handleAcceptConfirm = async () => {
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

      console.log(dataToSend);
      const response = await apiRequest(
        API_CREATE_RESERVATIONS,
        "POST",
        dataToSend,
        headers
      );

      const newAvailableHours = availableHours.filter(
        (hour) =>
          hour.startDate != selectedHour.startTime &&
          hour.endDate != selectedHour.endTime
      );
      setAvailableHours(newAvailableHours);
      console.log("newAvailableHours", newAvailableHours);
      handleCloseConfirm();
      setConfirmationPopupOpen(true);
    } catch (error) {
      console.error("Error al realizar la reserva:", error.message);
      setConfirmPopupOpen(false);
      setErrorModal({
        isOpen: true,
        message: `No s'ha pogut crear la reserva: ${error.message.slice(13)}`,
      });
    }
  };

  const handleRadioChange = (event) => {
    const office = event.target.value;
    setSelectedOffice(office);
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
        <TitleMobile title="Fer reserva d' oficina" />
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
          <Subtitle>Tria una data i una oficina</Subtitle>
        )}
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
          subtitleConfirm={"Reserva feta amb èxit."}
        />
      )}
    </>
  );
};

export default ReserveOffice;
