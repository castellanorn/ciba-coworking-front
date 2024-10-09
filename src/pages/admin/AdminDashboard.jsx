import { useState, useEffect, useCallback } from 'react';
import Table from "../../components/table/Table"
import TableMobile from "../../components/table/TableMobile"
import TitleMobile from "../../components/title/Title";
import { SectionBtn, Subtitle, TableSection } from "../user/UserPagesStyled";
import AddUser from "../../components/buttons/AddUser"
import {apiRequest} from "../../services/apiRequest"
import {API_DELETE_USER, API_GET_ALL_USERS, API_UPDATE_USER, API_CREATE_USER } from "../../config/apiEndpoints"
import { columnsUsers,columnMappingUsers } from '../../config/tableData';
import ContainerButtons from '../../components/container/ButtonsContainer'
import PlacesButton from "../../components/buttons/PlacesButton";
import { ModalStyles, ModalContentStyles } from "../../components/buttons/ButtonStyled";
import CreateUserForm from "../../components/form/CreateUserForm";
import ConfirmationPopup from '../../components/popup/confirmationPoput/ConfirmationPoput';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [modalState, setModalState] = useState({
    isOpen: false,
    selectedUser: null,
  })

  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    selectedUser: null,
  });

  const fetchUsers =  useCallback(async () => {
    try {
      const response = await apiRequest(API_GET_ALL_USERS(), "GET");
      setUsers(response.slice(1));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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

  const handleCloseEditModal = useCallback(() => {
    setModalState({
      isOpen: false,
      selectedUser: null,
    })
  }, []);


  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const handleSubmit = useCallback(async (userData) => {
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

  if (loading) {
    return <p>Cargando usuarios...</p>;
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
            focus={true}
          />
          <PlacesButton
            text="Gestiona reserves"
            link="/gestio-reserves"
            focus={false}
          />
        </ContainerButtons>
    <TableSection>
      <Subtitle>USUARIS</Subtitle>
       <SectionBtn> <AddUser onAddUser={handleSubmit} /></SectionBtn>
      <TableMobile data={users} type='adminUsers' actions={['edit','delete']} onEdit={handleEditClick} onDelete={handleDeleteClick} /> 
      <Table columns={columnsUsers} data={users} columnMapping={columnMappingUsers} actions={['edit','delete']} onEdit={handleEditClick} onDelete={handleDeleteClick}/>
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
    </div>
  );
};

export default AdminDashboard;
