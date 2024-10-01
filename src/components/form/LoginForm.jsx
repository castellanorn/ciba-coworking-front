import { useState } from "react";
import { EyeIcon, Form,  InputWrapper, Label, LoginInput, StyledInput } from "./LoginFormStyled";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";



const LoginForm = ({ labelEmail, labelPassword }) => {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
    return (
      <Form>
        <Label htmlFor="email">{labelEmail}</Label>
        <StyledInput type="email" name="email" placeholder="Escriu el teu email..." />
  
        <Label htmlFor="password">{labelPassword}</Label>
        <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
        <InputWrapper>
        <LoginInput
          type={showPassword ? "text" : "password"} 
          name="password"
          placeholder="Escriu la teva contrasenya..."
        />
    
        <EyeIcon onClick={togglePasswordVisibility}>
          {showPassword ? <RiEyeCloseLine /> : <IoEyeOutline />}
        </EyeIcon>
      </InputWrapper>
      </div>
      </Form>
    );
  };
  
  export default LoginForm;