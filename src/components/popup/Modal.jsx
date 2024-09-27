import { CloseButton, ModalBackground, ModalContainer } from "./reserve/ModalStyled";

const Modal = ({ open, onClose, children }) => {
    if (!open) return null;
  
    return (
      <ModalBackground onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          {children}
        </ModalContainer>
      </ModalBackground>
    );
  };
  
  export default Modal;