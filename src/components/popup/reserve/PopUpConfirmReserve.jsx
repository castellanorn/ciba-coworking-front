import { Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { ContainerDialog, H6, LineSpan, SubTitleMessage, TitleMessage } from "./PopUpStyled";
import { ButtonCancel, ButtonConfirm } from "../../buttons/ButtonStyled";

const PopUpConfirmReserve = ({ open, onConfirm, onCancel, space, table, pageType, button, actionType, reservation }) => {
  let reservationType = '';
  let titleMessage = '';
  if (!reservation) return null;
  
  const isDeleteAction = actionType === 'delete';
/*   const {
    startDate = "N/A",
    endDate = "N/A",
    startTime = "N/A",
    endTime = "N/A"
  } = reservation;   */
  /* switch(pageType) {
    case 'office':
      reservationType = 'Oficina privada';
      titleMessage = isDeleteAction ? 'Eliminar reserva oficina' : 'Confirmar reserva oficina';
      break;
    case 'table':
      reservationType = 'Taula individual';
      titleMessage = isDeleteAction ? 'Eliminar reserva taula' : 'Confirmar reserva taula';
      break;
    case 'meetingRoom':
      reservationType = 'Sala de reunions';
      titleMessage = isDeleteAction ? 'Eliminar reserva sala' : 'Confirmar reserva sala';
      break;
    default:
      reservationType = 'Reserva';
      titleMessage = isDeleteAction ? 'Eliminar reserva' : 'Confirmar reserva';
  } */

  return (
    <ContainerDialog>
      <Dialog open={open} onClose={onCancel}>
        <DialogContent>
          <DialogContentText>
            <TitleMessage>{isDeleteAction ? 'Eliminar reserva' : 'Confirmar reserva'}</TitleMessage>
          </DialogContentText>
          <SubTitleMessage>{reservation.startDate} - {reservation.endDate} <LineSpan>|</LineSpan> {reservation.startTime} - {reservation.endTime}</SubTitleMessage>
          {table ? (<H6>Espai reservat: {table.title}</H6>) : (<></>)}
          {space ? (<H6>Espai reservat: {space.title}</H6>) : (<></>)} {/* //cambiar el nombre de atributo de space */}
        </DialogContent>
        <DialogActions>
          <ButtonConfirm onClick={onConfirm}>{isDeleteAction ? button.deleteText : button.confirmText}</ButtonConfirm>
          <ButtonCancel onClick={onCancel}>{button.cancelText}</ButtonCancel>
        </DialogActions>
      </Dialog>
    </ContainerDialog>
  );
};

export default PopUpConfirmReserve;