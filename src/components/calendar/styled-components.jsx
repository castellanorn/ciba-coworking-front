import styled from "styled-components";

export const DivReserve = styled.div` 
    display:flex;
    justify-content:center;
    flex-direction:column;
`

export const Div = styled.div`
    display:flex;
`;

//popup
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
export const TitleMessage = styled.span`
    font-family: "Marianina FY Black";
    color:#FF7962;
    font-size:24px;
`;
export const H2 = styled.h2`
    font-weight:bold;
    display:flex;
    justify-content:center
`;
export const Hr = styled.hr`
    color: #532D6D;
    width:270px;
    border-top: 2px solid #532D6D;
`;
export const ButtonsContainer = styled.div`
    display:flex;
    justify-content:center;
    gap:8px;
    margin-top:20px;
    margin-bottom:20px;
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
export const H3 = styled.h3` 
    font-family: "Marianina FY Black";
    font-size:25px;

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
export const Hr2 = styled.hr`
    margin-top: 20px;
    width:270px;
`;
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

