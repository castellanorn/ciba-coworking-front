import { StyledInput } from "../form/LoginFormStyled";
import { Label, InvalidInput } from "./styled/InputStyled";

const Input = ({ label, type, name, placeholder, value, onChange, error }) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange} // ensure onChange is passed
      />
      {error && <InvalidInput>{error}</InvalidInput>} {/* Render error message */}
    </div>
  );
};

export default Input;
