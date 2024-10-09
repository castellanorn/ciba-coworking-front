import { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../auth/AuthProvider";
import { apiRequest } from "../../services/apiRequest";
import { API_DELETE_USER, API_GET_ALL_USERS, API_UPDATE_USER, API_CREATE_USER } from "../../config/apiEndpoints";

import Table from "../../components/table/Table";
import TableMobile from "../../components/table/TableMobile";
import TitleMobile from "../../components/title/Title";
import { SectionBtn, Subtitle, TableSection } from "../user/UserPagesStyled";
import AddUser from "../../components/buttons/AddUser";
import EditButton from "../../components/buttons/EditButton";

import { columnsUsers, columnMappingUsers } from "../../config/tableData";
import ContainerButtons from "../../components/container/ButtonsContainer";
import PlacesButton from "../../components/buttons/PlacesButton";
import {
  ModalStyles,
  ModalContentStyles,
} from "../../components/buttons/ButtonStyled";
import CreateUserForm from "../../components/form/CreateUserForm";
import ErrorModal from "../../components/popup/modals/ErrorModal";
import Paragraph from "../../components/textComponents/Paragraph";
import ConfirmationPopup from '../../components/popup/confirmationPoput/ConfirmationPoput';

const AdminDashboard = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  const [focus, setFocus] = useState("users");
  const [isEditing, setIsEditing] = useState(false);

  const [modalState, setModalState] = useState({
    isOpen: false,
    selectedUser: null,
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    selectedUser: null,
  });

  const fetchUsers = async () => {
    try {
      const data = await apiRequest(API_GET_ALL_USERS, "GET", null, headers);
      setUsers(data);
    } catch (error) {
      console.error("API Error:", error.message);
      setErrorModal({
        isOpen: true,
        message: `Error: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = useCallback((user) => {
    setModalState({
      isOpen: true,
      selectedUser: user,
    })
  }, []);

  const handleDeleteClick= useCallback((user)=>{
    setDeleteModalState({
      isOpen: true,
      selectedUser: user,
    });
  },[]);

  const handleConfirmDelete = useCallback(async () => {
    try {
      if (deleteModalState.selectedUser) {
        await apiRequest(API_DELETE_USER(deleteModalState.selectedUser.id), "DELETE");
        fetchUsers();  
      }
    } catch (error) {
      console.error("Error eliminando el usuario:", error);
    } finally {
      setDeleteModalState({
        isOpen: false,
        selectedUser: null,
      });
    }
  }, [deleteModalState.selectedUser, fetchUsers]);

  const handleCancelDelete = useCallback(() => {
    setDeleteModalState({
      isOpen: false,
      selectedUser: null,
    });
  }, []);

  const handleDeleteClick= useCallback((user)=>{
    setDeleteModalState({
      isOpen: true,
      selectedUser: user,
    });
  },[]);

  const handleConfirmDelete = useCallback(async () => {
    try {
      if (deleteModalState.selectedUser) {
        await apiRequest(API_DELETE_USER(deleteModalState.selectedUser.id), "DELETE");
        fetchUsers();  
      }
    } catch (error) {
      console.error("Error eliminando el usuario:", error);
    } finally {
      setDeleteModalState({
        isOpen: false,
        selectedUser: null,
      });
    }
  }, [deleteModalState.selectedUser, fetchUsers]);

  const handleCancelDelete = useCallback(() => {
    setDeleteModalState({
      isOpen: false,
      selectedUser: null,
    });
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setModalState({
      isOpen: false,
      selectedUser: null,
    });
  }, []);

  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const handleCreateSubmit = useCallback(async (userData) => {
    try {
      if (!userData.id) {
        await apiRequest(API_CREATE_USER(), "POST", userData);
        setIsEditing(false);
      } else {
        await apiRequest(API_UPDATE_USER(userData.id), "PUT", userData);
        setIsEditing(true);
      }
      handleCloseEditModal();
      setConfirmationPopupOpen(true);

      fetchUsers();
    } catch (error) {
      console.error("Error al crear o actualizar el usuario:", error);
    }
  }, [fetchUsers, handleCloseEditModal]);
  
  const handleSubmit = useCallback(
    async (updatedUser) => {
      try {
        await apiRequest(
          API_UPDATE_USER(updatedUser.id),
          "PUT",
          updatedUser,
          headers
        );
        handleCloseEditModal();
        fetchUsers();
      } catch (error) {
        setErrorModal({
          isOpen: true,
          message: `Error en actualitzar l'usuari o enviar el correu:: ${error}`,
        });
      }
    },
    [fetchUsers, handleCloseEditModal]
  );

  const handlePlacesClick = (target) => {
    if (target === "users") {
      setFocus("users");
      navigate("/panell-administrador"); 

    } else if (target === "reservations") {
      setFocus("reservations");
      navigate("/gestio-reserves"); 
    }
  };
  

  if (loading) {
    return <Paragraph text="Cargando usuarios..." />;
  }

  if (error) {
    return <Paragraph text={`Error: ${error}`} />;
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
      <TableSection>
        <Subtitle>USUARIS</Subtitle>
        <SectionBtn>
           <AddUser onAddUser={handleCreateSubmit}  />
        </SectionBtn>
        <TableMobile
          data={users}
          type="adminUsers"
          actions={["edit", "delete"]}
          onEdit={handleEditClick}
        onDelete={handleDeleteClick} />
        <Table
          columns={columnsUsers}
          data={users}
          columnMapping={columnMappingUsers}
          actions={["edit", "delete"]}
          onEdit={handleEditClick}
        onDelete={handleDeleteClick}/>
      </TableSection>

      {modalState.isOpen && (
        <ModalStyles>
          <ModalContentStyles>
            <CreateUserForm
              initialData={modalState.selectedUser}
              onCancel={handleCloseEditModal}
              onSubmit={handleSubmit}
            />
          </ModalContentStyles>
        </ModalStyles>
      )}

      {deleteModalState.isOpen && (
        <ModalStyles open={deleteModalState.isOpen} onClose={handleCancelDelete}>
          <ModalContentStyles>
          <h2>Confirmar eliminación</h2>
          <p>¿Estás seguro de que deseas eliminar al usuario <strong>{deleteModalState.selectedUser.name}</strong>?</p>
          <button onClick={handleConfirmDelete}>Aceptar</button>
          <button onClick={handleCancelDelete}>Cancelar</button>
          </ModalContentStyles>
        </ModalStyles>
      )}

{confirmationPopupOpen && (
  <ConfirmationPopup
    open={confirmationPopupOpen}
    onClose={() => setConfirmationPopupOpen(false)}
    subtitleConfirm={isEditing ? "Usuari actualitzat correctament" : "Usuari creat correctament"}
  />
)}

      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        message={errorModal.message}
      />
    </div>
  );
};

export default AdminDashboard;
