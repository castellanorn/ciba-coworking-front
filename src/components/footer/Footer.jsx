import { useState, useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";

import { NavbarFooter } from "./FooterStyled";
import IconFooter from "../icons/IconFooter";

const Footer = () => {
  const { authToken, userRole } = useContext(AuthContext);
  const [activeIcon, setActiveIcon] = useState("");

  const isAuthenticated = authToken !== null;
  const isSingleIcon = !isAuthenticated
  const userPanelPath = userRole === "admin" ? "/panell-administrador" : "/panell-usuari";

  return (
    <NavbarFooter $isSingleIcon={isSingleIcon}>
      {isAuthenticated && (
        <>
          <IconFooter
            link="/reserva-taula"
            icon="addreserve"
            activeIcon={activeIcon}
            setActiveIcon={setActiveIcon}
          />
          <IconFooter
            link={userPanelPath}
            icon="editreserve"
            activeIcon={activeIcon}
            setActiveIcon={setActiveIcon}
          />
        </>
      )}

      <IconFooter
        link="/contacte"
        icon="contact"
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
      />
    </NavbarFooter>
  );
};

export default Footer;

/* <IconFooter
        link='/reserva-taula'
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
      /> */
