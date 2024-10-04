import React, { useState, useEffect } from 'react';
import TitleMobile from '../../components/title/Title'
import { Subtitle, TableSection } from '../user/UserPagesStyled'
import Table from '../../components/table/Table'
import TableMobile from '../../components/table/TableMobile'
import ContainerButtons from '../../components/container/ButtonsContainer'
import PlacesButton from "../../components/buttons/PlacesButton"
import { Line } from '../../components/title/TitleStyled'
import { columnsReserves,columnMappingReserves } from '../../config/tableData';
import {apiRequest} from "../../services/apiRequest"
import {API_GET_RESERVATIONS_BY_USER} from "../../config/apiEndpoints"

function ManageReserves() {
  const [reservas, setReservas] = useState([]); 
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiRequest(API_GET_RESERVATIONS_BY_USER(1), "GET");
        setReservas(response);
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
  console.log(reservas)
  return (
    <div>
        <TitleMobile title="Panell d’administrador" />
        <ContainerButtons>
            <PlacesButton
                text="Gestiona usuaris"
                link="/panell-administrador"
                focus={false}
            />
            <PlacesButton
                text="Gestiona reserves"
                focus={true}
            />
        </ContainerButtons>
        <Line />
        <Subtitle>EDITAR RESERVES D'USUARIS</Subtitle>
        <ContainerButtons>
            <PlacesButton
                text="Taules individuals"
                link="/gestio-de-taules"
                focus={false}
            />
            <PlacesButton
                text="Oficines privades"
                link="/gestio-oficina"
                focus={false}
            />
            <PlacesButton
                text="Sala de reunions"
                link="/gestio-reunio"
                focus={false}
            />
        </ContainerButtons>
        <Line />
        <TableSection>
            <Subtitle>RESERVES PENDENTS ADMIN</Subtitle>
            <Table columns={columnsReserves} data={reservas} columnMapping={columnMappingReserves} actions={['delete']} />
            <TableMobile data={reservas} type='reserveUser' actions={['delete']} />

            {/* <Subtitle>RESERVES COMPLETADES</Subtitle>
            <Table columns={columnsReserves} data={reservas} columnMapping={columnMappingReserves} />
            <TableMobile data={reservas} type='adminReserves' /> */}
        </TableSection>
    </div>
    
  )
}

export default ManageReserves