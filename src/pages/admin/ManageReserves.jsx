import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../auth/AuthProvider";
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
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [focus, setFocus] = useState("reservations");
  const [futureReservations, setFutureReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await apiRequest(API_GET_RESERVATIONS_BY_USER(1), "GET", null, headers);
        
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

  const handlePlacesClick = (target) => {
    if (target === "users") {
      setFocus("users");
      navigate("/panell-administrador"); 

    } else if (target === "reservations") {
      setFocus("reservations");
      navigate("/gestio-reserves"); 
    }
  };

  const handleManageClick =(target)=>{
    switch(target){
      case "tables":
        setFocus("tables");
        navigate("/gestio-de-taules");
        break;
      case "offices":
        setFocus("offices");
        navigate("/gestio-oficina"); 
        break;
      case "meetings":
        setFocus("meetings");
        navigate("/gestio-reunio"); 
        break;
    }
  }

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
          onClick={() => handlePlacesClick("users")}
          focus={focus === "users"} 
        />
        <PlacesButton
          text="Gestiona reserves"
          onClick={() => handlePlacesClick("reservations")}
          focus={focus === "reservations"} 
        />
        </ContainerButtons>
        <Line />
        <Subtitle>EDITAR RESERVES D'USUARIS</Subtitle>
        <ContainerButtons>
            <PlacesButton
                text="Taules individuals"
                onClick={() => handleManageClick("tables")}
                focus={focus === "tables"}
            />
            <PlacesButton
                text="Oficines privades"
                onClick={() => handleManageClick("offices")}
                focus={focus === "offices"}
            />
            <PlacesButton
                text="Sala de reunions"
                onClick={() => handleManageClick("meetings")}
                focus={focus === "meetings"}
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