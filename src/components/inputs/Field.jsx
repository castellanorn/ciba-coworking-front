
import { FieldContainer, FieldLabel, FieldInput, FieldInvalidInput } from "./styled/InputStyled";

const Field = ({  field, name, placeholder, value, type, onchange, error }) => {
  return (
    <FieldContainer>
      <FieldLabel htmlFor={name}>{field}</FieldLabel>
      <FieldInput
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onchange}
      />
      {error && <FieldInvalidInput>{error}</FieldInvalidInput>}
    </FieldContainer>
  );
};

export default Field;
