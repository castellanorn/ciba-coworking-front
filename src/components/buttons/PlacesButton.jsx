import { Link } from "react-router-dom";
import { ButtonPlacesFocus, ButtonPlaces } from "./ButtonStyled";

const PlacesButton = ({ text, onClick, focus }) => {
    return focus ? (
      <ButtonPlacesFocus onClick = {onClick}>{text}</ButtonPlacesFocus>
    ) : (
        <ButtonPlaces onClick = {onClick}>{text}</ButtonPlaces>
    );
  };

export default PlacesButton;