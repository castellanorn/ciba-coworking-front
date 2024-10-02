import Table from "../../components/table/Table"
import TableMobile from "../../components/table/TableMobile"
import TitleMobile from "../../components/title/Title";
import { Subtitle, TableSection } from "../user/UserPagesStyled";
import AddUser from "../../components/buttons/AddUser"
import { useState } from "react";
import CreateUserForm from "../../components/form/CreateUserForm";
import { ModalStyles, ModalContentStyles } from "../../components/buttons/ButtonStyled";


const columns = ['Id','Nom amb Cognom', 'Proyecte', 'Correu', 'Mobil'];


const users=[{id: '01', nomAmbCognom:'Juan Perez', projecte:'Viure Mitjor',correu:'juan@gmail.com',mobil:'600493200'},{id: '02', nomAmbCognom:'Juan Perez', projecte:'Viure Mitjor',correu:'juan@gmail.com',mobil:'600493200'},{id: '03', nomAmbCognom:'Juan Perez', projecte:'Viure Mitjor',correu:'juan@gmail.com',mobil:'600493200'}]

const AdminDashboard = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 


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
  const handleSubmit = (updatedUser) => {
    handleCloseEditModal();
  };

  return (
    <div>
    <TitleMobile title="Panell d’administrador" />
    <TableSection>
      <Subtitle>USUARIS</Subtitle>
      <AddUser/>
      <TableMobile data={users} type='adminUsers' actions={['edit','delete']} onEdit={handleEditClick}  /> 
      <Table columns={columns} data={users}  actions={['edit','delete']}  onEdit={handleEditClick} />
      </TableSection>

      {isEditModalOpen && (
        <ModalStyles>
          <ModalContentStyles>
            <CreateUserForm
              initialData={selectedUser} // Pasar los datos del usuario seleccionado al formulario
              onCancel={handleCloseEditModal} // Función para cerrar el modal
              onSubmit={handleSubmit} // Función para manejar la actualización
            />
          </ModalContentStyles>
        </ModalStyles>
      )}
    </div>
  )
}

export default AdminDashboard
