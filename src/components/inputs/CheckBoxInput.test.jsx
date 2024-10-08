import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CheckBoxInput } from './CheckBoxInput';

describe('CheckBoxInput', () => {
    const mockOnChange = vi.fn();

    it('renderiza correctamente el componente', () => {
        render(<CheckBoxInput label="Opción 1" name="opcion1" checked={false} onChange={mockOnChange} />);
        
        const checkbox = screen.getByLabelText(/opción 1/i); 
        expect(checkbox).toBeDefined(); 
        expect(checkbox.checked).toBe(false); 
    });

    it('llama a onChange al hacer clic en el checkbox', () => {
        render(<CheckBoxInput label="Opción 1" name="opcion1" checked={false} onChange={mockOnChange} />);
        
        const checkbox = screen.getByLabelText(/opción 1/i);
        fireEvent.click(checkbox); 
        expect(mockOnChange).toHaveBeenCalled(); 
    });

    it('marca el checkbox si se le pasa checked como true', () => {
        render(<CheckBoxInput label="Opción 1" name="opcion1" checked={true} onChange={mockOnChange} />);
        
        const checkbox = screen.getByLabelText(/opción 1/i);
        expect(checkbox.checked).toBe(true); 
    });
});
