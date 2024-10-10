import React from 'react';
import { ParagraphStyled } from './ParagraphStyled';

const Paragraph = ({ text, color = 'black' }) => {
    return (
        <>
            <ParagraphStyled color={color}>
                {text}
            </ParagraphStyled>
        </>
    );
}

export default Paragraph;
