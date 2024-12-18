import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { StyledRiEyeCloseLine, StyledIoEyeOutline } from "./LoginFormStyled"; 
import { AUTH_LOGIN_URL } from "../../config/apiEndpoints";
import { AuthContext } from "../../auth/AuthProvider";
import { apiRequest } from "../../services/apiRequest";

import {
  EyeIcon,
  Form,
  InputWrapper,
  ButtonsContainer,
} from "./LoginFormStyled";
import Field from "../inputs/Field";
import CancelButton from "../buttons/CancelButton";
import ConfirmButton from "../buttons/ConfirmButton";

import ErrorModal from "../popup/modals/ErrorModal";
import ConfirmationPopup from "../popup/confirmationPopup/ConfirmationPopup";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();
  const [userDTO, setUserDTO] = useState(null);
  const [token, setToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCancelButtonClick = () => {
    window.location.reload()
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    const userData = { email, password };
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    try {
      const response = await apiRequest(
        AUTH_LOGIN_URL,
        "POST",
        userData,
        headers
      );

      const { token, userDTO } = response;

      if (token) {
        const cleanedToken = token.startsWith("Bearer ")
          ? token.slice(7)
          : token;
        login(userDTO, cleanedToken);
        localStorage.setItem("authToken", cleanedToken);
        localStorage.setItem("user", JSON.stringify(userDTO));
        localStorage.setItem("userRole", userDTO.role.toLowerCase());
        setUserDTO(userDTO);
        setToken(cleanedToken);
        setConfirmationPopupOpen(true);
    
      } else {
        setErrorModal({
          isOpen: true,
          message: "Inici de sessió fallit: no s'ha rebut el token.",
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      const backendErrorMessage =
        error.message.slice(39) || "Error d'autenticació. Torna-ho a provar";
      setErrorModal({
        isOpen: true,
        message: backendErrorMessage,
      });
    }
  };

  const handleCloseSuccess = () => {
    if (userDTO) {
      const userRole = userDTO.role.toLowerCase();
      if (userRole === "admin") {
        navigate("/panell-administrador");
      } else {
        navigate("/panell-usuari");
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
              message: "Correu electrònic no vàlid",
            },
            onChange: () => clearErrors("email"),
          })}
        />

        <InputWrapper>
          <Field
            field="Contrasenya"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Escriu la teva contrasenya..."
            error={errors.password?.message}
            {...register("password", {
              required: "Has d'escriure una contrasenya.",
              minLength: {
                value: 8,
                message: "La contrasenya ha de tenir almenys 8 caràcters",
              },
              onChange: () => clearErrors("password"),
            })}
          />
          <EyeIcon onClick={togglePasswordVisibility}>
            {showPassword ? <StyledIoEyeOutline /> : <StyledRiEyeCloseLine />}
          </EyeIcon>
        </InputWrapper>

        <ButtonsContainer>
          <ConfirmButton type="submit">Acceptar</ConfirmButton>
          <CancelButton type= "button" onClick={handleCancelButtonClick}>
            Cancel·lar
          </CancelButton>
        </ButtonsContainer>
      </Form>
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        message={errorModal.message}
      />
      {confirmationPopupOpen && (
        <ConfirmationPopup
          open={confirmationPopupOpen}
          onClose={handleCloseSuccess}
          subtitleConfirm={
            "Inici de sessió amb èxit."
          }
        />
      )}
    </>
  );
};

export default LoginForm;
