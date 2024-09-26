
import CancelButton from "../../buttons/CancelButton";
import { ContainerTitleMessage, TitleMessage } from "../../title/TitleStyled";
import Modal from "../Modal";
import { ConfirmButtonPopUp } from "../PopUpStyled";

const PopUpConfirmReserve = ({ open, onClose, pageType, onAccept }) => {
  const renderContent = () => {
    if (pageType === "office") {
      return (
        <>
        <ContainerTitleMessage>
            <TitleMessage>Confirmar reserva</TitleMessage>
        </ContainerTitleMessage>
          <p>¿Vols reservar el despatx?</p>
        </>
      );
    } else if (pageType === "table") {
      return (
        <>
          <h2>Confirmar reserva</h2>
          <p>¿Vols reservar una taula individual?</p>
        </>
      );
    } else if (pageType === "meetingRoom") {
      return (
        <>
          <h2>Confirmar reserva</h2>
          <p>¿Vols reservar una sala de reunions?</p>
        </>
      );
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      {renderContent()}
      <ConfirmButtonPopUp onClick={onAccept}>Acceptar</ConfirmButtonPopUp>
      <CancelButton onClick={onClose}>Cancel·lar</CancelButton>
    </Modal>
  );
};

export default PopUpConfirmReserve;