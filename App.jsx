import { useState } from "react";
import HeaderMobile from "./src/components/header/Header";
import HeaderLogin from "./src/components/header/HeaderLogin";

const App = () => {
    // cambio de icono login a logout
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true); // Simula que el usuario se ha logueado
      };
    
      const handleLogout = () => {
        setIsLoggedIn(false); // Simula que el usuario ha cerrado sesión
      };
  return (
    <div>
       {isLoggedIn ? <HeaderLogin /> : <HeaderMobile />}

      {isLoggedIn ? (
        <button onClick={handleLogout}>Cerrar sesión</button>
      ) : (
        <button onClick={handleLogin}>Iniciar sesión</button>
      )}
      
    </div>
  )
}

export default App;
