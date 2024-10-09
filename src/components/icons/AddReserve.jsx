import { BiCalendarPlus } from 'react-icons/bi'
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

export const AddReserve = () => {
    return (
      <IconsContainer>
        <NavLink to="/reservar-taula">
          <Icons><BiCalendarPlus /></Icons>
        </NavLink>
      </IconsContainer>
    )
}

