import React, { useState, useEffect } from 'react';
import Table from "../../components/table/Table"
import TableMobile from "../../components/table/TableMobile"
import TitleMobile from "../../components/title/Title"
import { Subtitle, TableSection } from "./UserPagesStyled";
import { columnsReserves, columnMappingReserves } from "../../config/tableData";
import { API_GET_RESERVATIONS_BY_USER } from '../../config/apiEndpoints';
import {apiRequest} from "../../services/apiRequest"

/* const data = [
  { data: '2024-09-05', franja: 'Matí', espai: 'Sala 1', idEspai: '01' },
  { data: '2024-09-06', franja: 'Tarda', espai: 'Sala 2', idEspai: '02' },
];
const reservasFuturasData = [
  { data: '2024-10-05', franja: 'Matí', espai: 'Sala 1',idEspai: '01' },
  { data: '2024-10-06', franja: 'Tarda', espai: 'Sala 2',idEspai: '01' },
]; */

const UserDashboard = () => {
  const [reserves, setReserves] = useState([]); 
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchReserves = async () => {
      try {
        const response = await apiRequest(API_GET_RESERVATIONS_BY_USER(2), "GET");
        setReserves(response); 
      } catch (error) {
        setError(error.message);  
      } finally {
        setLoading(false);  
      }
    };

    fetchReserves();  
  }, []);

  if (loading) {
    return <p>Cargando usuarios...</p>; 
  }

  if (error) {
    return <p>Error: {error}</p>; 
  }
  console.log(reserves)
  return (
    <div>
      <TitleMobile title="Reserves Pendents" />
      
      <TableSection>
        <Subtitle>RESERVES PENDENTS</Subtitle>
        <Table columns={columnsReserves} data={reserves} columnMapping={columnMappingReserves} actions={['edit', 'delete']} />
        <TableMobile data={reserves} type="reserveUser" actions={['edit','delete']} />
        
        <Subtitle>RESERVES COMPLETADES</Subtitle>
        <Table columns={columnsReserves} data={reserves} columnMapping={columnMappingReserves}/>
        <TableMobile data={reserves} type="reserveUser" />
        

      </TableSection>
      
    </div>
  )
}

export default UserDashboard;
