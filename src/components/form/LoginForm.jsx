import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { EyeIcon, Form,  InputWrapper, Label, LoginInput, StyledInput, ButtonsContainer } from "./LoginFormStyled";
import Field from "../inputs/Field";
import CancelButton from "../buttons/CancelButton";
import ConfirmButton from "../buttons/ConfirmButton";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { AUTH_LOGIN_URL } from "../../config/apiEndpoints";
import {AuthContext} from "../../auth/AuthWrapper";



const LoginForm = ({ labelEmail, labelPassword }) => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [userDTO, setUserDTO] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCancelButtonClick = () => {
    navigate('/inici-sessio'); 
};

  const onSubmit = async (data) => {
    const { email, password } = data;
    const userData = { email, password };
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    try {
        const response = await apiRequest(AUTH_LOGIN_URL, "POST", userData, headers);

        const { token, userDTO } = response;
        console.log("API Response:", response);

        if (token) {
            const cleanedToken = token.startsWith('Bearer ') ? token.slice(7) : token;
            login(userDTO, cleanedToken);
            setUserDTO(userDTO);

            //setSuccessMessage("¡Inicio de sesión con éxito!");
            //setModalOpen(true);
            console.log("user logged");
        } else {
          alert("Inicio de sesión fallido: no se recibió token.")
            /* setErrorModal({
                isOpen: true,
                message: "Inicio de sesión fallido: no se recibió token."
            }); */
        }
    } catch (error) {
        console.error("API Error:", error);
        alert("El inicio de sesión fallido: el e-mail o contraseña no son válidos")
        /* setErrorModal({
            isOpen: true,
            message: "El inicio de sesión fallido: el e-mail o contraseña no son válidos"
        }); */
    }
};

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* <Label htmlFor="email">{labelEmail}</Label>
        <StyledInput 
          id="email"
          type="email" 
          name="email" 
          placeholder="Escriu el teu email..." 
          error={errors.email?.message}
                            {...register("email", {
                                required: "Has d'escriure un correu electrònic",
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Correu electrònic no vàlid"
                                }
                            })}
          /> */}

        <Field
          field="Email"
          type="text"
          placeholder={"Escriu el teu email..."}
          name="email"
          error={errors.email?.message}
            {...register("email", {
                required: "Has d'escriure un correu electrònic",
                pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Correu electrònic no vàlid"
                }
            })}
        />

        <Field
          field="Contrasenya"
          type="text"
          placeholder={"Escriu la teva contrasenya..."}
          name="password"
          type={showPassword ? "text" : "password"}
          error={errors.password?.message}
                  {...register("password", {
                      required: "Has d'escriure una contrasenya.",
                      minLength: {
                          value: 8,
                          message: "La contrasenya ha de tenir almenys 8 caràcters"
                      }
                  })}
        />
  
        {/* <Label htmlFor="password">{labelPassword}</Label>
        <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
        <InputWrapper>
        <LoginInput
          id="password"
          type={showPassword ? "text" : "password"} 
          name="password"
          placeholder="Escriu la teva contrasenya..."
          error={errors.password?.message}
                            {...register("password", {
                                required: "Has d'escriure una contrasenya.",
                                minLength: {
                                    value: 8,
                                    message: "La contrasenya ha de tenir almenys 8 caràcters"
                                }
                            })}
        /> */}
    
        <EyeIcon onClick={togglePasswordVisibility}>
          {showPassword ? <RiEyeCloseLine /> : <IoEyeOutline />}
        </EyeIcon>
      </InputWrapper>
      </div>
        <ButtonsContainer>
          <ConfirmButton 
            type = "submit">
            Acceptar
          </ConfirmButton>
          <CancelButton onClick = {handleCancelButtonClick}>
              Cancel·lar
          </CancelButton>
        </ButtonsContainer>
      </Form>
    );
  };
  
  export default LoginForm;