import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';
import { MobileTableWrapper, TableRow, TableHeader, TableData, Field, Actions } from './TableStyled';

const TableMobile = ({ data, type, actions, onEdit }) => {
  
  const hasIdColumn = data.some(row => row.id); 
  const hasActions = actions && actions.length > 0; 
  const columnsCount = (hasIdColumn ? 1 : 0) + 1 + (hasActions ? 1 : 0); 

  const renderRowContent = (row) => {
    switch (type) {
      case 'reserveUser'://user reserves
        return (
          <>
            <Field><span>Espai reservat:</span> {row.spaceDTO.spaceType}</Field>
            <Field><span>Taula:</span> {row.spaceDTO.name}</Field>
            <Field>{row.startTime} - {row.endTime}, {row.startDate} - {row.endDate}</Field>
          </>
        );
      case 'adminUsers': //admin user
        return (
          <>
            <Field>{row.name}</Field>
            <Field>{row.projectName}</Field>
            <Field>{row.email}</Field>
            <Field>{row.phone}</Field>
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
          {type === 'reserveUser' ? 'Reserves' : type === 'adminUsers' ? 'Usuaris' : type === 'adminReserves' ? 'Reserva' : ''}
        </TableHeader>
        {hasActions && <TableHeader>Acció</TableHeader>}
      </TableRow>

      {data.map((row, rowIndex) => (
        <TableRow key={rowIndex} columns={columnsCount}>
        {hasIdColumn && <TableData>{row.id}</TableData>}
        <TableData>{renderRowContent(row)}</TableData>
        {hasActions && (
          <Actions>
            {actions.includes('edit') && <EditButton onClick={() => onEdit(row)} />}
            {actions.includes('delete') && <DeleteButton />}
          </Actions>
        )}
      </TableRow>
    ))}
    </MobileTableWrapper>
  );
};

export default TableMobile;