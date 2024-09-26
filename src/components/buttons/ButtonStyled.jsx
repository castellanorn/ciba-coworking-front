
import styled from "styled-components";

export const ButtonConfirm = styled.button`
    color:var(--violet);
    padding:7px 23px 7px 23px;
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
    margin-bottom:50px;
        &:active{
            background-color: white;
            color:#F8A99C;
        }      
`;
export const ButtonPlaces = styled.button`
    width:100px;
    border:none;
    background-color:var(--salmon);
    padding: 8px;
    border-radius:4px;
    color:white;
    font-family: "Marianina XWd FY W03 Medium";
    font-size:15px;
    cursor:pointer;
`;
export const ButtonPlacesFocus = styled.button`
    width:100px;
    border:2px solid var(--salmon);
    background-color: white;
    padding: 8px;
    border-radius:4px;
    color:var(--salmon);
    font-family: "Marianina XWd FY W03 Medium";
    font-size:15px;
    cursor:pointer;
`;
export const ButtonFind = styled.button` 
    display:flex;
    justify-content:center;
    color:white;
    font-family: "Marianina XWd FY W03 Medium";
    font-size:25px;
    border:none;
    background-color:#945BBB;
    padding:7px 40px 7px 40px;
    border-radius:4px;
    cursor:pointer;
`;