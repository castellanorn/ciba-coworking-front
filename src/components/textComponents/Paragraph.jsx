import React from 'react'
import { ParagraphStyled } from './ParagraphStyled'

const Paragraph = ({text}) => {
    return (
    <>
        <ParagraphStyled>
            {text}
        </ParagraphStyled>
    </>
    )
}

export default Paragraph