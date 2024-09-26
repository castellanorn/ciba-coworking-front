import { IconsContainer } from "../header/HeaderStyled";
import { BiCalendarPlus } from "react-icons/bi";
import { BiCalendarEdit } from "react-icons/bi";
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
          <BiCalendarEdit />
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
