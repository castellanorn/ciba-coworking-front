import { LogoContainer } from "../header/HeaderStyled"
import logo from '../../assets/logo-coworking.png'
import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <LogoContainer>
            <Link to="/"><img src={logo} alt="Logo" /></Link>
    </LogoContainer>
        
  )
}

export default Logo
