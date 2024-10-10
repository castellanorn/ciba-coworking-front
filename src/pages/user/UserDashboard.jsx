import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  API_GET_RESERVATIONS_BY_USER,
  API_DELETE_RESERVATION,
} from "../../config/apiEndpoints";
import { apiRequest } from "../../services/apiRequest";
import { AuthContext } from "../../auth/AuthProvider";

import Table from "../../components/table/Table";
import TableMobile from "../../components/table/TableMobile";
import TitleMobile from "../../components/title/Title";
import { Subtitle, TableSection } from "./UserPagesStyled";
import {
  ModalStyles,
  ModalContentStyles,
} from "../../components/buttons/ButtonStyled";
import { columnsReserves, columnMappingReserves } from "../../config/tableData";
import Paragraph from "../../components/textComponents/Paragraph";
import ErrorModal from "../../components/popup/modals/ErrorModal";
import ConfirmationPopup from "../../components/popup/confirmationPopup/ConfirmationPopup";

const UserDashboard = () => {
  const { authToken, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
  });

  const headers = {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await apiRequest(
          API_GET_RESERVATIONS_BY_USER(user.id),
          "GET",
          null,
          headers
        );
        setReservations(response);
      } catch (error) {
        setErrorModal({
          isOpen: true,
          message: "No s'han pogut obtenir reserves.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);

  const pastReservarions = reservations.filter(
    (reservation) => reservation.endDate === formattedDate
  );

  const onEdit = (row) => {
    const spaceId = row.spaceDTO.id;
    if (spaceId === 1) {
      navigate("/edicio-reserva-sala-reunions");
    } else if (spaceId === 2 || spaceId === 3) {
      navigate("/edicio-reserva-oficina");
    } else {
      navigate("/edicio-reserva-taula");
    }
  };

  const onDelete = (row) => {
    setDeleteModalState({
      isOpen: true,
      reservation: row,
    });
  };

  const handleConfirmDelete = async () => {
    const reservationId = deleteModalState.reservation.id;
    try {
      const data = await apiRequest(
        API_DELETE_RESERVATION(reservationId),
        "DELETE",
        null,
        headers
      );
      setReservations(reservations.filter((res) => res.id !== reservationId));
      setDeleteModalState({
        isOpen: false,
      });
      setConfirmationPopupOpen(true);

    } catch (error) {
      console.error("API Error:", error.message);
      setErrorModal({
        isOpen: true,
        message: "No s'ha pogut eliminar la reserva."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalState({
      isOpen: false,
    });
  };
  const handleCloseSuccess = () => {
    navigate('/reserva-taula', { replace: true });
    //setSuccessPopupOpen(false);
  };

  if (loading) {
    return <Paragraph text="Cargando usuarios..." />;
  }

  if (error) {
    return <Paragraph text={`Error: ${error}`} />;
  }

  return (
    <div>
      <TitleMobile title="Panell  d'usuari" />

      <TableSection>
        <Subtitle>RESERVES PENDENTS</Subtitle>

        {reservations.length === 0 ? (
          <Paragraph text="No hi ha reserves fetes." />
        ) : (
          <>
            <Table
              columns={columnsReserves}
              data={reservations}
              columnMapping={columnMappingReserves}
              actions={["edit", "delete"]}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            <TableMobile
              data={reservations}
              type="reserveUser"
              actions={["edit", "delete"]}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </>
        )}

        <Subtitle>RESERVES COMPLETADES</Subtitle>
        {pastReservarions.length === 0 ? (
          <Paragraph text="No hi ha reserves fetes." />
        ) : (
          <>
            <Table
              columns={columnsReserves}
              data={pastReservarions}
              columnMapping={columnMappingReserves}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            <TableMobile
              data={pastReservarions}
              type="reserveUser"
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </>
        )}
      </TableSection>

      {deleteModalState.isOpen && (
        <ModalStyles
          open={deleteModalState.isOpen}
          onClose={handleCancelDelete}
        >
          <ModalContentStyles>
            <h2>Confirmar eliminación</h2>
            <p>Estàs segur/a que vols eliminar la reserva</p>
            <button onClick={handleConfirmDelete}>Aceptar</button>
            <button onClick={handleCancelDelete}>Cancelar</button>
          </ModalContentStyles>
        </ModalStyles>
      )}

      
    <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        message={errorModal.message}
      />
      {confirmationPopupOpen && (
        <ConfirmationPopup
          open={confirmationPopupOpen}
          onClose={handleCloseSuccess}
          subtitleConfirm={
            "La reserva s'ha eliminat amb èxit."
          }
        />
      )}
    </div>
  );
};

export default UserDashboard;
