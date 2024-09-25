import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { ButtonConfirm } from '../../buttons/ButtonStyled';
import { ContainerTitleMessage, TitleMessageConfirm } from '../../title/TitleStyled';

const PopUpSuccess = ({ open, onClose, title, imageSrc, buttonText }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>
          <ContainerTitleMessage>
            <span><img src={imageSrc} alt="confirmation-icon" /></span>
            <TitleMessageConfirm>{title}</TitleMessageConfirm>
          </ContainerTitleMessage>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonConfirm onClick={onClose}>{buttonText}</ButtonConfirm>
      </DialogActions>
    </Dialog>
  );
};

export default PopUpSuccess;