import styled from "styled-components";

export const ConfirmButtonPopUp = styled.button`
    color:var(--violet);
    padding:7px 23px 7px 23px;
    border-radius:3px;
    border: 3px solid var(--violet);
    font-family: "Marianina XWd FY W03 Medium";
    font-weight:bold;
    font-size:18px;
    cursor:pointer;
    margin-bottom:20px;
    background-color:white;
        &:active{
                background-color: var(--violet);
                color:white;
            }
`;