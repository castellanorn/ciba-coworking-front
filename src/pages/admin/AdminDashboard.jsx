import React, { useState, useEffect } from 'react';
import Table from "../../components/table/Table"
import TableMobile from "../../components/table/TableMobile"
import TitleMobile from "../../components/title/Title";
import { SectionBtn, Subtitle, TableSection } from "../user/UserPagesStyled";
import AddUser from "../../components/buttons/AddUser"
import EditButton from "../../components/buttons/EditButton";
import {apiRequest} from "../../services/apiRequest"
import {API_GET_ALL_USERS} from "../../config/apiEndpoints"
import { columnsUsers,columnMappingUsers } from '../../config/tableData';
import ContainerButtons from '../../components/container/ButtonsContainer'
import PlacesButton from "../../components/buttons/PlacesButton"

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiRequest(API_GET_ALL_USERS(), "GET");
        setUsers(response.slice(1));
      } catch (error) {
        setError(error.message);  
      } finally {
        setLoading(false);  
      }
    };

    fetchUsers();  
  }, []);

  if (loading) {
    return <p>Cargando usuarios...</p>; 
  }

  if (error) {
    return <p>Error: {error}</p>; 
  }
  console.log(users)
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
       <SectionBtn><AddUser/></SectionBtn>
      <TableMobile data={users} type='adminUsers' actions={['edit','delete']} /> 
      <Table columns={columnsUsers} data={users} columnMapping={columnMappingUsers} actions={['edit','delete']} />
    </TableSection>
    </div>
  )
}

export default AdminDashboard
