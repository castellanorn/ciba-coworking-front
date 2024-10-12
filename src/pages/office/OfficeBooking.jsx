import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../../components/calendar/Calendar";
import ContainerButtons from "../../components/container/ButtonsContainer";
import TitleMobile from "../../components/title/Title";
import { ButtonFind } from "../../components/buttons/ButtonStyled";
import ConfirmButton from "../../components/buttons/ConfirmButton";
import PopUpSuccess from "../../components/popup/reserve/PopUpSuccess";
import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import { Space } from "../../pages/office/OfficeBookingStyled";
import PlacesButton from "../../components/buttons/PlacesButton";
import { DivReserve } from "./OfficeBookingStyled";
import { Hr2, TitleSelectDate } from "../../components/calendar/CalendarStyled";
import { RoleInput } from "../../components/inputs/RoleInput";
import { apiRequest } from "../../services/apiRequest";
import {
  API_CREATE_RESERVATIONS,
  API_GET_RESERVATIONS_BY_ID,
  API_GET_SPACE_BY_ID,
} from "../../config/apiEndpoints";
import { AuthContext } from "../../auth/AuthProvider";
import OfficesInput from "../../components/inputs/OfficesInput";
import { Subtitle } from "../user/UserPagesStyled";

const ReserveOffice = () => {
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [error, setError] = useState("");
  const [focus, setFocus] = useState("offices");
  const navigate = useNavigate();
    const { authToken, user } = useContext(AuthContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  const formatHour24hFormat = (hour) => {
    if(hour < 10)
      return "0" + hour;
    return hour + "";
  }

  const generateDefaultHours = (bookedHours=[]) => {
    const hours = [];
    let startHour = 8;
    let endHour = 20; 

    for (let i = startHour; i < endHour; i++) {
      hours.push({
        startDate: `${formatHour24hFormat(i)}:00`,
        endDate: `${formatHour24hFormat(i + 1)}:00`,
      });
    }

    if(bookedHours && Array.isArray(bookedHours) && bookedHours.length > 0){
      const newAvailableHours = [];

      hours.forEach(availableHour => {
        const isBusyStartTime = bookedHours.find(busyHour => busyHour.startTime.startsWith(availableHour.startDate));
        const isBusyEndTime = bookedHours.find(busyHour => busyHour.endTime.startsWith(availableHour.endDate));

        if(!isBusyStartTime && !isBusyEndTime){     
          newAvailableHours.push(availableHour);
        }
      });
      return newAvailableHours;
    }
    return hours;
  };

  const dataRange = {};


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

  const handleOpenSuccess = () => {
    setSuccessPopupOpen(true);
  };

  const handleCloseSuccess = () => {
    setSuccessPopupOpen(false);
    setConfirmationPopupOpen(false); 
    navigate("/panell-usuari")
  };

  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const handleOpenConfirm = () => {

    if (
      !selectedDates.length ||
      !selectedOffice ||
      !selectedHour.startTime ||
      !selectedHour.endTime
    ) {
      setError("Selecciona la data, una oficina y una hora abans de continuar.");
      return;
    }
    setError("");
    setConfirmationPopupOpen(true);
  };

  const handleCloseConfirm = () => {
    setConfirmationPopupOpen(false);
  };

  const handleAcceptConfirm = async () => {

    if (
      !selectedDates.length ||
      !selectedOffice ||
      !selectedHour.startTime ||
      !selectedHour.endTime
    ) {
      setError("Selecciona la data, una oficina y una hora abans de continuar.");
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
          id: selectedOffice === "Oficina 1" ? 1 : 2,
        },
      };

      const response = await apiRequest(
        API_CREATE_RESERVATIONS,
        "POST",
        dataToSend,
        headers
      );

      const newAvailableHours = availableHours
        .filter((hour) => hour.startDate != selectedHour.startTime && hour.endDate !=selectedHour.endTime)
      setAvailableHours(newAvailableHours)
      handleOpenSuccess();
    } catch (error) {
      console.error("Error al realizar la reserva:", error.message);
      setError(error.message);
    }
  };

  const handleRadioChange = (event) => {
    const office = event.target.value;
    setSelectedOffice(office);
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

        <TitleSelectDate>Selecciona l'oficina</TitleSelectDate>
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
              spaceDTO: { spaceType: selectedOffice },
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
      <Space />
    </>
  );
};

export default ReserveOffice;
