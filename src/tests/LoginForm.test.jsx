import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../components/form/LoginForm";

test("renders LoginForm with email and password fields", () => {
  render(<LoginForm labelEmail="Email" labelPassword="Password" />);

  // Verificar que se renderizan los campos de entrada correctamente
  expect(screen.getByPlaceholderText("Escriu el teu email...")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Escriu la teva contrasenya...")).toBeInTheDocument();
});

test("toggles password visibility when clicking the eye icon", () => {
    render(<LoginForm labelEmail="Email" labelPassword="Password" />);
  
    const passwordInput = screen.getByPlaceholderText("Escriu la teva contrasenya...");
    const toggleIcon = document.querySelector("span.sc-kLhKbu");  // Asegúrate de que el selector CSS coincida
  
    // Verificar que inicialmente el input es de tipo 'password'
    expect(passwordInput).toHaveAttribute("type", "password");
  
    // Simular el clic en el icono para mostrar la contraseña
    fireEvent.click(toggleIcon);
  
    // Verificar que el tipo del input cambie a 'text'
    expect(passwordInput).toHaveAttribute("type", "text");
  
    // Simular el clic en el icono nuevamente para ocultar la contraseña
    fireEvent.click(toggleIcon);
  
    // Verificar que el tipo del input vuelva a ser 'password'
    expect(passwordInput).toHaveAttribute("type", "password");
  });
  test("email and password fields are initially empty", () => {
    render(<LoginForm labelEmail="Email" labelPassword="Password" />);
  
    const emailInput = screen.getByPlaceholderText("Escriu el teu email...");
    const passwordInput = screen.getByPlaceholderText("Escriu la teva contrasenya...");
  
    // Verificar que ambos campos estén vacíos al principio
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });
 