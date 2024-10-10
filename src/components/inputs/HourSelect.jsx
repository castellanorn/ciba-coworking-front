import { useState, useContext } from "react";

import { AuthContext } from "../../auth/AuthProvider";

import Calendar from "../../components/calendar/Calendar";

import ContainerButtons from "../../components/container/ButtonsContainer";

import TitleMobile from "../../components/title/Title";

import { ButtonFind } from "../../components/buttons/ButtonStyled";

import ConfirmButton from "../../components/buttons/ConfirmButton";

import PopUpSuccess from "../../components/popup/reserve/PopUpSuccess";

import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";

import HourSelect from "../../components/inputs/HourSelect";

import { Space } from "../../pages/office/OfficeBookingStyled";

import PlacesButton from "../../components/buttons/PlacesButton";

import { Hr2, TitleSelectDate } from "../../components/calendar/CalendarStyled";

import { API_CREATE_RESERVATION_OFFICES } from "../../config/apiEndpoints";

import axios from "axios";

import { RoleInput } from "../../components/inputs/RoleInput";

import { DivReserve } from "./InputStyled";

const ReserveOffice = () => {
  const { authToken } = useContext(AuthContext);

  const [successPopupOpen, setSuccessPopupOpen] = useState(false);

  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);

  const [selectedOffice, setSelectedOffice] = useState("");

  const [selectedHour, setSelectedHour] = useState("");

  const [selectedDates, setSelectedDates] = useState([]);

  const [reservationData, setReservationData] = useState([]); // Aquí almacenaremos los datos de la reserva

  const [error, setError] = useState("");

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
    setSelectedOffice(event.target.value);
  };

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const fetchAvailableOffices = async (date, startTime, endTime) => {
    const url = `${API_CREATE_RESERVATION_OFFICES}?date=${date}&startTime=${startTime}&endTime=${endTime}`;

    try {
      const response = await axios.get(url, { headers });

      setReservationData(response.data); // Suponiendo que la respuesta es un array de oficinas disponibles
    } catch (error) {
      console.error("Error fetching available offices:", error);

      setError("No s'han pogut obtenir les oficines disponibles.");
    }
  };

  const handleFindResults = async () => {
    if (selectedDates.length === 0) {
      setError("Si us plau, selecciona un o més dies.");

      return;
    }

    if (!selectedHour) {
      setError("Si us plau, selecciona una hora.");

      return;
    }

    setError("");

    const startDate = selectedDates[0].toISOString().split("T")[0];

    const endDate = selectedDates[selectedDates.length - 1]
      .toISOString()
      .split("T")[0];

    const [startTime, endTime] = selectedHour.split("-");

    console.log("Datos enviados al backend:");

    console.log({
      dates: selectedDates.map((date) => date.format("DD-MM-YYYY")),

      selectedOffice,

      selectedHour,
    });

    await fetchAvailableOffices(startDate, startTime, endTime);

    setTimeout(() => {
      setSelectedDates([]);

      setSelectedOffice("");

      setSelectedHour(""); // Limpiar la selección de hora después de la búsqueda
    }, 2000);
  };

  return (
    <>
      <DivReserve>
        <TitleMobile title="Fer reserva d' oficina" />

        <ContainerButtons>
          <PlacesButton
            text="taules individuals"
            focus={false}
            link="/reserva-taula"
          />

          <PlacesButton text="oficines privades" focus={true} />

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

        <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Buscar</ButtonFind>
        </ContainerButtons>

        <Hr2 />

        <HourSelect selectedHour={selectedHour} onChange={handleHourChange} />

        <Hr2 />

        <TitleSelectDate>Selecciona l'oficina</TitleSelectDate>

        <RoleInput
          label="Oficina 1"
          name="office 1"
          selectedOption={selectedOffice}
          onChange={handleRadioChange}
          userRole={"USER"}
        />

        <RoleInput
          label="Oficina 2"
          name="office 2"
          selectedOption={selectedOffice}
          onChange={handleRadioChange}
          userRole={"USER"}
        />

        <ContainerButtons>
          <ConfirmButton onClick={handleOpenConfirm}>Acceptar</ConfirmButton>
        </ContainerButtons>

        <PopUpConfirmReserve
          open={confirmPopupOpen}
          onCancel={handleCloseConfirm}
          pageType="office"
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

export default ReserveOffice;
