
import { useState, useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../auth/AuthProvider"; // Importar AuthContext para usar el token de autenticación
import { apiRequest } from "../../services/apiRequest";
import { API_DELETE_RESERVATION, API_GET_RESERVATIONS_BY_ID } from "../../config/apiEndpoints";
import { formatDate } from "../../config/formatDate";
import TitleMobile from '../../components/title/Title';
import ContainerButtons from '../../components/container/ButtonsContainer';
import PlacesButton from "../../components/buttons/PlacesButton";
import Table from "../../components/table/Table";
import TableMobile from "../../components/table/TableMobile";
import { Line } from '../../components/title/TitleStyled'
import { columnsEditReservations, columnMappingEditReservations } from '../../config/tableData';
import { Subtitle, TableSection } from '../user/UserPagesStyled'
import Calendar from "../../components/calendar/Calendar";
import { ButtonFind } from "../../components/buttons/ButtonStyled";
import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import { RoleInput } from "../../components/inputs/RoleInput";
import { TitleSelectDate } from "../../components/calendar/CalendarStyled";
import Paragraph from '../../components/textComponents/Paragraph';
import styled from "styled-components";

import { splitReservations } from '../../config/reservationHelpers';
import { formatTime } from '../../config/formatTime';
import ErrorModal from "../../components/popup/modals/ErrorModal";
import ConfirmationPopup from "../../components/popup/confirmationPopup/ConfirmationPopup";

// Componente ManageOffice
const ManageOffice = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [focus, setFocus] = useState("offices");
  const [selectedDates, setSelectedDates] = useState([]);
  const [availableReservations, setAvailableReservations] = useState([]);
  const [error, setError] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    selectedReservation: null,
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

 
  
  const handleRadioChange = (event) => {
    const officeValue = event.target.value; 
    setSelectedOffice(officeValue); 
    setAvailableReservations([]);
  };

  // Buscar reservas
  const handleFindResults = async () => {
    if (selectedDates.length !== 2) {
      setError("Por favor, selecciona un rango de fechas.");
      return;
    }

    const startDate = selectedDates[0].format("YYYY-MM-DD");
    const endDate = selectedDates[1].format("YYYY-MM-DD");

    try {
      setError("");
      const body = {
        startDate: startDate,
        endDate: endDate,
      };
      console.log("Cuerpo de la solicitud:", body);
      const officeId = selectedOffice;
      if (!officeId) {
        setError("Selecciona una oficina antes de buscar.");
        return;
      }
      console.log(officeId)
      const reservations = await apiRequest(API_GET_RESERVATIONS_BY_ID(officeId), "POST", body,headers);
      if (reservations.length === 0) {
        setErrorModal({
          isOpen: true,
          message: "No hi ha reserves de taules individuals amb aquest rang de dates.",
        });
        return;  
      }
      const formattedReservations = reservations.map(reservation => ({
        ...reservation,
        startDate: formatDate(reservation.startDate),  
        endDate: formatDate(reservation.endDate),
        startTime: formatTime(reservation.startTime),
        endTime: formatTime(reservation.endTime),
      }));

      setAvailableReservations(formattedReservations);

      if (formattedReservations.length === 0) {
        setError("Per aquestes dates no hi ha reserves");
      }
    } catch (error) {
      setError(error.message);
    }
    console.log(availableReservations)
  }


  //Delete modal y function
  const handleDeleteClick = useCallback((reservation) => {
    setDeleteModalState({
      isOpen: true,
      selectedReservation: reservation,
    });
  }, []);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const handleConfirmDelete = useCallback(async () => {
    try {
      if (deleteModalState.selectedReservation) {
        const reservationId = deleteModalState.selectedReservation.id;
        await apiRequest(API_DELETE_RESERVATION(reservationId), "DELETE", null, headers);

        setAvailableReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) => reservation.id !== deleteModalState.selectedReservation.id
          )
        );
       
        // handleFindResults();
          setConfirmationPopupOpen({
            isOpen: true,
          });
      }
    } catch (error) {
      setErrorModal({
        isOpen: true,
        message: `Error a la eliminació de reserva: ${error}`,
      });
      console.log(error)
    } finally {
      setDeleteModalState({
        isOpen: false,
        selectedReservation: null,
      });
    }
  }, [deleteModalState.selectedReservation, handleFindResults,headers]);

  const handleCancelDelete = useCallback(() => {
    setDeleteModalState({
      isOpen: false,
      selectedReservation: null,
    });
  }, []);
  const handleManageClick =(target)=> {
    switch(target){
      case "tables":
        setFocus("tables");
        navigate("/gestio-de-taules");
        break;
      case "offices":
        setFocus("offices");
        navigate("/gestio-oficina"); 
        break;
      case "meetings":
        setFocus("meetings");
        navigate("/gestio-reunio"); 
        break;
    }
  }
  return (
    <div>
      <TitleMobile title="Edición de reservas" />
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
        <Line />
        <Calendar
        onChange={setSelectedDates}
        value={selectedDates}
        setError={setError}
      />
      <TitleSelectDate>Selecciona l'oficina</TitleSelectDate>
        <RoleInput 
        label='Oficina 1'
        name='2' // ID para Oficina 1
        selectedOption={selectedOffice}
        onChange={handleRadioChange}
        userRole={"USER"}
      />
      <RoleInput 
        label='Oficina 2'
        name='3' // ID para Oficina 2
        selectedOption={selectedOffice}
        onChange={handleRadioChange}
        userRole={"USER"}
      />

      <ContainerButtons>
        <ButtonFind onClick={handleFindResults}>Buscar</ButtonFind>
      </ContainerButtons>

      {error && <Paragraph text={error} color="red" />}      
      {availableReservations.length > 0 && (
        <TableSection>
          <Table 
            columns={columnsEditReservations} 
            data={availableReservations} 
            columnMapping={columnMappingEditReservations} 
            actions={['delete']} 
            onDelete={handleDeleteClick}
          />
          <TableMobile 
            data={availableReservations} 
            type='adminReserves' 
            actions={['delete']} 
            onDelete={handleDeleteClick}
          />
        </TableSection>
      )}
      {deleteModalState.isOpen && (
        <PopUpConfirmReserve
          open={deleteModalState.isOpen}
          reservation={deleteModalState.selectedReservation}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          actionType="delete"
          button={{ deleteText: "Eliminar", cancelText: "Cancelar" }}
        />
      )}
      {confirmationPopupOpen && (
        <ConfirmationPopup
          open={confirmationPopupOpen}
          onClose={() => setConfirmationPopupOpen(false)}
          subtitleConfirm="La reserva ha fet eliminada amb èxit."
        />
      )}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        message={errorModal.message}
      />
    </div>
  );
}

export default ManageOffice;
