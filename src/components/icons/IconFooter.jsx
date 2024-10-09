import { NavLink } from "react-router-dom";
import { IconsContainer, IconsContainerFocus } from "./IconFooterStyled";
import { BiCalendar, BiCalendarPlus, BiPhoneCall } from "react-icons/bi"; 

const IconFooter = ({ link, icon }) => {
  const renderIcon = () => {
    switch (icon) {
      case "addreserve":
        return <BiCalendarPlus />;
      case "editreserve":
        return <BiCalendar />;
      case "contact":
        return <BiPhoneCall />;
      default:
        return null;
    }
  };

  return (
    <IconsContainer>
      <NavLink
        to={link}
        style={{ background: "none", border: "none", cursor: "pointer" }}
        className={({ isActive }) => (isActive ? "active" : "")} 
      >
        {({ isActive }) => (
          isActive ? (
            <IconsContainerFocus>
              {renderIcon()}
            </IconsContainerFocus>
          ) : (
            renderIcon()
          )
        )}
      </NavLink>
    </IconsContainer>
  );
};

export default IconFooter;
