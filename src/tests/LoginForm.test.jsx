import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../components/form/LoginForm";

test("renders LoginForm with email and password fields", () => {
  render(<LoginForm labelEmail="Email" labelPassword="Password" />);

 
  expect(screen.getByPlaceholderText("Escriu el teu email...")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Escriu la teva contrasenya...")).toBeInTheDocument();
});

test("toggles password visibility when clicking the eye icon", () => {
    render(<LoginForm labelEmail="Email" labelPassword="Password" />);
  
    const passwordInput = screen.getByPlaceholderText("Escriu la teva contrasenya...");
    const toggleIcon = document.querySelector("span.sc-kLhKbu");  
  
   
    expect(passwordInput).toHaveAttribute("type", "password");
  
    
    fireEvent.click(toggleIcon);
  
    
    expect(passwordInput).toHaveAttribute("type", "text");
  
    
    fireEvent.click(toggleIcon);
  
    
    expect(passwordInput).toHaveAttribute("type", "password");
  });
  test("email and password fields are initially empty", () => {
    render(<LoginForm labelEmail="Email" labelPassword="Password" />);
  
    const emailInput = screen.getByPlaceholderText("Escriu el teu email...");
    const passwordInput = screen.getByPlaceholderText("Escriu la teva contrasenya...");
  
    
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });
 