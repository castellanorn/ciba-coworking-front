import { useState } from "react";
import { DivReserve, Space } from "../office/OfficeBookingStyled";
import TitleMobile from "../../components/title/Title";
import Calendar from "../../components/calendar/Calendar";
import ContainerButtons from "../../components/container/ButtonsContainer";
import { ButtonFind } from "../../components/buttons/ButtonStyled";
import { Hr2, TitleSelectDate } from "../../components/calendar/CalendarStyled";
import HourSelect from "../../components/inputs/HourSelect";
import { RoleInput } from "../../components/inputs/RoleInput";
import ConfirmButton from "../../components/buttons/ConfirmButton";
import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import PopUpSuccess from "../../components/popup/reserve/PopUpSuccess";


const EditOffice = () => {
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedOffice, setselectedOffice] = useState("");  
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    office1: false,
    office2: false,
  });
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
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCheckboxes((prev) => ({ ...prev, [name]: checked }));
  };
  const handleRadioChange = (event) => {
    setSelectedOffice(event.target.value);
  };
  const handleFindResults = () => {
    if (selectedDates.length === 0) {
      setError("Si us plau, selecciona un o més dies.");
      return;
    }
    const officesRadio = selectedCheckboxes.office1 ? 'Oficina 1' : selectedCheckboxes.office2 ? 'Oficina 2' : '';

    if (!officesRadio) {
      setError("Si us plau, selecciona una oficina.");
      return;
    }
    setError("");

    console.log("Datos enviados al backend:");
    console.log({
      dates: selectedDates.map((date) => date.format("YYYY-MM-DD")),
    });

    setTimeout(() => {
      setSelectedDates[''];
      setselectedOffice("");
    }, 2000);
  };

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

        <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Buscar</ButtonFind>
        </ContainerButtons>
        <Hr2 />
        <HourSelect />
        <Hr2 />
        <TitleSelectDate>Selecciona l'oficina</TitleSelectDate>
        <RoleInput
          label="Matí"
          name="morning"
          selectedOption={selectedOffice}
          onChange={handleRadioChange}
          userRole={"USER"}
        />
        <RoleInput
          label="Tarda"
          name="afternoon"
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

export default EditOffice;