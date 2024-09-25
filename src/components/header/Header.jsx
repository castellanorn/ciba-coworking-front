import logo from '../../assets/logo-coworking.png'
import { BiUser } from "react-icons/bi";
import { IconsContainer, LogoContainer, Navbar } from './HeaderStyled'

const HeaderMobile = () => {
  return (
    <Navbar>
        <LogoContainer>
            <img src={logo} alt="Logo" />
        </LogoContainer>
        <IconsContainer>
            <BiUser/>
        </IconsContainer>
    </Navbar>
  )
}

export default HeaderMobile;
