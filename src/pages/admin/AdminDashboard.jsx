import Table from "../../components/table/Table"
import TableMobile from "../../components/table/TableMobile"
import TitleMobile from "../../components/title/Title";
import { Subtitle, TableSection } from "../user/UserPagesStyled";
import AddUser from "../../components/buttons/AddUser"
import ContainerButtons from "../../components/container/ButtonsContainer";
import EditButton from "../../components/buttons/EditButton";

const columns = ['Id','Nom amb Cognom', 'Proyecte', 'Correu', 'Mobil'];


const users=[{id: '01', nomAmbCognom:'Juan Perez', projecte:'Viure Mitjor',correu:'juan@gmail.com',mobil:'600493200'},{id: '02', nomAmbCognom:'Juan Perez', projecte:'Viure Mitjor',correu:'juan@gmail.com',mobil:'600493200'},{id: '03', nomAmbCognom:'Juan Perez', projecte:'Viure Mitjor',correu:'juan@gmail.com',mobil:'600493200'}]

const AdminDashboard = () => {
  return (
    <div>
    <TitleMobile title="Panell d’administrador" />
    <TableSection>
      <Subtitle>USUARIS</Subtitle>
      <AddUser/>
      <EditButton/>
      <TableMobile data={users} type='adminUsers' actions={['edit','delete']} /> 
      <Table columns={columns} data={users}  actions={['edit','delete']} />
      </TableSection>
    </div>
  )
}

export default AdminDashboard
