import { Link } from "react-router-dom";
import { ButtonPlacesFocus, ButtonPlaces } from "./ButtonStyled";

const PlacesButton = ({ text, link, focus }) => {
  console.log("Este es PlacesButton", {text}, {link}, {focus});
    return focus ? (
      <ButtonPlacesFocus >{text}</ButtonPlacesFocus>
    ) : (
      <Link to={link}>
        <ButtonPlaces >{text}</ButtonPlaces>
      </Link>
    );
  };

export default PlacesButton;