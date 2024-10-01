import styled from "styled-components";

export const ConfirmButtonPopUp = styled.button`
    color:var(--violet);
    padding:7px 33px 7px 33px;
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

export const ButtonConfirm = styled.button`
    color:var(--violet);
    padding:7px 33px 7px 33px;
    border-radius:3px;
    border: 3px solid var(--violet);
    font-family: "Marianina XWd FY W03 Medium";
    font-weight:bold;
    font-size:20px;
    cursor:pointer;
    margin-bottom:60px;
    background-color:white;
        &:active{
                background-color: var(--violet);
                color:white;
            }
`;
export const ButtonCancel = styled.button`
    color:white;
    padding:11px 27px 11px 27px;
    border-radius:3px;
    background-color: var(--salmon);
    font-family: "Marianina XWd FY W03 Medium";
    font-weight:bold;
    border:none;
    font-size:20px;
    cursor:pointer;
    margin-bottom:60px;
        &:active{
            background-color: white;
            color:#F8A99C;
        }      
`;