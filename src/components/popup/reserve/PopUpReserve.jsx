import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { ContainerDialog, H6, LineSpan, SubTitleMessage, TitleMessage } from '../../title/TitleStyled';
import { ButtonCancel, ButtonConfirm } from '../../buttons/ButtonStyled';


const PopUpConfirmReserve = ({ open, onConfirm, onCancel, table, title, subtitle, timeSlot, spaceType, confirmText, cancelText }) => {
  return (
    <ContainerDialog>
      <Dialog open={open} onClose={onCancel}>
        <DialogContent>
          <DialogContentText>
            <TitleMessage>{title}</TitleMessage>
          </DialogContentText>
          <SubTitleMessage>{timeSlot}<LineSpan>|</LineSpan>{subtitle}</SubTitleMessage>
          <H6>{spaceType}</H6>
          <H6>Taula: {table}</H6>
        </DialogContent>
        <DialogActions>
          <ButtonConfirm onClick={onConfirm}>{confirmText}</ButtonConfirm>
          <ButtonCancel onClick={onCancel}>{cancelText}</ButtonCancel>
        </DialogActions>
      </Dialog>
    </ContainerDialog>
  );
};

export default PopUpConfirmReserve;