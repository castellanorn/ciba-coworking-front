import React, { useState } from "react";
import TitleMobile from "../title/Title";
import Field from "../inputs/Field";
import ContainerButtons from "../container/ButtonsContainer";
import ConfirmButton from "../buttons/ConfirmButton";
import { FormContainer, Form } from "./CreateUserFormStyled";
import CancelButton from "../buttons/CancelButton";
import PasswordGenerator from "../inputs/PasswordGenerator";


const CreateUserForm = ({onCancel}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectName: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    projectName: "",
    password: "",
  });

  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlePasswordGenerated = (generatedPassword) => {
    setForm({
      ...form,
      password: generatedPassword,
    });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        console.log("Formulario válido. Procesando...", form);
      }
    };


  const handleOpenConfirm = () => {};


  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (form.name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "Nom i cognom obligatoris";
      valid = false;
    }

    if (form.email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email obligatori";
      valid = false;
    }

    if (form.phone.trim()) {
      errorsCopy.phone = "";
    } else {
      errorsCopy.phone = "Telèfon obligatori";
      valid = false;
    }

    if (form.projectName.trim()) {
      errorsCopy.projectName = "";
    } else {
      errorsCopy.projectName = "Nom del projecte obligatori";
      valid = false;
    }

     if (!form.password.trim()) {
      errorsCopy.password = "Contrasenya obligatori";
      valid = false;
    } else {
      errorsCopy.password = "";
    }

    setErrors(errorsCopy);
    return valid;
  };

  return (
    <Form>
      <TitleMobile title="Afegir un usuari" />
      <FormContainer>
      <Field
        field="Nom i cognoms*"
        type="text"
        placeholder={"Escriu el nom i cognoms..."}
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
      />
      <Field
        field="Email*"
        type="text"
        placeholder={"Escriu el email..."}
        name="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Field
        field="Telèfon*"
        type="text"
        placeholder={"Escriu el telèfon..."}
        name="phone"
        value={form.phone}
        onChange={handleChange}
        error={errors.phone}
      />
      <Field
        field="Nom del projecte*"
        type="text"
        placeholder={"Escriu el nom del projecte..."}
        name="projectName"
        value={form.projectName}
        onChange={handleChange}
        error={errors.projectName}
      />
      <PasswordGenerator onPasswordGenerated={handlePasswordGenerated}/>
      <ContainerButtons>
        <ConfirmButton onClick={handleSubmit}>Acceptar</ConfirmButton>
        <CancelButton onClick={onCancel}>Cancel·lar</CancelButton>

      </ContainerButtons>
    </FormContainer>
    </Form>
  );
};

export default CreateUserForm;
