import Table from "../../components/table/Table"
import TableMobile from "../../components/table/TableMobile"
import TitleMobile from "../../components/title/Title";
import { Subtitle, TableSection } from "../user/UserPagesStyled";
import AddUser from "../../components/buttons/AddUser"
import { useEffect, useState } from "react";
import CreateUserForm from "../../components/form/CreateUserForm";
import { ModalStyles, ModalContentStyles } from "../../components/buttons/ButtonStyled";
import axios from 'axios'


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 

    // Función para obtener los usuarios desde la API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/users`); // URL de tu API
        setUsers(response.data); // Suponiendo que los usuarios vienen en response.data
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    useEffect(() => {
      fetchUsers();
    }, []);

  // Función para abrir el modal y seleccionar un usuario
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  // Función para manejar la actualización del usuario
  const handleSubmit = async (updatedUser) => {
    try {
      await axios.put(`${BASE_URL}/api/admin/update/user/${updatedUser.id}`, updatedUser);
      await axios.post(`${BASE_URL}/api/admin/send-password-email`, {
        email: updatedUser.email,
        password: updatedUser.password,
      });
      handleCloseEditModal();
      fetchUsers(); // Actualizar la lista de usuarios después de la edición
    } catch (error) {
      console.error("Error en actualitzar l'usuari o enviar el correu:", error);
    }
  };

  return (
    <div>
    <TitleMobile title="Panell d’administrador" />
    <TableSection>
      <Subtitle>USUARIS</Subtitle>
      <AddUser/>
      <TableMobile data={users} type='adminUsers' actions={['edit','delete']} onEdit={handleEditClick}  /> 
      <Table columns={['Id', 'name', 'email', 'phone', 'project_name']} data={users}  actions={['edit','delete']}  onEdit={handleEditClick} />
      </TableSection>

      {isEditModalOpen && (
        <ModalStyles>
          <ModalContentStyles>
            <CreateUserForm
              initialData={selectedUser}
              onCancel={handleCloseEditModal} 
              onSubmit={handleSubmit} 
            />
          </ModalContentStyles>
        </ModalStyles>
      )}
    </div>
  )
}

export default AdminDashboard
