import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('authToken');
        const storedRole = localStorage.getItem('userRole');

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedToken) setAuthToken(storedToken);
        if (storedRole) setUserRole(storedRole);
        setLoading(false); 
    }, []);

    const login = (userData, token) => {
        const updatedUserData = {
            ...userData,
            id: userData.id
        };

        setUser(updatedUserData);
        setAuthToken(token);
        setUserRole(userData.role.toLowerCase());

        localStorage.setItem('user', JSON.stringify(updatedUserData));
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', userData.role.toLowerCase());
    };

    const logout = () => {
        setUser(null);
        setAuthToken(null);
        setUserRole(null);

        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <AuthContext.Provider value={{ user, authToken, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
