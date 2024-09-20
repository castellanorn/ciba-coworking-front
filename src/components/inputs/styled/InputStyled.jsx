import styled from "styled-components";

export const Select = styled.select`
    margin-bottom:20px;
    cursor:pointer;
    border: 2px solid #532D6D;
    border-radius:4px;
    padding: 9px;
    font-family: "Marianina XWd FY W03 Medium"
`;
export const Option = styled.option`
    cursor:pointer;
`;
export const LabelOption = styled.label`
    cursor:pointer;
    font-size:16px;
`;
export const RadioGroup = styled.div`
display: flex;
flex-direction: column;
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
        border: 2px solid #532D6D;
        border-radius: 50%;
        margin-right: 10px;
        position: relative;

        &:after {
            content: '';
            display: ${props => (props.selected ? 'block' : 'none')};
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: #532D6D;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
`;
