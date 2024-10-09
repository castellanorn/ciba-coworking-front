import React from "react";
import ConfirmButton from "../../buttons/ConfirmButton";
import {Container, BackgroundFill, ModalWindow, ErrorMessage, ButtonContainer} from "./ErrorModalStyled";

const ErrorModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <Container>
            <BackgroundFill onClick={onClose}/>
            <ModalWindow>
                <ErrorMessage>{message}</ErrorMessage>
                <ButtonContainer>
                    <ConfirmButton
                    type="button" 
                    onClick={onClose}>
                    Acceptar</ConfirmButton>
                    
                </ButtonContainer>
            </ModalWindow>
        </Container>
    );
};

export default ErrorModal;
