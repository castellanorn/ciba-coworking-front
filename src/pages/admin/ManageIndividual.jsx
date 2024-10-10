import { useState, useCallback,useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../auth/AuthProvider";
import { Line } from '../../components/title/TitleStyled'
import ContainerButtons from '../../components/container/ButtonsContainer'
import PlacesButton from "../../components/buttons/PlacesButton"
import TitleMobile from '../../components/title/Title'
import Table from "../../components/table/Table"
import TableMobile from "../../components/table/TableMobile"
import { columnsEditReservations, columnMappingEditReservations } from '../../config/tableData';
import { Subtitle, TableSection } from '../user/UserPagesStyled'
import Calendar from "../../components/calendar/Calendar";
import { ButtonFind } from "../../components/buttons/ButtonStyled";
import {apiRequest} from "../../services/apiRequest"
import {API_DELETE_RESERVATION, API_GET_RESERVATIONS_BY_DATE} from "../../config/apiEndpoints"
import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import { formatDate } from "../../config/formatDate";
import ErrorModal from "../../components/popup/modals/ErrorModal";
import { formatTime } from "../../config/formatTime";
import ConfirmationPopup from "../../components/popup/confirmationPopup/ConfirmationPopup";
import Paragraph from "../../components/textComponents/Paragraph";
const ManageIndividual = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [focus, setFocus] = useState("tables");
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  const [selectedDates, setSelectedDates] = useState([]);
  const [availableReservations, setAvailableReservations] = useState([]);
  const [error, setError] = useState("");

  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    selectedReservation: null,
  });
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };
  //Search reservations
  const handleFindResults = async () => {
    if (selectedDates.length !== 2) {
      setError("Si us plau, selecciona un rang de dates.");
      return;
    }  
    const startDate = selectedDates[0].format("YYYY-MM-DD");
    const endDate = selectedDates[1].format("YYYY-MM-DD"); 
    try{
      setError("");
      const body = {
        startDate: startDate,
        endDate: endDate,
      };
      const reservations = await apiRequest(API_GET_RESERVATIONS_BY_DATE, "POST", body, headers);
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
    }catch (error) {
      console.error("API error:", error.message)
    }
  };
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
        await apiRequest(API_DELETE_RESERVATION(deleteModalState.selectedReservation.id), "DELETE",null,headers);
        handleFindResults(); 
        setConfirmationPopupOpen({
          isOpen: true,
        });
      }
    } catch (error) {
      setErrorModal({
        isOpen: true,
        message: `Error a la eliminació de reserva: ${error}`,
      }); 
      console.error("Error eliminando la reserva:", error);
    } finally {
      setDeleteModalState({
        isOpen: false,
        selectedUser: null,
      });
    }
  }, [deleteModalState.selectedReservation, handleFindResults]);

  const handleCancelDelete = useCallback(() => {
    setDeleteModalState({
      isOpen: false,
      selectedReservation: null,
    });
  }, []);
  const handleManageClick =(target)=>{
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
      <TitleMobile title="Edició de reserves" />
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
      <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Buscar</ButtonFind>
        </ContainerButtons>
      <Line />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {availableReservations.length === 0 ? (
          <Paragraph text="No hi ha reserves." />
        ) : (
        <TableSection>
          <Table 
            columns={columnsEditReservations} 
            data={availableReservations} 
            columnMapping={columnMappingEditReservations} 
            actions={['delete']} onDelete={handleDeleteClick}/>
          <TableMobile 
            data={availableReservations} 
            type='adminReserves' 
            actions={['delete']} onDelete={handleDeleteClick}/>
        </TableSection>
      )}
      {deleteModalState.isOpen && (
        <PopUpConfirmReserve
        open={deleteModalState.isOpen}
        reservation={deleteModalState.selectedReservation}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        actionType="delete"
        button={{ deleteText: "Eliminar", cancelText: "Cancel·lar" }}
      />
      )}
      
      {confirmationPopupOpen && (
        <ConfirmationPopup
          open={confirmationPopupOpen}
          onClose={() => setConfirmationPopupOpen(false)}
          subtitleConfirm="La reserva s'ha eliminat amb èxit"
        />
      )}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        message={errorModal.message}
      />
    </div>
  )
}

export default ManageIndividual
