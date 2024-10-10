import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider, AuthContext } from "../auth/AuthWrapper"; 
import userEvent from "@testing-library/user-event";


const TestComponent = () => {
    const { user, authToken, login, logout } = React.useContext(AuthContext);

    return (
        <div>
            <h1>User: {user ? user.name : "No user logged in"}</h1>
            <h2>Token: {authToken || "No token"}</h2>
            <button onClick={() => login({ name: "Tom Cruise", id: 1 }, "test-token")}>
                Login
            </button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

describe("AuthProvider", () => {
    beforeEach(() => {
        localStorage.clear(); 
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

       
        userEvent.click(screen.getByRole("button", { name: /login/i }));
        userEvent.click(screen.getByRole("button", { name: /logout/i }));

        expect(screen.getByText(/No user logged in/i)).toBeInTheDocument();
        expect(screen.getByText(/No token/i)).toBeInTheDocument();
    });

    it("retrieves user and token from localStorage on mount", () => {
        const user = { name: "Tom Cruise", id: 1 };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("authToken", "test-token");

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByText(/User: Tom Cruise/i)).toBeInTheDocument();
        expect(screen.getByText(/Token: test-token/i)).toBeInTheDocument();
    });
});
