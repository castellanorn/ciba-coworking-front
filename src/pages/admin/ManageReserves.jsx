import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import TitleMobile from "../../components/title/Title";
import { Subtitle, TableSection } from "../user/UserPagesStyled";
import Table from "../../components/table/Table";
import TableMobile from "../../components/table/TableMobile";
import ContainerButtons from "../../components/container/ButtonsContainer";
import PlacesButton from "../../components/buttons/PlacesButton";
import { Line } from "../../components/title/TitleStyled";
import { columnsReserves, columnMappingReserves } from "../../config/tableData";
import { apiRequest } from "../../services/apiRequest";
import {
  API_GET_RESERVATIONS_BY_USER,
  API_DELETE_RESERVATION,
} from "../../config/apiEndpoints";
import { splitReservations } from "../../config/reservationHelpers";
import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import { formatTime } from "../../config/formatTime";
import ErrorModal from "../../components/popup/modals/ErrorModal";
import ConfirmationPopup from "../../components/popup/confirmationPopup/ConfirmationPopup";
import Paragraph from "../../components/textComponents/Paragraph";

function ManageReserves() {
   const { authToken, user } = useContext(AuthContext);
   const navigate = useNavigate();
   const [focus, setFocus] = useState("reservations");
   const [futureReservations, setFutureReservations] = useState([]);
   const [pastReservations, setPastReservations] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });

   const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
   };

   const handleFindResults = async () => {
      try {
         const response = await apiRequest(
         API_GET_RESERVATIONS_BY_USER(user.id),
         "GET",
         null,
         headers
         );

         const currentDate = new Date();
         const formattedDate = currentDate.toISOString().slice(0, 10);
         const pastReservarions = response.filter(
         (reservation) => reservation.endDate === formattedDate
         );
         const futureReservations = response.filter(
         (reservation) => reservation.endDate !== formattedDate
         );
         const sortedFutureReservations = futureReservations.sort((a, b) =>
         a.startDate.localeCompare(b.startDate)
         );
         const sortedPastReservations = pastReservarions.sort((a, b) =>
         a.startDate.localeCompare(b.startDate)
         );

         setFutureReservations(sortedFutureReservations);
         setPastReservations(sortedPastReservations);
      } catch (error) {
         setError(error.message);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      handleFindResults();
   }, []);

   const handlePlacesClick = (target) => {
      if (target === "users") {
         setFocus("users");
         navigate("/panell-administrador");
      } else if (target === "reservations") {
         setFocus("reservations");
         navigate("/gestio-reserves");
      }
   };

   const handleManageClick = (target) => {
      switch (target) {
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
         default:
         break;
      }
   };

   const [deleteModalState, setDeleteModalState] = useState({
      isOpen: false,
      selectedReservation: null,
   });

   const handleDeleteClick = (reservation) => {
      setDeleteModalState({
         isOpen: true,
         selectedReservation: reservation,
      });
   };

   const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
   const handleConfirmDelete = async () => {
      try {
         if (deleteModalState.selectedReservation) {
         await apiRequest(
            API_DELETE_RESERVATION(deleteModalState.selectedReservation.id),
            "DELETE",
            null,
            headers
         );
         await handleFindResults();
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
         selectedReservation: null,
         });
      }
   };

   const handleCancelDelete = () => {
      setDeleteModalState({
         isOpen: false,
         selectedReservation: null,
      });
   };
   if (loading) {
      return <p>Cargando reserves...</p>;
   }

   if (error) {
      return <p>Error: {error}</p>;
   }

   return (
      <div>
         <TitleMobile title="Panell d’administrador" />
         <ContainerButtons>
         <PlacesButton
            text="Gestiona usuaris"
            onClick={() => handlePlacesClick("users")}
            focus={focus === "users"}
         />
         <PlacesButton
            text="Gestiona reserves"
            onClick={() => handlePlacesClick("reservations")}
            focus={focus === "reservations"}
         />
         </ContainerButtons>
         <Line />
         <Subtitle>EDITAR RESERVES D'USUARIS</Subtitle>
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
         <TableSection>
         <Subtitle>RESERVES PENDENTS ADMIN</Subtitle>
         {futureReservations.length === 0 ? (
            <Paragraph text="No hi ha reserves fetes." />
         ) : (
            <>
               <Table
               columns={columnsReserves}
               data={futureReservations}
               columnMapping={columnMappingReserves}
               actions={["delete"]}
               onDelete={handleDeleteClick}
               />
               <TableMobile
               data={futureReservations}
               type="reserveUser"
               actions={["delete"]}
               onDelete={handleDeleteClick}
               />
            </>
         )}
         <Subtitle>RESERVES COMPLETADES</Subtitle>
         {pastReservations.length === 0 ? (
            <Paragraph text="No hi ha reserves fetes." />
         ) : (
            <>
               <Table
               columns={columnsReserves}
               data={pastReservations}
               columnMapping={columnMappingReserves}
               />
               <TableMobile data={pastReservations} type="reserveUser" />
            </>
         )}
         </TableSection>

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
   );
}

export default ManageReserves;
