import styled from "styled-components";

export const ParagraphStyled = styled.p`
    width: 85%;
    text-align: center;
    font-size: 2.5rem;
    margin: auto;
    margin-top: 2rem;
    color: ${({ color }) => color}; /* El color se aplica dinámicamente */
`;