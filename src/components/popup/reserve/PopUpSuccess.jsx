import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

import ImageSrc from '../../../assets/confirm-big.png';
import { ButtonConfirm } from '../../buttons/ButtonStyled';
import { ContainerTitleMessage } from '../../title/TitleStyled';
import { TitleMessageConfirm } from '../PopUpStyled';

const PopUpSuccess = ({ open, onClose}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>
          <ContainerTitleMessage>
            <span><img src={ImageSrc} alt="confirmation-icon" /></span>
            <TitleMessageConfirm>Reserva confirmada</TitleMessageConfirm>
          </ContainerTitleMessage>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonConfirm onClick={onClose}>Acceptar</ButtonConfirm> 
      </DialogActions>
    </Dialog>
  );
};

export default PopUpSuccess;