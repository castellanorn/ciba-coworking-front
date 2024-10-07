import { Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { ContainerDialog, H6, LineSpan, SubTitleMessage, TitleMessage } from "../PopUpStyled";
import { ButtonCancel, ButtonConfirm } from "../../buttons/ButtonStyled";

const PopUpConfirmReserve = ({ open, onConfirm, onCancel, table, pageType, slot, month, day, button, actionType }) => {
  let reservationType = '';
  let titleMessage = '';
  
  const isDeleteAction = actionType === 'delete';

  switch(pageType) {
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
  }

  return (
    <ContainerDialog>
      <Dialog open={open} onClose={onCancel}>
        <DialogContent>
          <DialogContentText>
            <TitleMessage>{titleMessage}</TitleMessage>
          </DialogContentText>
          <SubTitleMessage>{slot}<LineSpan>|</LineSpan>{month} {day}</SubTitleMessage>
          <H6>Espai reservat: {reservationType}</H6>
          {table && <H6>Taula: {table}</H6>}
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