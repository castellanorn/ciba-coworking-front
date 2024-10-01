import styled from "styled-components";

export const NavbarFooter = styled.nav`
    z-index:999;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.2); 
    background-color: var(--white);

`;
export const IconsContainer = styled.div`
    display:flex;
    padding:5px 25px 5px 25px;
`;
export const IconsContainerFocus = styled.div`
    padding:7px;
    background-color:var(--violet);
    border-radius:50%;
    width:45px;
        svg {
        color: white; 
        font-size: 40px;
        
    }
`;
export const IconsContainerFocusContact = styled.div`
    margin-top:3px;
    padding:5px;
    background-color:var(--violet);
    border-radius:50%;
        svg {
        color: var(--white); 
        font-size: 30px;
    }
`;

