import {TableWrapper,StyledTable, Tdstyled} from './TableStyled'
import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';

function Table ({ columns, data, columnMapping, actions, onEdit, onDelete })  {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            {actions && <th>Acció</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column, i) => (
                <td key={i}>
                  {/* {columnMapping[column].split('.').reduce((acc, key) => acc[key], row)} */}
                  {typeof columnMapping[column] === 'function'
                    ? columnMapping[column](row)
                    : columnMapping[column].split('.').reduce((obj, key) => obj[key], row)
                  }
                </td>
              ))}
              {actions && (
                <td>
                    <Tdstyled>
                    {actions.includes('edit') && <EditButton onClick={() => onEdit(row)} />}
                    {actions.includes('delete') && <DeleteButton onClick={() => onDelete(row)}/>}
                  </Tdstyled>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table