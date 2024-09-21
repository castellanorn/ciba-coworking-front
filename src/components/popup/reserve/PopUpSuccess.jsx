import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { ContainerTitleMessage, TitleMessage, TitleMessageConfirm } from '../../titles/titleStyled';
import { ButtonConfirm } from '../../buttons/ButtonStyled';
import Confirm from '../../../assets/confirm.png'

const PopUpSuccess = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>
            <ContainerTitleMessage>
                <TitleMessageConfirm>Reserva confirmada<img src={Confirm}></img></TitleMessageConfirm>
            </ContainerTitleMessage>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonConfirm onClick={onClose}>Aceptar</ButtonConfirm>
      </DialogActions>
    </Dialog>
  );
};

export default PopUpSuccess;