import React from "react";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import {
  MobileTableWrapper,
  TableRow,
  TableHeader,
  TableData,
  Field,
  Actions,
} from "./TableStyled";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatTimeRange = (startTime, endTime) => {
  if (startTime === "08:00:00" && endTime === "13:59:59") {
    return "matí"; 
  } else if (startTime === "14:00:00" && endTime === "20:00:00") {
    return "tarda"; 
  }
  return `${startTime.slice(0, -3)} - ${endTime.slice(0, -3)}`;
};

const TableMobile = ({ data, type, actions, onEdit, onDelete }) => {
  const hasIdColumn = data.some((row) => row.id); 
  const hasActions = actions && actions.length > 0; 
  const columnsCount = (hasIdColumn ? 1 : 0) + 1 + (hasActions ? 1 : 0);
  
  const renderRowContent = (row) => {
    switch (type) {
      case "reserveUser": 
        return (
          <>
            <Field>
              <span>Espai reservat:</span>
            </Field>
            <Field>
              <span>{row.spaceDTO.spaceType}</span>
            </Field>
            <Field>
              {formatTimeRange(row.startTime, row.endTime)}
              
    
            </Field>
            <Field>
            {row.startDate === row.endDate
                ? formatDate(row.startDate) 
                : `${formatDate(row.startDate)} - ${formatDate(row.endDate)}`}
            </Field>
          </>
        );
      case "adminUsers": 
        return (
          <>
            <Field>{row.name}</Field>
            <Field>{row.projectName}</Field>
            <Field>{row.email}</Field>
            <Field>{row.phone}</Field>
          </>
        );
      case "adminReserves": 
        return (
          <>
            <Field>
              <span>Franja:</span> {row.startTime} - {row.endTime}
            </Field>
            <Field>
              <span>Data:</span> {formatDate(row.startDate)} -{" "}
              {formatDate(row.endDate)}
            </Field>
            <Field>
              <span>Nom i cognoms:</span> {row.userDTO.name}
            </Field>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <MobileTableWrapper>
      <TableRow columns={columnsCount}>
        {hasIdColumn && 
        <TableHeader >
          ID
        </TableHeader>}
        <TableHeader >
          {type === "reserveUser"
            ? "Reserves"
            : type === "adminUsers"
            ? "Usuaris"
            : type === "adminReserves"
            ? "Reserva"
            : ""}
        </TableHeader>
        {hasActions && <TableHeader>Acció</TableHeader>}
      </TableRow>

      {data.map((row, rowIndex) => (
        <TableRow key={rowIndex} columns={columnsCount}>
          {hasIdColumn && <TableData >{row.id}</TableData>}
          <TableData>{renderRowContent(row)}</TableData>
          {hasActions && (
            <Actions>
              {actions.includes("edit") && (
                <EditButton onClick={() => onEdit(row)} />
              )}
              {actions.includes("delete") && (
                <DeleteButton onClick={() => onDelete(row)} />
              )}
            </Actions>
          )}
        </TableRow>
      ))}
    </MobileTableWrapper>
  );
};

export default TableMobile;
