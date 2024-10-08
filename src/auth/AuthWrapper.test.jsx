import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider, AuthContext } from "./AuthWrapper"; // Ajusta la ruta según tu estructura de archivos
import userEvent from "@testing-library/user-event";

// Componente de prueba que usa el contexto
const TestComponent = () => {
    const { user, authToken, login, logout } = React.useContext(AuthContext);

    return (
        <div>
            <h1>User: {user ? user.name : "No user logged in"}</h1>
            <h2>Token: {authToken || "No token"}</h2>
            <button onClick={() => login({ name: "John Doe", id: 1 }, "test-token")}>
                Login
            </button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

describe("AuthProvider", () => {
    beforeEach(() => {
        localStorage.clear(); // Asegúrate de que localStorage esté limpio antes de cada prueba
    });

    it("renders without crashing", () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByText(/No user logged in/i)).toBeInTheDocument();
        expect(screen.getByText(/No token/i)).toBeInTheDocument();
    });

    
    it("logs out user and clears token", () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Iniciar sesión primero
        userEvent.click(screen.getByRole("button", { name: /login/i }));
        // Ahora cerrar sesión
        userEvent.click(screen.getByRole("button", { name: /logout/i }));

        // Verificar que el usuario y el token se hayan restablecido
        expect(screen.getByText(/No user logged in/i)).toBeInTheDocument();
        expect(screen.getByText(/No token/i)).toBeInTheDocument();
    });

    it("retrieves user and token from localStorage on mount", () => {
        const user = { name: "John Doe", id: 1 };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("authToken", "test-token");

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Verificar que el usuario y el token se hayan recuperado
        expect(screen.getByText(/User: John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/Token: test-token/i)).toBeInTheDocument();
    });
});
