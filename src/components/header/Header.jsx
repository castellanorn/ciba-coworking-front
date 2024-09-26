import {  Navbar } from './HeaderStyled'
import Logo from "../icons/Logo";
import User from '../icons/User';

const Header = () => {
  return (
    <Navbar>
        <Logo/>
        <User/>
    </Navbar>
  )
}

export default Header;
