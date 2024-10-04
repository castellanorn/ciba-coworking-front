import { useState } from "react";
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
import { DivReserve } from "./OfficeBookingStyled";
import { Hr2, TitleSelectDate } from "../../components/calendar/CalendarStyled";

import { RoleInput } from "../../components/inputs/RoleInput";

const ReserveOffice = () => {
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedOffice, setselectedOffice] = useState("");  
  const [selectedDates, setSelectedDates] = useState([]);
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
  const handleOfficeChange = (event) => {
    setSelectedOffice(event.target.value);

  };
  const handleFindResults = () => {
    if (selectedDates.length === 0) {
      setError("Si us plau, selecciona un o més dies.");
      return;
    }
    setError("");

    console.log("Datos enviados al backend:");
    console.log({
      dates: selectedDates.map((date) => date.format("YYYY-MM-DD")),
      Office: selectedOffice,
    });

    setTimeout(() => {
      setSelectedDates[''];
      setselectedOffice("");
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
        <HourSelect />
        <Hr2 />
        <TitleSelectDate>Selecciona l'oficina</TitleSelectDate>
        <RoleInput
          label="Oficina 1"
          value="office 1"
          selectedOption={selectedOffice}
          onChange={handleOfficeChange}
          userRole="USER"
        />
        <RoleInput
          label="Oficina 2"
          value="office 2"
          selectedOption={selectedOffice}
          onChange={handleOfficeChange}
          userRole="USER"
        />

        <ContainerButtons>
          <ConfirmButton onClick={handleOpenConfirm}>Acceptar</ConfirmButton>
        </ContainerButtons>

        <PopUpConfirmReserve
          open={confirmPopupOpen}
          onCancel={handleCloseConfirm}
          pageType="office" 
          onConfirm={handleAcceptConfirm}
          slot='slot'
          month="month"
          day="day"
          button={{
            confirmText: "Confirmar",
            cancelText: "Cancelar"
          }}
        />
        <PopUpSuccess open={successPopupOpen} onClose={handleCloseSuccess} />
      </DivReserve>
      <Space/>
    </>
  );
};

export default ReserveOffice;