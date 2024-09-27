import styled from "styled-components";

export const Select = styled.select`
  margin: 30px;
  cursor: pointer;
  border: 2px solid #532d6d;
  border-radius: 4px;
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
    border: 2px solid #532d6d;
    border-radius: 50%;
    margin-right: 10px;
    position: relative;

    &:after {
      content: "";
      display: ${(props) => (props.selected ? "block" : "none")};
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: #532d6d;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
    padding-left: 35px
`;

export const FieldLabel = styled.label`
  color: var(--black);
  font-family: "Marianina XWd FY W03 Medium";
  font-weight: regular;
  font-size: 20px;
`;

export const FieldInput = styled.input`
  border: 2px solid var(--violet);
  border-radius: 5px;
  background-color: white;
  width: 295px;
  height: 50px;


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
  font-weight: 600;
  font-size: 20px;
  color: var(--salmon);
`;
