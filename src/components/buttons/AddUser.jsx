import React, { useState, useCallback, useContext } from "react";

import { AuthContext } from "../../auth/AuthProvider";
import { API_CREATE_USER } from "../../config/apiEndpoints";
import { apiRequest } from "../../services/apiRequest";

import { BiUserPlus } from "react-icons/bi";
import CreateUserForm from "../form/CreateUserForm";
import {
  ModalStyles,
  ModalContentStyles,
  AddUserButton,
} from "../buttons/ButtonStyled";
import ErrorModal from "../popup/modals/ErrorModal";

const AddUser = ({ fetchUsers }) => {
  const { authToken } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchUsers();
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  const handleSubmit = useCallback(
    async (newUserData) => {
      try {
        console.log(
          "Datos que se envían al backend para crear un nuevo usuario:",
          newUserData
        );

        await apiRequest(API_CREATE_USER, "POST", newUserData, headers);

        fetchUsers();

        closeModal();
      } catch (error) {
        console.error("Error en crear un nou usuari:", error);
        setErrorModal({
          isOpen: true,
          message: `Error en crear un nou usuari: ${error}`,
        });
      }
    },
    [fetchUsers]
  );

  return (
    <div>
      <AddUserButton>
        <BiUserPlus onClick={openModal} />
      </AddUserButton>
      {isModalOpen && (
        <ModalStyles>
          <ModalContentStyles>
            <CreateUserForm onCancel={closeModal} onSubmit={handleSubmit} />
          </ModalContentStyles>
        </ModalStyles>
      )}

      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        message={errorModal.message}
      />
    </div>
  );
};

export default AddUser;
