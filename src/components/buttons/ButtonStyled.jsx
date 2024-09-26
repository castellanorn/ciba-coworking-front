
import styled from "styled-components";

export const ButtonConfirm = styled.button`
    color:#532D6D;
    padding:7px 23px 7px 23px;
    border-radius:3px;
    border: 3px solid #532D6D;
    font-family: "Marianina XWd FY W03 Medium";
    font-weight:bold;
    font-size:18px;
    cursor:pointer;
    margin-bottom:60px;
    background-color:white;
        &:active{
                background-color: #532D6D;
                color:white;
            }
`;
export const ButtonCancel = styled.button`
    color:white;
    padding:9px 25px 9px 25px;
    border-radius:3px;
    background-color: #FF7962;
    font-family: "Marianina XWd FY W03 Medium";
    font-weight:bold;
    border:none;
    font-size:18px;
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
    background-color:#FF7962;
    padding: 8px;
    border-radius:4px;
    color:white;
    font-family: "Marianina XWd FY W03 Medium";
    font-size:12px;
    cursor:pointer;
`;
export const ButtonPlacesFocus = styled.button`
    width:100px;
    border:2px solid #FF7962;
    background-color: white;
    padding: 8px;
    border-radius:4px;
    color:#FF7962;
    font-family: "Marianina XWd FY W03 Medium";
    font-size:12px;
    cursor:pointer;
`;
export const ButtonFind = styled.button` 
    display:flex;
    justify-content:center;
    color:white;
    font-family: "Marianina FY Black";
    font-size:16px;
    border:none;
    background-color:#945BBB;
    padding: 9px;
    border-radius:4px;
    padding: 8px;
    width:100px;
    cursor:pointer;
`;