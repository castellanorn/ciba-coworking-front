import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest'; // Importamos vi para mocks
import CreateUserForm from '../components/form/CreateUserForm'; // Asegúrate de ajustar la ruta según sea necesario

describe("CreateUserForm", () => {
  const onCancel = vi.fn(); // Usamos vi.fn() para mocks en Vitest
  const onSubmit = vi.fn();

  beforeEach(() => {
    render(<CreateUserForm onCancel={onCancel} onSubmit={onSubmit} initialData={{}} />);
  });

  it("calls onSubmit with correct data when form is valid", () => {
    // Llenar los campos
    fireEvent.change(screen.getByPlaceholderText("Escriu el nom i cognoms..."), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Escriu el email..."), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Escriu el telèfon..."), { target: { value: "123456789" } });
    fireEvent.change(screen.getByPlaceholderText("Escriu el nom del projecte..."), { target: { value: "Project A" } });

    // Generar contraseña
    fireEvent.click(screen.getByRole("button", { name: /generar contrasenya/i }));

    // Simular un clic en el botón de enviar
    fireEvent.click(screen.getByText(/Aceptar/i));

    // Verificar que se llama a onSubmit con los datos correctos
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
        name: "John Doe",
        email: "john@example.com",
        phone: "123456789",
        project_name: "Project A", // Asegúrate de que sea el nombre correcto
        password: expect.any(String), // Acepta cualquier contraseña
    }));
});
  it("calls onCancel when cancel button is clicked", () => {
    fireEvent.click(screen.getByText(/Cancel·lar/i));
    expect(onCancel).toHaveBeenCalled();
  });
});
