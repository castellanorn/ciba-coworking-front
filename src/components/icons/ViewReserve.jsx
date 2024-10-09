import { BiCalendar } from 'react-icons/bi'
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

const ViewReserve = () => {
    return (
<IconsContainer>
<NavLink to="/panell-usuari">
<Icons><BiCalendar /></Icons>
</NavLink>
</IconsContainer>
    )
}
export default ViewReserve