import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthWrapper";

const PrivateRoute = ({ children }) => {
    const { authToken } = useContext(AuthContext);
    return authToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;