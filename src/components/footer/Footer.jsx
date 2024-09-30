import { NavbarFooter } from "./FooterStyled";
import IconFooter from "../icons/IconFooter";
import { useState } from "react";

const Footer = () => {
  const [activeIcon, setActiveIcon] = useState(""); 
  

  return (
    <NavbarFooter>
      <IconFooter
        link='/reservar-taula'
        icon="addreserve"
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
      />
      <IconFooter
        link='/panell-usuari'
        icon="editreserve"
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
      />
      <IconFooter
        link='/contacte'
        icon="contact"
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
      />
    </NavbarFooter>
  );
};

export default Footer;