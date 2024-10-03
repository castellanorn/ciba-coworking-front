import React, { useEffect, useState } from "react";
import TitleMobile from "../title/Title";
import Field from "../inputs/Field";
import ContainerButtons from "../container/ButtonsContainer";
import ConfirmButton from "../buttons/ConfirmButton";
import { FormContainer, Form } from "./CreateUserFormStyled";
import CancelButton from "../buttons/CancelButton";
import PasswordGenerator from "../../components/inputs/PasswordGenerator";

const CreateUserForm = ({ onCancel, onSubmit, initialData }) => {
  const [form, setForm] = useState({
    //form guarda los campos y setform actualiza los valores. useState crea el esatdo del formulario
    nomAmbCognom: "",
    correu: "",
    mobil: "",
    projecte: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    //UseState maneja el error y errors contiene el mensaje
    nomAmbCognom: "",
    correu: "",
    mobil: "",
    projecte: "",
    password: "",
  });

  // Cargar información del usuario para editar
  useEffect(() => {
    if (initialData) {
      setForm({
        nomAmbCognom: initialData.nomAmbCognom || "",
        correu: initialData.correu || "",
        mobil: initialData.mobil || "",
        projecte: initialData.projecte || "",
        password: initialData.password || "",
      });
    }
  }, [initialData]);

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

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!form.nomAmbCognom.trim()) {
      errorsCopy.nomAmbCognom = "Nom i cognom obligatoris";
      valid = false;
    } else {
      errorsCopy.nomAmbCognom = "";
    }

    if (!form.correu.trim()) {
      errorsCopy.correu = "Email obligatori";
      valid = false;
    } else {
      errorsCopy.correu = "";
    }

    if (!form.mobil.trim()) {
      errorsCopy.mobil = "Telèfon obligatori";
      valid = false;
    } else {
      errorsCopy.mobil = "";
    }

    if (!form.projecte.trim()) {
      errorsCopy.projecte = "Nom del projecte obligatori";
      valid = false;
    } else {
      errorsCopy.projecte = "";
    }

    if (!form.password.trim()) {
      errorsCopy.password = "Contrasenya obligatoria";
      valid = false;
    } else {
      errorsCopy.password = "";
    }

    setErrors(errorsCopy);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(form);
    }
  };


  return (
    <Form>
      <TitleMobile title={initialData ? "Editar usuari" : "Afegir un usuari"} />
      <FormContainer>
        <Field
          field="Nom i cognoms*"
          type="text"
          placeholder={"Escriu el nom i cognoms..."}
          name="nomAmbCognom"
          value={form.nomAmbCognom}
          onChange={handleChange}
          error={errors.nomAmbCognom}
        />
        <Field
          field="Email*"
          type="text"
          placeholder={"Escriu el email..."}
          name="correu"
          value={form.correu}
          onChange={handleChange}
          error={errors.correu}
        />
        <Field
          field="Telèfon*"
          type="text"
          placeholder={"Escriu el telèfon..."}
          name="mobil"
          value={form.mobil}
          onChange={handleChange}
          error={errors.mobil}
        />
        <Field
          field="Nom del projecte*"
          type="text"
          placeholder={"Escriu el nom del projecte..."}
          name="projecte"
          value={form.projecte}
          onChange={handleChange}
          error={errors.projecte}
        />
        <PasswordGenerator onPasswordGenerated={handlePasswordGenerated} />
        <ContainerButtons>
          <ConfirmButton onClick={handleSubmit}>Aceptar</ConfirmButton>
          <CancelButton onClick={onCancel}>Cancel·lar</CancelButton>
        </ContainerButtons>
      </FormContainer>
    </Form>
  );
};

export default CreateUserForm;
