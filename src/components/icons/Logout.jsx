import { BiLogOutCircle } from "react-icons/bi";
import { IconsContainer } from "../header/HeaderStyled";

const Logout = ({onClick}) => {
  return (
    <IconsContainer onClick = {onClick}>
      <BiLogOutCircle />
    </IconsContainer>
  );
};

export default Logout;
