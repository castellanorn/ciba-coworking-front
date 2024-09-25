import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthWrapper";

const PrivateRoute = ({ children, requiredRole }) => {
  const { authToken, userRole } = useContext(AuthContext);

  if (!authToken) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
