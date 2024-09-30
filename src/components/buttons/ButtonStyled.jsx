import styled from "styled-components";

export const ButtonConfirm = styled.button`
    color:var(--violet);
    padding:8px 23px 8px 23px;
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
    font-size:19px;
    cursor:pointer;
    margin-bottom:60px;
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

export const CircleButton = styled.button`
  background-color: ${({ color }) => color};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
  
    svg{
        color:white;
        font-size: 40px;
        padding: 3px;
        display: flex;
        &:hover {
            color:${({ color }) => color};
        }
    }
  &:hover {
    background-color: ${({ color }) => `${color}cc`};
  }

  &:active {
    background-color: ${({ color }) => `${color}99`};
  }
`;