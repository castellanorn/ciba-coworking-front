import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../auth/AuthProvider";
import { apiRequest } from "../../services/apiRequest";
import {
  API_GET_TABLES_BY_DATE,
  API_CREATE_RESERVATION_TABLES_BY_USER,
  API_CREATE_RESERVATION_LONG_TERM_BY_ADMIN,
} from "../../config/apiEndpoints";

import Calendar from "../../components/calendar/Calendar";
import ContainerButtons from "../../components/container/ButtonsContainer";
import TitleMobile from "../../components/title/Title";
import { ButtonFind } from "../../components/buttons/ButtonStyled";
import ConfirmButton from "../../components/buttons/ConfirmButton";
import PopUpSuccess from "../../components/popup/reserve/PopUpSuccess";
import { SeatSpace } from "../../components/map/SeatSpace";
import { Space } from "../../pages/office/OfficeBookingStyled";
import PlacesButton from "../../components/buttons/PlacesButton";
import { DivReserve } from "./TableBookingStyled";
import { Hr2, TitleSelectDate } from "../../components/calendar/CalendarStyled";
import { RoleInput } from "../../components/inputs/RoleInput";
import Paragraph from "../../components/textComponents/Paragraph";
import ErrorModal from "../../components/popup/modals/ErrorModal";
import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import ConfirmationPopup from "../../components/popup/confirmationPopup/ConfirmationPopup";


const ReserveTable = () => {
  const { authToken, userRole, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedTable, setSelectedTable] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [availableTables, setAvailableTables] = useState([]);
  const [reservationData, setReservationData] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  const handleTableSelection = (table) => {
    setSelectedTable(table);
  };

  const handleRadioChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  const fetchAvailableTables = async (dateRange) => {
    setLoading(true);
    try {
      const response = await apiRequest(
        API_GET_TABLES_BY_DATE,
        "POST",
        dateRange,
        headers
      );
      const availableTables = response.map((table) => ({
        id: table.id,
        title: table.name,
        available: table.spaceStatus === "actiu" ? "color" : "not_salable",
      }));
      setAvailableTables(availableTables);
    } catch (error) {
      console.error("Error fetching tables: ", error.message);
      setError("No s'han pogut obtenir les taules disponibles.");
    } finally {
      setLoading(false);
    }
  };

  const handleFindResults = async () => {
    if (selectedDates.length === 0) {
      setError("Si us plau, selecciona un o més dies.");
      return;
    }

    if (!selectedTimeSlot && userRole === "user") {
      setError("Si us plau, selecciona una franja horària.");
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

    let startTime, endTime;

    if (selectedTimeSlot === "Matí") {
      startTime = "08:00:00";
      endTime = "13:59:59";
    } else if (selectedTimeSlot === "Tarda") {
      startTime = "14:00:00";
      endTime = "20:00:00";
    }

    const newDateRange =
      userRole === "user"
        ? {
            startDate: startDate,
            endDate: endDate,
            startTime: startTime,
            endTime: endTime,
          }
        : {
            startDate: startDate,
            endDate: endDate,
            startTime: "08:00:00",
            endTime: "20:00:00",
          };
    setDateRange(newDateRange);
    await fetchAvailableTables(newDateRange);
  };

  const createTableReserve = async () => {
    if (
      !selectedTable ||
      !dateRange.startDate ||
      !dateRange.endDate ||
      !dateRange.startTime ||
      !dateRange.endTime
    ) {
      setError(
        "Si us plau, selecciona una taula i assegura't que tots els camps de data/hora estan omplerts."
      );
      return;
    }

    const reservationData = {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      startTime: dateRange.startTime,
      endTime: dateRange.endTime,
      userDTO: {
        id: user.id,
      },
      spaceDTO: {
        id: selectedTable.id,
      },
    };
 
    const urlCreateReservation =
      userRole === "admin"
        ? API_CREATE_RESERVATION_LONG_TERM_BY_ADMIN
        : API_GET_TABLES_BY_DATE;

    try {
      const response = await apiRequest(
        urlCreateReservation,
        "POST",
        reservationData,
        headers
      );

      setReservationData(response);
      setConfirmationPopupOpen(true);
    } catch (error) {
      setErrorModal({
        isOpen: true,
        message: "No s'ha pogut crear la reserva.",
      });
    }
  };

  const handleAcceptConfirm = async () => {
    await createTableReserve();
    handleCloseConfirm();
    setConfirmationPopupOpen(true);
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

  useEffect(() => {
    if (confirmPopupOpen) {
    }
  }, [confirmPopupOpen, dateRange, selectedTable]);

  const handleCloseConfirm = () => {
    setConfirmPopupOpen(false);
    navigate("/reserva-taula");
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

        {userRole === "admin" ? (
          <></>
        ) : (
          <>
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
          </>
        )}

        <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Buscar</ButtonFind>
        </ContainerButtons>
        <Hr2 />

        {availableTables.length === 0 ? (<Paragraph text = "Selecciona las fechas, la franja y pulsa Buscar"/>) 
      : (<>
          <SeatSpace availableTables={availableTables} onSeatSelect={handleTableSelection} />
          <ContainerButtons>
            <ConfirmButton onClick={handleOpenConfirm}>Acceptar</ConfirmButton>
          </ContainerButtons>
          
        </>
      )}

      </DivReserve>
      <Space />

      <PopUpConfirmReserve
        open={confirmPopupOpen}
        onConfirm={handleAcceptConfirm}
        onCancel={handleCloseConfirm}
        table={selectedTable}
        pageType="table"
        button={{
          confirmText: "Confirmar",
          cancelText: "Cancelar",
        }}
        reservation={dateRange}
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

export default ReserveTable;
