import React from 'react'
import {TableWrapper,StyledTable, Tdstyled} from './TableStyled'
import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';

function Table ({ columns, data, actions })  {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            {actions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
              {actions && (
                <td>
                    <Tdstyled>
                    {actions.includes('edit') && <EditButton />}
                    {actions.includes('delete') && <DeleteButton />}
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