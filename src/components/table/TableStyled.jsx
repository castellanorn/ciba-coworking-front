import styled from "styled-components";

export const TableWrapper = styled.div`
  
  overflow-x: auto;
  padding: 16px;
  
  @media (max-width: 768px) {
    display: none; // Oculta la tabla en móviles
  }
`;
export const MobileTableWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    overflow-x: auto;
  }
`;
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  
   thead {
    background-color: var(--darkgray);
    color: var(--white);
    font-size:25px;
    font-family: 'Marianina FY Black';
    th:first-child {
      border-top-left-radius: 10px; 
      border: none;
    }
    th:last-child {
      border-top-right-radius: 10px; 
      border: none; 
    }
  }
  tbody {
    font-family: 'Marianina FY Regular'; 
    font-size:16px;
  }
  th, td {
    border: 1px solid var(--darkgray);
    padding: 10px;
    text-align: center;
  }

  th {
    background-color:  var(--darkgray);
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