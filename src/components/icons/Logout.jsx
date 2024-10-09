/* import { BiLogOutCircle } from "react-icons/bi"; */
import { BiLogInCircle } from "react-icons/bi";
import { IconsContainer } from "../header/HeaderStyled";
import styled  from "styled-components";
import { NavLink } from "react-router-dom";

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--salmon);
  `;

const Logout = () => {
  return (
    <IconsContainer>
{/*       <BiLogOutCircle /> */}
      <NavLink to="/inici-sessio">
      <Icons><BiLogInCircle /></Icons>
      </NavLink> 
    </IconsContainer>
  );
};

export default Logout;
