import styled from "styled-components";

export const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  padding-left: 10px;
`;

export const PasswordRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export const ButtonPassword = styled.button`
  border: 3px solid var(--ligthViolet);
  border-radius: 5px;
  background-color: white;
  height: 39px;
  font-size: 15px;
  color: var(--ligthViolet);
  opacity: 1;
  font-family: "Marianina XWd FY W03 Medium";
  font-weight: bold;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;

  &:focus {
    border-color: var(--ligthViolet);
    outline: none;
  }
`;

export const PasswordDisplay = styled.span`
  font-size: 20px;
  color: #ff5722;
  align-items: center;
  margin-bottom: 0px;
`;

export const LabelPassword = styled.label`
  color: var(--black);
  font-family: "Marianina XWd FY W03 Medium";
  font-weight: regular;
  font-size: 20px;
  margin-bottom: 10px;
`;