import styled from "styled-components";

export const Select = styled.select`
    margin:30px;
    cursor:pointer;
    border: 2px solid var(--violet);
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
    margin-left:20px;
`;
export const RadioLabel = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 5px 0;
    font-size:16px;

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

        &:after {
            content: '';
            display: ${props => (props.selected ? 'block' : 'none')};
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: var(--violet);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
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