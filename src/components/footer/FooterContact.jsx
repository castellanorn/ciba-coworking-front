import { IconsContainer } from "../header/HeaderStyled";
import { BiCalendar, BiCalendarPlus } from "react-icons/bi";
import { BiPhoneCall } from "react-icons/bi";
import { IconsContainerFocusContact, NavbarFooter } from "./FooterStyled";
import { NavLink } from "react-router-dom";
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

const FooterContact = () => {
  return (
    <NavbarFooter>
      <IconsContainer>
        <NavLink to="/reservar-taula">
          <Icons><BiCalendarPlus /></Icons>
        </NavLink>
      </IconsContainer>
      <IconsContainer>
        <NavLink to="/panell-usuari">
        <Icons><BiCalendar /></Icons>
        </NavLink>
      </IconsContainer>
      <IconsContainer>
        <NavLink to="/contacte">
          <IconsContainerFocusContact>
            <Icons><BiPhoneCall /></Icons>
          </IconsContainerFocusContact>
        </NavLink>
      </IconsContainer>
    </NavbarFooter>
  );
};

export default FooterContact;
