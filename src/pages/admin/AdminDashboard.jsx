import React, { useState, useEffect, useCallback } from "react";
import Table from "../../components/table/Table";
import TableMobile from "../../components/table/TableMobile";
import TitleMobile from "../../components/title/Title";
import { SectionBtn, Subtitle, TableSection } from "../user/UserPagesStyled";
import AddUser from "../../components/buttons/AddUser"
import EditButton from "../../components/buttons/EditButton";
import {apiRequest} from "../../services/apiRequest"
import {API_GET_ALL_USERS, API_UPDATE_USER } from "../../config/apiEndpoints"
import { columnsUsers,columnMappingUsers } from '../../config/tableData';
import ContainerButtons from '../../components/container/ButtonsContainer'
import PlacesButton from "../../components/buttons/PlacesButton";
import { ModalStyles, ModalContentStyles } from "../../components/buttons/ButtonStyled";
import CreateUserForm from "../../components/form/CreateUserForm";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalState, setModalState] = useState({
    isOpen: false,
    selectedUser: null,
  })

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

  const handleCloseEditModal = useCallback(() => {
    
    setModalState({
      isOpen: false,
      selectedUser: null,
    })
  }, []);


  const handleSubmit = useCallback(async (updatedUser) => {
    try {
      await apiRequest(API_UPDATE_USER(updatedUser.id), "PUT", updatedUser);
      handleCloseEditModal();
      fetchUsers(); 
    } catch (error) {
      console.error("Error en actualitzar l'usuari o enviar el correu:", error);
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
       <SectionBtn><AddUser fetchUsers={fetchUsers}/></SectionBtn>
      <TableMobile data={users} type='adminUsers' actions={['edit','delete']} onEdit={handleEditClick} /> 
      <Table columns={columnsUsers} data={users} columnMapping={columnMappingUsers} actions={['edit','delete']} onEdit={handleEditClick} />
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
    </div>
  );
};

export default AdminDashboard;
