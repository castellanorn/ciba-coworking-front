import ImageSrc from "../../../assets/confirm-big.png";
import ConfirmButton from "../../buttons/ConfirmButton";
import { ConfirmationContainer, ConfirmSubtitle, ModalOverlay } from "./ConfirmationPoputStyled";

const ConfirmationPopup = ({ open, onClose, subtitleConfirm }) => {
  if (!open) return null;

  return (
    <ModalOverlay >
      <ConfirmationContainer onClick={(e) => e.stopPropagation()}>
        <span>
          <img src={ImageSrc} alt="confirmation-icon" />
        </span>
        <ConfirmSubtitle>{subtitleConfirm}</ConfirmSubtitle>
        <ConfirmButton type="button" onClick={onClose}>Aceptar</ConfirmButton>
      </ConfirmationContainer>
    </ModalOverlay>
  );
};

export default ConfirmationPopup;
