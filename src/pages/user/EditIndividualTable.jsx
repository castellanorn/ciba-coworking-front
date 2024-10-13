import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../auth/AuthProvider";
import { apiRequest } from "../../services/apiRequest";
import {
  API_GET_RESERVATIONS_BY_ID,
  API_UPDATE_RESERVATION,
  API_GET_TABLES_BY_DATE,
} from "../../config/apiEndpoints";

import { DivReserve } from "../table/TableBookingStyled";
import TitleMobile from "../../components/title/Title";
import ContainerButtons from "../../components/container/ButtonsContainer";
import Calendar from "../../components/calendar/Calendar";
import { Hr2, TitleSelectDate } from "../../components/calendar/CalendarStyled";
import { RoleInput } from "../../components/inputs/RoleInput";
import { ButtonFind } from "../../components/buttons/ButtonStyled";
import { SeatSpace } from "../../components/map/SeatSpace";
import { Space } from "../office/OfficeBookingStyled";
import Map from "../../components/map/Map";
import ConfirmButton from "../../components/buttons/ConfirmButton";
import Paragraph from "../../components/textComponents/Paragraph";
import CancelButton from "../../components/buttons/CancelButton";
import ErrorModal from "../../components/popup/modals/ErrorModal";
import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import ConfirmationPopup from "../../components/popup/confirmationPopup/ConfirmationPopup";
import PopUpSuccess from "../../components/popup/reserve/PopUpSuccess";

const EditIndividualTable = () => {
  const { authToken, userRole, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); 

  const reservationId = location.state?.reservationId;

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

  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  //CAMBIAR A UPDATE
  const updateTableReserve = async () => {
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


    try {
      const response = await apiRequest(
        API_UPDATE_RESERVATION(reservationId),
        "PUT",
        reservationData,
        headers
      );

      setReservationData(response);

    } catch (error) {
      setErrorModal({
        isOpen: true,
        message: "No s'ha pogut editar la reserva.",
      });
    }
  };

  const handleAcceptConfirm = async () => {
    await updateTableReserve();
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
    navigate("/edicio-reserva-taula");
  };

  const handleCancelUpdate = () => {
    userRole === "admin"
    ? navigate("/gestio-reserves")
    : navigate("/panell-usuari");
  }


  return (
    <>
      <DivReserve>
        <TitleMobile title="Edició de reserva de taula" />

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
            <TitleSelectDate>Tria la franja horària</TitleSelectDate>

            <RoleInput
              label="Matí"
              name="Matí"
              selectedOption={selectedTimeSlot}
              onChange={handleRadioChange}
              userRole={"USER"}
            />
            <RoleInput
              label="Tarda"
              name="Tarda"
              selectedOption={selectedTimeSlot}
              onChange={handleRadioChange}
              userRole={"USER"}
            />
          </>
        )}

        <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Cercar</ButtonFind>
          <CancelButton 
            onClick = {handleCancelUpdate}
            type = "button">
              Cancel·lar
          </CancelButton>
        </ContainerButtons>
        <Hr2 />

        {availableTables.length === 0 ? (
          <Paragraph text="Selecciona les dates, la franja i prem Cercar" />
        ) : (
          <>
            <SeatSpace
              availableTables={availableTables}
              onSeatSelect={handleTableSelection}
            />
            <ContainerButtons>
              <ConfirmButton onClick={handleOpenConfirm}>
                Acceptar
              </ConfirmButton>
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
          cancelText: "Cancel·lar",
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
          subtitleConfirm={"La reserva s'ha actualitzat amb èxit."}
        />
      )}
    </>
  );
};

export default EditIndividualTable;
