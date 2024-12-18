import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import {
  ContainerDialog,
  H6,
  LineSpan,
  SubTitleMessage,
  TitleMessage,
} from "./PopUpStyled";
import { ButtonCancel, ButtonConfirm } from "../../buttons/ButtonStyled";
import { formatDate } from "../../../config/formatDate";

const PopUpConfirmReserve = ({
  open,
  onConfirm,
  onCancel,
  space,
  table,
  pageType,
  button,
  actionType,
  reservation,
}) => {
  if (!reservation) return null;

  const getPeriod = (startTime) => {
    const startHour = parseInt(startTime.split(":")[0], 10);
    if (startHour >= 8 && startHour < 14) {
      return "Matí";
    } else if (startHour >= 14 && startHour <= 20) {
      return "Tarda";
    }
    return "";
  };

  const period =
    pageType === "table"
      ? getPeriod(reservation.startTime)
      : `${reservation.startTime} - ${reservation.endTime}`;
  const isDeleteAction = actionType === "delete";
  const titleMessage = isDeleteAction
    ? "Eliminar reserva"
    : "Confirmar reserva";

    const spaceName = space === "office1" ? "Oficina 1" : space === "office2" ? "Oficina 2" : "Sala de reunions"

  return (
    <ContainerDialog>
      <Dialog open={open} onClose={onCancel}>
        <DialogContent>
          <DialogContentText>
            <TitleMessage>{titleMessage}</TitleMessage>
          </DialogContentText>
          <SubTitleMessage>
            {formatDate(reservation.startDate) === formatDate(reservation.endDate)
              ? formatDate(reservation.startDate) : `${formatDate(reservation.startDate)} - ${formatDate(reservation.endDate)}`}
            <LineSpan>|</LineSpan>
            {period}
          </SubTitleMessage>
          {table ? <H6>Espai reservat: {table.title}</H6> : null}
          {space ? <H6>Espai reservat: {spaceName}</H6> : null}
        </DialogContent>
        <DialogActions>
          <ButtonConfirm onClick={onConfirm}>
            {isDeleteAction ? button.deleteText : button.confirmText}
          </ButtonConfirm>
          <ButtonCancel onClick={onCancel}>{button.cancelText}</ButtonCancel>
        </DialogActions>
      </Dialog>
    </ContainerDialog>
  );
};

export default PopUpConfirmReserve;
