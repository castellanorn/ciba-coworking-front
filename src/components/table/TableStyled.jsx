import styled from "styled-components";

export const TableWrapper = styled.div`
  
  overflow-x: auto;
  padding: 16px;
  
  @media (max-width: 768px) {
    display: none; // Oculta la tabla en móviles
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