
import { FieldContainer, FieldLabel, FieldInput, FieldInvalidInput } from "./InputStyled";

const Field = ({ field, name, placeholder, value, type, onChange, error }) => {
  return (
    <FieldContainer>
      <FieldLabel htmlFor={name}>{field}</FieldLabel>
      <FieldInput
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <FieldInvalidInput>{error}</FieldInvalidInput>}
    </FieldContainer>
  );
};

export default Field;
