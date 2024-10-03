import styled from "styled-components";

export const TableWrapper = styled.div`
  
  overflow-x: auto;
  padding: 16px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;
export const MobileTableWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    overflow-x: auto;
    margin-bottom: 40px;
  }
`;
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  
   thead {
    background-color: var(--ligthgray);
    color: var(--white);
    font-size:25px;
    font-family: 'Marianina FY Black';
    th:first-child {
      border-top-left-radius: 10px; 
      
    }
    th:last-child {
      border-top-right-radius: 10px; 
     
    }
  }
  tbody {
    font-family: 'Marianina FY Regular'; 
    font-size:16px;
  }
  th, td {
    border-bottom: 1px solid var(--ligthgray);
    padding: 10px;
    text-align: center;
  }

  th {
    background-color:  var(--ligthgray);
    text-align: center;
    color: var(--white);
  }
  
`;
export const Tdstyled=styled.div`
    display:flex;
    justify-content: center;
    gap: 5px;

`;
export const Field = styled.p`
  margin: 0;
  padding: 5px 0;
  font-family: 'Marianina FY Regular';
  font-size: 16px;
  color: var(--darkgray);

  span {
    font-weight: bold;
    margin-right: 5px;
    display: inline;
  }
`;
export const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items:center;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`}; /* Dinámico según las columnas */
  
  border-bottom: 1px solid var(--ligthgray);
  color:var(--white);
  
  >:first-child{
    border-radius:20px 0 0 0;
  }
  >:last-child{
  border-radius: 0 20px 0 0;
  }
  
`;

export const TableHeader = styled.div`
  font-weight: bold;
  background-color: var(--ligthgray);
  padding: 8px;
  font-family: 'Marianina FY Black';
  font-size:25px;
  text-align:center;
`;

export const TableData = styled.div`
  padding: 10px;
  color: var(--darkgray);
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  flex-direction: column;
  align-content: center;
`;