import { Link } from "react-router-dom";
import { IconsContainer, IconsContainerFocus } from "../footer/FooterStyled";
import { BiCalendar, BiCalendarPlus, BiPhoneCall } from "react-icons/bi"; 

const IconFooter = ({ link, icon, activeIcon, setActiveIcon }) => {
  const renderIcon = () => {
    switch (icon) {
      case "addreserve":
        return activeIcon === icon ? <BiCalendarPlus /> : <BiCalendarPlus />;
      case "editreserve":
        return activeIcon === icon ? <BiCalendar /> : <BiCalendar />;
      case "contact":
        return activeIcon === icon ? <BiPhoneCall /> : <BiPhoneCall />;
      default:
        return null;
    }
  };

  return (
    <IconsContainer>
      <Link to={link} onClick={() => setActiveIcon(icon)}>
        <button
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {activeIcon === icon ? (
            <IconsContainerFocus>
              {renderIcon()}
            </IconsContainerFocus>
          ) : (
            renderIcon()
          )}
        </button>
      </Link>
    </IconsContainer>
  );
};

export default IconFooter;