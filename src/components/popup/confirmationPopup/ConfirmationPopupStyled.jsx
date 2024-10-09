import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Marianina FY Black", sans-serif;
  font-size: 25px;
  color: var(--violet);
  background-color:var(--white);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 300px;
  width: 60%;
`;

export const ConfirmSubtitle = styled.div`
  font-size: 1.8rem;
  margin-top: 0.5rem;
  margin-bottom: 2.5rem;
`;
