import logo from '../../assets/logo-coworking.png'
import { BiLogOutCircle } from "react-icons/bi";
import { IconsContainer, LogoContainer, Navbar } from "./HeaderStyled";

const HeaderLogin = () => {
return (
    <Navbar>
        <LogoContainer>
            <img src={logo} alt="Logo" />
        </LogoContainer>
        <IconsContainer>
            <BiLogOutCircle />
        </IconsContainer>
    </Navbar>
)
}

export default HeaderLogin;