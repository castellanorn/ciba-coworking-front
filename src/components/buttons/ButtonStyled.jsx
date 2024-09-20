
import styled from "styled-components";

export const ButtonConfirm = styled.button`
    color:#532D6D;
    padding:10px 50px 10px 50px;
    border-radius:3px;
    border: 2px solid #532D6D;
    font-family: "Marianina FY Black";
    font-size:16px;
    cursor:pointer;
    background-color:white;
    width:70px;
    margin-top:40px;
    margin-bottom:40px;
    display:flex;
    justify-content:center;
        &:active{
                background-color: #532D6D;
                color:white;
            }
    
`;
export const ButtonCancel = styled.button`
    color:white;
    background-color: #FF7962;
    padding:10px 50px 10px 50px;
    border-radius:3px;
    border:none;
    font-family: "Marianina FY Black";
    font-size:16px;

    cursor:pointer;

        &:focus{
            background-color: #F8A99C;
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