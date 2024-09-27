import { BiCalendar, BiCalendarPlus, BiPhoneCall } from "react-icons/bi";
import { NavbarFooter, IconsContainer, IconsContainerFocus, IconsContainerFocusContact } from "./FooterStyled";
import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  // Estado para manejar qué icono está activo
  const [activeIcon, setActiveIcon] = useState("");

  return (
    <NavbarFooter>
      {/* Ícono 1 - Calendar Plus */}
      <IconsContainer>
        <button
          onClick={() => setActiveIcon("calendarPlus")} // Cambia el estado al hacer clic
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {activeIcon === "calendarPlus" ? (
            <IconsContainerFocus>
              <Link to="/reservar-taula">
                <BiCalendarPlus />
              </Link>
            </IconsContainerFocus>
          ) : (
            <BiCalendarPlus size={40} />
          )}
        </button>
      </IconsContainer>

      {/* Ícono 2 - Calendar */}
      <IconsContainer>
        <button
          onClick={() => setActiveIcon("calendar")} // Cambia el estado al hacer clic
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {activeIcon === "calendar" ? (
            <IconsContainerFocus>
              <Link to="/panell-usuari">
                <BiCalendar />
              </Link>
            </IconsContainerFocus>
          ) : (
            <BiCalendar size={40} />
          )}
        </button>
      </IconsContainer>

      {/* Ícono 3 - Phone Call */}
      <IconsContainer>
        <button
          onClick={() => setActiveIcon("phone")} // Cambia el estado al hacer clic
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {activeIcon === "phone" ? (
            <IconsContainerFocusContact>
              <Link to="/contacte">
                <BiPhoneCall />
              </Link>
            </IconsContainerFocusContact>
          ) : (
            <BiPhoneCall size={30} />
          )}
        </button>
      </IconsContainer>
    </NavbarFooter>
  );
};

export default Footer;