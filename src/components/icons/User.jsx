import { BiUser } from 'react-icons/bi'
import { ContainerUser } from '../header/HeaderStyled'
import { NavLink } from 'react-router-dom'
import styled from "styled-components"

const Icons = styled.div`
    color: var(--lightviolet);
`;

const User = () => {
  return (
    <ContainerUser>
        <NavLink to="/inici-sessio">
        <Icons><BiUser/></Icons>
        </NavLink>
    </ContainerUser>
  )
}

export default User
