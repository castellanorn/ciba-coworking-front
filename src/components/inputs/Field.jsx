
import React, { forwardRef } from "react";
import { FieldContainer, FieldLabel, FieldInput, FieldInvalidInput } from "./InputStyled";

const Field = forwardRef(({ field, name, placeholder, value, type, onChange, error }, ref) =>{
  return (
    <FieldContainer>
      <FieldLabel htmlFor={name}>{field}</FieldLabel>
      <FieldInput
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
      />
      {error && <FieldInvalidInput>{error}</FieldInvalidInput>}
    </FieldContainer>
  );
});

export default Field;
