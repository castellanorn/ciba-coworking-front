import { useState } from 'react';
import { Navbar } from './HeaderStyled';
import Logo from "../icons/Logo";
import User from '../icons/User';
import Logout from '../icons/Logout';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleIconClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <Navbar>
      <Logo />
      {isLoggedIn ? <Logout onClick={handleIconClick} /> : <User onClick={handleIconClick} />}
    </Navbar>
  );
};

export default Header;