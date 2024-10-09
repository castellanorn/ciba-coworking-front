import styled from "styled-components";

export const Container = styled.div `
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
`
export const BackgroundFill = styled.div `
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`
export const ModalWindow = styled.div ` 
    background-color: var(--white);
    border-radius: 0.313rem;
    width: 18em;
    padding: 1rem; 
    z-index: 10;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`

export const ErrorMessage = styled.p `
    color: var(--salmon);
    font-family: 'Jaldi', sans-serif;
    font-size: 1.5rem; 
    margin-bottom: 1.5rem; 
    text-align: center;
`
export const ButtonContainer = styled.div `
    display: flex;
    justify-content: center;
    margin-bottom: -1.8rem;
`