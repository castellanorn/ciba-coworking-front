import { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../auth/AuthProvider";
import { apiRequest } from "../../services/apiRequest";
import { API_GET_ALL_USERS, API_UPDATE_USER } from "../../config/apiEndpoints";

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

const AdminDashboard = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  const [focus, setFocus] = useState("users");

  const [modalState, setModalState] = useState({
    isOpen: false,
    selectedUser: null,
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

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
    });
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setModalState({
      isOpen: false,
      selectedUser: null,
    });
  }, []);

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
          <AddUser fetchUsers={fetchUsers} />
        </SectionBtn>
        <TableMobile
          data={users}
          type="adminUsers"
          actions={["edit", "delete"]}
          onEdit={handleEditClick}
        />
        <Table
          columns={columnsUsers}
          data={users}
          columnMapping={columnMappingUsers}
          actions={["edit", "delete"]}
          onEdit={handleEditClick}
        />
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

      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        message={errorModal.message}
      />
    </div>
  );
};

export default AdminDashboard;
