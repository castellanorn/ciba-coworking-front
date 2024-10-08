import styled from "styled-components";

export const Select = styled.select`

    margin:30px;
    cursor:pointer;
    border: 2px solid var(--violet);
    border-radius:4px;
    padding: 9px;
    font-family: "Marianina XWd FY W03 Medium";
`;
export const Option = styled.option`
  cursor: pointer;
`;
export const LabelOption = styled.label`
  cursor: pointer;
  font-size: 16px;
`;
export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 5px 0;

  input {
    display: none; 
  }

  .custom-radio {
    width: 20px;
    height: 20px;
    border: 2px solid var(--violet);
    border-radius: 50%;
    margin-right: 10px;
    position: relative;
    transition: background-color 0.3s ease;

    
    &::after {
      content: "";
      width: 12px;
      height: 12px;
      background-color: var(--violet);
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0; 
      transition: opacity 0.3s ease;
    }
  }
  input:checked + .custom-radio::after {
    opacity: 1; 
  }
    .custom-checkbox{
      width: 20px;
      height: 20px;
      background-color: var(--violet);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0; 
      transition: opacity 0.3s ease;
    }
    input:checked + .custom-checkbox::after {
        opacity: 1;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  padding-left: 10px
`;

export const FieldLabel = styled.label`
  color: var(--black);
  font-family: "Marianina XWd FY W03 Medium";
  font-weight: regular;
  font-size: 20px;
    padding-bottom: 5px;
`;

export const FieldInput = styled.input`
  box-sizing: border-box;
  border: 2px solid var(--violet);
  border-radius: 5px;
  background-color: white;
  width: 18.5rem;
  height: 3.125rem;
  font-size: 1.125rem;
  padding: 0.5rem;


  &::placeholder {
    color: var(--grey)
    opacity: 1;
    font-family: "Marianina XWd FY W03 Medium";
  font-weight: regular;
  font-size: 18px;
  }

  &:focus {
    border-color: var(--violet);
    outline: none;
  }
`;

export const FieldInvalidInput = styled.p`
font-family: "Marianina FY Italic";
  font-weight: medium;
  font-size: 20px;
  color: var(--red);
  margin-bottom: 0px;
  margin-top: 8px;
`;
export const Label = styled.div`
    margin: 8px 25px 30px 25px;
    cursor: pointer;
    border: 2px solid var(--violet);
    border-radius: 4px;
    padding: 15px;
    font-family: "Marianina XWd FY W03 Medium";
    font-size: 18px;
`;
