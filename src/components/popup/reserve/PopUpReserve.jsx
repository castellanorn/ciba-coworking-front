import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { ContainerDialog, H6, Line, SubTitleMessage, TitleMessage } from '../../titles/titleStyled';
import { ButtonCancel, ButtonConfirm } from '../../buttons/ButtonStyled';

const PopUpConfirmReserve = ({ open, onConfirm, onCancel,table }) => {
  return (
    <ContainerDialog>
        <Dialog open={open} onClose={onCancel}>
        <DialogContent>
            <DialogContentText>
            <TitleMessage>Confirmar reserva</TitleMessage>
            </DialogContentText>
            <SubTitleMessage>Matí<Line>|</Line> Setembre 26</SubTitleMessage>
            <H6>Espai reservat: Taula individual</H6>
            <H6>Taula: {table}</H6>
        </DialogContent>
        <DialogActions>
            <ButtonConfirm onClick={onConfirm}>Acceptar</ButtonConfirm>
            <ButtonCancel onClick={onCancel}>Cancel·lar</ButtonCancel>
        </DialogActions>
        </Dialog>
    </ContainerDialog>
  );
};

export default PopUpConfirmReserve;