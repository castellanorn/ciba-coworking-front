import React from "react";
import TitleMobile from "../title/Title";
import Field from "../inputs/Field";
import ContainerButtons from "../container/ButtonsContainer";
import ConfirmButton from "../buttons/ConfirmButton";
import { ButtonCancel } from "../buttons/ButtonStyled";
import { FormContainer } from "./CreateUserFormStyled";


const CreateUserForm = () => {
  const form = {};

  const handleChange = {};

  const errors = {};

  const handleOpenConfirm = () => {};

  return (
    <FormContainer>
      <TitleMobile title="Afegir un usuari" />
      <Field
        field="Nom i cognoms"
        type="text"
        placeholder={"Escriu el nom i cognoms"}
        name="nom-i-cognoms"
        value={form.name}
        onchange={handleChange}
        error={errors.name}
      />
      <Field
        field="Email"
        type="text"
        placeholder={"Escriu el email"}
        name="email"
        value={form.email}
        onchange={handleChange}
        error={errors.email}
      />
      <Field
        field="Telèfon"
        type="text"
        placeholder={"Escriu el telèfon"}
        name="telefon"
        value={form.telefon}
        onchange={handleChange}
        error={errors.telefon}
      />
      <Field
        field="Nom del projecte"
        type="text"
        placeholder={"Escriu el nom del projecte"}
        name="nom-del-projecte"
        value={form.NomProjecte}
        onchange={handleChange}
        error={errors.NomProjecte}
      />
      <ContainerButtons>
        <ConfirmButton onClick={handleOpenConfirm}>Acceptar</ConfirmButton>
        <ButtonCancel>Cancelar</ButtonCancel>
      </ContainerButtons>
    </FormContainer>
  );
};

export default CreateUserForm;
