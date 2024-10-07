import React, { useState, useCallback } from "react";
import { BiUserPlus  } from "react-icons/bi";
import CreateUserForm from "../form/CreateUserForm";
import { ModalStyles, ModalContentStyles, AddUserButton} from "../buttons/ButtonStyled";
import { API_CREATE_USER } from "../../config/apiEndpoints";
import { apiRequest } from "../../services/apiRequest";


const AddUser = ({ fetchUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchUsers();
  };
  

  const handleSubmit = useCallback(async (newUserData) => {
    try {
      console.log("Datos que se envían al backend para crear un nuevo usuario:", newUserData);
      
      await apiRequest(API_CREATE_USER(), "POST", newUserData, {
        "Content-Type": "application/json",
      });

      fetchUsers();

      closeModal();
    } catch (error) {
      console.error("Error al crear un nuevo usuario:", error);
    }
  }, [fetchUsers]);


  return (
    <div>
      <AddUserButton>
      <BiUserPlus  onClick={openModal} />
      </AddUserButton>
      {isModalOpen && (
        <ModalStyles >
          <ModalContentStyles>
          <CreateUserForm onCancel={closeModal} onSubmit={handleSubmit} />
          </ModalContentStyles>
        </ModalStyles>
      )}
    </div>
  );
};

export default AddUser;
