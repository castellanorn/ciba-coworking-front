import { IconsContainer } from "../header/HeaderStyled";
import { BiCalendar, BiCalendarPlus } from "react-icons/bi";
import { BiPhoneCall } from "react-icons/bi";
import { NavbarFooter } from "./FooterStyled";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <NavbarFooter>
      <IconsContainer>
        <Link to="/reservar-taula">
          <BiCalendarPlus />
        </Link>
      </IconsContainer>
      <IconsContainer>
        <Link to="/panell-usuari">
          <BiCalendar />
        </Link>
      </IconsContainer>
      <IconsContainer>
        <Link to="/contacte">
          <BiPhoneCall />
        </Link>
      </IconsContainer>
    </NavbarFooter>
  );
};

export default Footer;
