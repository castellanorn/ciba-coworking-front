import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const Input = styled.input`
  margin: 8px 25px 30px 25px;
  cursor: pointer;
  border: 2px solid #532d6d;
  border-radius: 4px;
  padding: 15px;
  font-family: "Marianina XWd FY W03 Medium";
  font-size: 18px;
`;
export const LoginInput = styled.input`
  margin: 8px 24px 30px 24px;
  cursor: pointer;
  border: 2px solid #532d6d;
  border-radius: 4px;
  padding: 15px;
  font-family: "Marianina XWd FY W03 Medium";
  width: 100%;
  box-sizing: border-box;
  font-size: 18px;

`;
export const Label = styled.label`
  margin-left: 25px;
  cursor: pointer;
  font-family: "Marianina XWd FY W03 Medium";
  font-size: 20px;
`;
export const Span = styled.span`
  margin-top: 30px;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;
export const EyeIcon = styled.span`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-73%);
  cursor: pointer;
  font-size: 24px;
  color: #532D6D;
`;
