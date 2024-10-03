import { useState } from "react";
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
import { API_GET_RESERVATION } from "../../config/url";

const ReserveTable = () => {
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [reservationData, setReservationData] = useState(null); // Estado para almacenar los datos de la reserva

  const [error, setError] = useState("");

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
  const fetchReservationData = async () => {
    try {
      const response = await fetch(API_GET_RESERVATION);
      if (!response.ok) {
        throw new Error("Error al obtener los datos de la reserva");
      }
      const data = await response.json();
      setReservationData(data);
      console.log("Datos obtenidos del backend:", data);
    } catch (error) {
      console.error("Error al obtener los datos de la reserva:", error);
      setError("No se pudieron obtener los datos de la reserva.");
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
    await fetchReservationData();
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
          <PlacesButton
            text="oficines privades"
            link="/reserva-oficina"
            focus={false}
          />
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

        <Map onTableSelect={handleTableSelection} />

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
