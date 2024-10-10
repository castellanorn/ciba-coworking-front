import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedHour, setSelectedHour] = useState("")
  const [selectedDates, setSelectedDates] = useState([]);
  const [error, setError] = useState("");
  const [focus, setFocus] = useState("offices");
  const navigate = useNavigate();
  
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
  const handleFindResults = () => {
    if (selectedDates.length === 0) {
      setError("Si us plau, selecciona un o més dies.");
      return;
    }

    setError("");

    console.log("Datos enviados al backend:");
    console.log({
      dates: selectedDates.map(date => date.format("YYYY-MM-DD")),
    });

    setTimeout(() => {
      setSelectedDates([]);
      setSelectedOffice(""); 
    }, 2000);
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

        <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Buscar</ButtonFind>
        </ContainerButtons>
        <Hr2 />
        <HourSelect 
          selectedHour={selectedHour}
          onChange={handleHourChange}
        />
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