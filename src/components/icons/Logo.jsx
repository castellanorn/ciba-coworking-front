import { LogoContainer } from "../header/HeaderStyled"
import logo from '../../assets/logo-coworking.png'

const Logo = () => {
  return (
    <LogoContainer>
            <img src={logo} alt="Logo" />
    </LogoContainer>
        
  )
}

export default Logo
