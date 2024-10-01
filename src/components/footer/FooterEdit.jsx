import { IconsContainer } from "../header/HeaderStyled";
import { BiCalendar, BiCalendarPlus } from "react-icons/bi";
import { BiPhoneCall } from "react-icons/bi";
import {  IconsContainerFocus, NavbarFooter } from "./FooterStyled";
import { Link } from "react-router-dom";

const FooterEdit = () => {
  return (
    <NavbarFooter>
      <IconsContainer>
        <Link to="/reservar-taula">
          <BiCalendarPlus />
        </Link>
      </IconsContainer>
        <Link to="/panell-usuari">
      <IconsContainerFocus>
          <BiCalendar />
      </IconsContainerFocus>
        </Link>
      <IconsContainer>
        <Link to="/contacte">
            
                <BiPhoneCall />
        </Link>
      </IconsContainer>
    </NavbarFooter>
  );
};

export default FooterEdit;
