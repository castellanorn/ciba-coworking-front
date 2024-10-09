import styled from "styled-components";

export const NavbarFooter = styled.nav`
    z-index: 999;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: ${({ $isSingleIcon }) => ($isSingleIcon ? "flex-end" : "space-around")};
    padding: 1rem;
    box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.2); 
    background-color: var(--white);
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

