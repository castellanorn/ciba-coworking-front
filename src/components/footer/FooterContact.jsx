import { IconsContainer } from "../header/HeaderStyled";
import { BiCalendar, BiCalendarPlus } from "react-icons/bi";
import { BiPhoneCall } from "react-icons/bi";
import { IconsContainerFocusContact, NavbarFooter } from "./FooterStyled";
import { Link } from "react-router-dom";

const FooterContact = () => {
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
          <IconsContainerFocusContact>
            <BiPhoneCall />
          </IconsContainerFocusContact>
        </Link>
      </IconsContainer>
    </NavbarFooter>
  );
};

export default FooterContact;
