import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";

import {  Navbar } from './HeaderStyled'
import Logo from "../icons/Logo";
import User from '../icons/User';
import Logout from '../icons/Logout';

const Header = () => {

  const { authToken, logout } = useContext(AuthContext);
  const isAuthenticated = authToken !== null;

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/inici-sessio');
  }

  return (
    <Navbar>
        <Logo/>
        {isAuthenticated && (
          <>
            <Logout onClick = {handleLogout}/>
          </>
        )}
        {!isAuthenticated && (
          <>
            <User/>
          </>
        )}
        
        
    </Navbar>
  )
}

export default Header;
