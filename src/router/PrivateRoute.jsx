import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

const PrivateRoute = ({ children, requiredRole }) => {
  const { authToken, userRole } = useContext(AuthContext);

  if (!authToken) {
    console.log("No hay token");
    return <Navigate to="/inici-sessio" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    console.log(userRole, requiredRole);
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
