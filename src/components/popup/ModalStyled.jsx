import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
`;
