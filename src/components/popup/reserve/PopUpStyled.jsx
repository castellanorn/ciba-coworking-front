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

export const ConfirmButtonPopUpLittle = styled.button`
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
export const TitleMessage = styled.span`
    font-family: "Marianina FY Black";
    color:var(--salmon);
    font-size:27px;
    display: flex;
    justify-content: center;
`;
export const TitleMessageConfirm = styled.span`
    font-family: "Marianina XWd FY W03 Medium";
    color:#464652;
    font-size:20px;
`
export const SubTitleMessage = styled.span`
    font-family: "Marianina FY Bold";
    color:var(--violet);
    font-size:21px;
    display: flex;
    justify-content: center;
    margin-top:20px;
`;

export const LineSpan = styled.span`
    font-family: "Marianina FY Bold";
    color:var(--salmon);
    font-size:20px;
    margin-left:10px;
    margin-right:20px;
`;

export const ContainerDialog = styled.div` 
    display:flex;
    justify-content:center;
`
export const H6 = styled.h6` 
    font-family: "Marianina XWd FY W03 Medium";
    font-size:16px;
    color:#656565;
    margin:20px 0;
`;