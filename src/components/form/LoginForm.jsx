import { useState } from "react";
import { EyeIcon, Form, Input, InputWrapper, Label, LoginInput } from "./LoginFormStyled";
import { BiShow } from "react-icons/bi";
import { RiEyeCloseLine } from "react-icons/ri";


const LoginForm = ({ labelEmail, labelPassword }) => {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
    return (
      <Form>
        <Label htmlFor="email">{labelEmail}</Label>
        <Input type="email" name="email" placeholder="Escriu el teu email..." />
  
        <Label htmlFor="password">{labelPassword}</Label>
        <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
        <InputWrapper>
        <LoginInput
          type={showPassword ? "text" : "password"} 
          name="password"
          placeholder="Escriu la teva contrasenya..."
        />
    
        <EyeIcon onClick={togglePasswordVisibility}>
          {showPassword ? <RiEyeCloseLine /> : <BiShow />}
        </EyeIcon>
      </InputWrapper>
      </div>
      </Form>
    );
  };
  
  export default LoginForm;