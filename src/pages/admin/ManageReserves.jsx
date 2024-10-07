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
import { splitReservations } from '../../config/reservationHelpers';

function ManageReserves() {
  const [futureReservations, setFutureReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await apiRequest(API_GET_RESERVATIONS_BY_USER(1), "GET");
        
        const { futureReservations, pastReservations } = splitReservations(response);

        setFutureReservations(futureReservations);
        setPastReservations(pastReservations);
      } catch (error) {
        setError(error.message);  
      } finally {
        setLoading(false);  
      }
    };

    fetchReservations();  
  }, []);

  if (loading) {
    return <p>Cargando reserves...</p>; 
  }

  if (error) {
    return <p>Error: {error}</p>; 
  }
  console.log(futureReservations)
  console.log(pastReservations)
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
            <Table columns={columnsReserves} data={futureReservations} columnMapping={columnMappingReserves} actions={['delete']} />
            <TableMobile data={futureReservations} type='reserveUser' actions={['delete']} />

            <Subtitle>RESERVES COMPLETADES</Subtitle>
            <Table columns={columnsReserves} data={pastReservations} columnMapping={columnMappingReserves} />
            <TableMobile data={pastReservations} type='reserveUser' />
        </TableSection>
    </div>
    
  )
}

export default ManageReserves