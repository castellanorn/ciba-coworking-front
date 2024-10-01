import React, { useState } from "react";
import { BiUserPlus  } from "react-icons/bi";
import CreateUserForm from "../form/CreateUserForm";
import { ModalStyles, ModalContentStyles, AddUserButton} from "../buttons/ButtonStyled";

const AddUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <AddUserButton>
      <BiUserPlus  onClick={openModal} />
      </AddUserButton>
      {isModalOpen && (
        <ModalStyles >
          <ModalContentStyles>
            <CreateUserForm onCancel={closeModal}/>
          </ModalContentStyles>
        </ModalStyles>
      )}
    </div>
  );
};

export default AddUser;
