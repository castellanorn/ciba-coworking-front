import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest'; 
import CreateUserForm from '../components/form/CreateUserForm'; 

describe("CreateUserForm", () => {
  const onCancel = vi.fn(); 
  const onSubmit = vi.fn();

  beforeEach(() => {
    render(<CreateUserForm onCancel={onCancel} onSubmit={onSubmit} initialData={{}} />);
  });

  it("calls onSubmit with correct data when form is valid", () => {
    
    fireEvent.change(screen.getByPlaceholderText("Escriu el nom i cognoms..."), { target: { value: "Tom Cruise" } });
    fireEvent.change(screen.getByPlaceholderText("Escriu el email..."), { target: { value: "tcruise@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Escriu el telèfon..."), { target: { value: "123456789" } });
    fireEvent.change(screen.getByPlaceholderText("Escriu el nom del projecte..."), { target: { value: "Project A" } });

   
    fireEvent.click(screen.getByRole("button", { name: /generar contrasenya/i }));

    
    fireEvent.click(screen.getByText(/Aceptar/i));

    
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
        name: "Tom Cruise",
        email: "tcruise@example.com",
        phone: "123456789",
        project_name: "Project A", 
        password: expect.any(String), 
    }));
});
  it("calls onCancel when cancel button is clicked", () => {
    fireEvent.click(screen.getByText(/Cancel·lar/i));
    expect(onCancel).toHaveBeenCalled();
  });
});
