import styled from 'styled-components';
import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';
import { MobileTableWrapper, TableRow, TableHeader, TableData, Field, Actions } from './TableStyled';

const TableMobile = ({ data, type, actions }) => {
  
  const hasIdColumn = data.some(row => row.id); 
  const hasActions = actions && actions.length > 0; 
  const columnsCount = (hasIdColumn ? 1 : 0) + 1 + (hasActions ? 1 : 0); 

  const renderRowContent = (row) => {
    switch (type) {
      case 'reserveUser'://user reserves
        return (
          <>
            <Field><span>Espai reservat:</span> {row.espai}</Field>
            <Field><span>Taula:</span> {row.idEspai}</Field>
            <Field>{row.franja}, {row.data}</Field>
          </>
        );
      case 'adminUsers': //admin user
        return (
          <>
            <Field>{row.nomAmbCognom}</Field>
            <Field>{row.projecte}</Field>
            <Field>{row.correu}</Field>
            <Field>{row.mobil}</Field>
          </>
        );
      case 'adminReserves'://admin reserves for users
        return (
          <>
            <Field><span>Franja:</span> {row.franja}</Field>
            <Field><span>Data:</span> {row.data}</Field>
            <Field><span>Nom i cognoms:</span> {row.nomAmbCognom}</Field>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <MobileTableWrapper>
      <TableRow columns={columnsCount}>
        {hasIdColumn && <TableHeader>ID</TableHeader>}
        <TableHeader>
          {type === 'reserves' ? 'Reserves' : type === 'usuaris' ? 'Usuaris' : 'Reserva'}
        </TableHeader>
        {hasActions && <TableHeader>Acció</TableHeader>}
      </TableRow>

      {data.map((row, rowIndex) => (
        <TableRow key={rowIndex} columns={columnsCount}>
        {hasIdColumn && <TableData>{row.id}</TableData>}
        <TableData>{renderRowContent(row)}</TableData>
        {hasActions && (
          <Actions>
            {actions.includes('edit') && <EditButton />}
            {actions.includes('delete') && <DeleteButton />}
          </Actions>
        )}
      </TableRow>
    ))}
    </MobileTableWrapper>
  );
};

export default TableMobile;