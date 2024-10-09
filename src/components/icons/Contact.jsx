import { BiPhoneCall } from 'react-icons/bi'
import { IconsContainer } from '../header/HeaderStyled'
import { NavLink } from 'react-router-dom'
import styled from "styled-components"

const Icons = styled.div`
  color: var(--violet);
  background-color: var(--white);

&:active {
  background-color: var(--violet);
  color: var(--white);
  border-radius: 50%;
}
`;

const Contact = () => {
    return (
<IconsContainer>
<NavLink to="/contacte">
    <Icons><BiPhoneCall /></Icons>
</NavLink>
</IconsContainer>
    )
}

export default Contact