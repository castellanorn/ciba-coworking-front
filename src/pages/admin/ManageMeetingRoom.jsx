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
import {API_DELETE_RESERVATION, API_GET_RESERVATIONS_BY_ID} from "../../config/apiEndpoints"
import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import { formatDate } from "../../config/formatDate";

const ManageMeetingRoom = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [focus, setFocus] = useState("meetings");
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
      console.log(body)
      const reservations = await apiRequest(API_GET_RESERVATIONS_BY_ID(1), "POST", body, headers);
      const formattedReservations = reservations.map(reservation => ({
        ...reservation,
        startDate: formatDate(reservation.startDate),  
        endDate: formatDate(reservation.endDate), 
      }));
  
      setAvailableReservations(formattedReservations);
    }catch (error) {
      setError(error.message); 
    }
    console.log(availableReservations)
  };
  //Delete modal y function
  const handleDeleteClick = useCallback((reservation) => {
    setDeleteModalState({
      isOpen: true,
      selectedReservation: reservation, 
    });
  }, []);
  const handleConfirmDelete = useCallback(async () => {
    try {
      if (deleteModalState.selectedReservation) {
        await apiRequest(API_DELETE_RESERVATION(deleteModalState.selectedReservation.id), "DELETE");
        handleFindResults(); 
      }
    } catch (error) {
      console.error("Error eliminando la reserva:", error);
      console.log(error)
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
      {availableReservations.length > 0 && (
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
        button={{ deleteText: "Eliminar", cancelText: "Cancelar" }}
      />
      )}
      
    </div>
  )
}

export default ManageMeetingRoom
