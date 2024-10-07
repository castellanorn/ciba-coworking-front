import { Navbar } from "./HeaderStyled";
import Logo from '../icons/Logo';
import Logout from '../icons/Logout';

const HeaderLogout = () => {
return (
    <Navbar>
        <Logo/>
        <Logout/>
    </Navbar>
)
}

export default HeaderLogout;