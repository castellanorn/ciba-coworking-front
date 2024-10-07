import { useEffect, useState } from "react";
import TitleMobile from "../title/Title";
import Field from "../inputs/Field";
import ContainerButtons from "../container/ButtonsContainer";
import ConfirmButton from "../buttons/ConfirmButton";
import { FormContainer, Form } from "./CreateUserFormStyled";
import CancelButton from "../buttons/CancelButton";
import PasswordGenerator from "../../components/inputs/PasswordGenerator";

const CreateUserForm = ({ onCancel, onSubmit, initialData }) => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    project_name: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    project_name: "",
    password: "",
  });

  // Cargar información del usuario para editar
  useEffect(() => {
    if (initialData) {
      console.log("ID del usuario a editar:", initialData.id);
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        project_name: initialData.projectName  || "",
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
  
    if (!form.name || !form.name.trim()) {
      errorsCopy.name = "Nom i cognom obligatoris";
      valid = false;
    } else {
      errorsCopy.name = "";
    }
  
    if (!form.email || !form.email.trim()) {
      errorsCopy.email = "Email obligatori";
      valid = false;
    } else {
      errorsCopy.email = "";
    }
  
    if (!form.phone || !form.phone.trim()) {
      errorsCopy.phone = "Telèfon obligatori";
      valid = false;
    } else {
      errorsCopy.phone = "";
    }
  
    if (!form.project_name || !form.project_name.trim()) {
      errorsCopy.project_name = "Nom del projecte obligatori";
      valid = false;
    } else {
      errorsCopy.project_name = "";
    }

    if (!initialData && (!form.password || !form.password.trim())) {
      errorsCopy.password = "Contrasenya obligatoria per crear un usuari nou";
      valid = false;
    } else {
      errorsCopy.password = "";
    }
  
    setErrors(errorsCopy);
    return valid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isFormValid = validateForm();
  
    if (isFormValid) {
  
      const userData = {
        ...form,
        projectName: form.project_name,
        ...(initialData ? { id: initialData.id } : {})
      };
  
      onSubmit(userData);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <TitleMobile title={initialData ? "Editar usuari" : "Afegir un usuari"} />
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
          name="project_name"
          value={form.project_name}
          onChange={handleChange}
          error={errors.project_name}
        />
        <PasswordGenerator onPasswordGenerated={handlePasswordGenerated} />
        <ContainerButtons>
        <ConfirmButton type="submit">Aceptar</ConfirmButton>
          <CancelButton onClick={onCancel}>Cancel·lar</CancelButton>
        </ContainerButtons>
      </FormContainer>
    </Form>
  );
};

export default CreateUserForm;
