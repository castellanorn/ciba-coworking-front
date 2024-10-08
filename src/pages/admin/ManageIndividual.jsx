import { useState } from "react";
import { Line } from '../../components/title/TitleStyled'
import ContainerButtons from '../../components/container/ButtonsContainer'
import PlacesButton from "../../components/buttons/PlacesButton"
import TitleMobile from '../../components/title/Title'
import Table from "../../components/table/Table"
import TableMobile from "../../components/table/TableMobile"
import { columnsReserves, columnMappingReserves } from '../../config/tableData';
import { Subtitle, TableSection } from '../user/UserPagesStyled'
import Calendar from "../../components/calendar/Calendar";
import { ButtonFind } from "../../components/buttons/ButtonStyled";
import {apiRequest} from "../../services/apiRequest"
import {API_GET_RESERVATIONS_BY_DATE} from "../../config/apiEndpoints"

const ManageIndividual = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [availableReservations, setAvailableReservations] = useState([]);
  const [error, setError] = useState("");

  const handleFindResults = async () => {
    if (selectedDates.length !== 2) {
      setError("Si us plau, selecciona un rang de dates.");
      return;
    }  
    
    const startDate = selectedDates[0].format("YYYY-MM-DD");
    const endDate = selectedDates[1].format("YYYY-MM-DD"); 
    try{
      setError("");
      const body = {
        startDate: startDate,
        endDate: endDate,
      };
      /* const reservations = await apiRequest(API_GET_RESERVATIONS_BY_DATE+'?startDate='+startDate+'&endDate='+endDate, "GET"); */
      console.log(body)
      const reservations = await apiRequest(API_GET_RESERVATIONS_BY_DATE, "POST", body);
      setAvailableReservations(reservations);
    }catch (error) {
      setError(error.message); 
    }
  };
  return (
    <div>
      <TitleMobile title="Edició de reserves" />
      <ContainerButtons>
        <PlacesButton
            text="Taules individuals"
            focus={true}
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
      <Calendar
        onChange={setSelectedDates}
        value={selectedDates}
        setError={setError}
      />
      <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Buscar</ButtonFind>
        </ContainerButtons>
      <Line />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {availableReservations.length > 0 && (
        <TableSection>
          <Table 
            columns={columnsReserves} 
            data={availableReservations} 
            columnMapping={columnMappingReserves} 
            actions={['delete']} />
          <TableMobile 
            data={availableReservations} 
            type='reserveUser' 
            actions={['delete']} />
        </TableSection>
        
    )}
    </div>
  )
}

export default ManageIndividual
