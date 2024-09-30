import React, { useState } from "react";
import { BiSolidPlusCircle } from "react-icons/bi";
import CreateUserForm from "../form/CreateUserForm";

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
      <BiSolidPlusCircle onClick={openModal} style={{ cursor: "pointer" }} />

      {isModalOpen && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <CreateUserForm onCancel={closeModal}/>

          </div>
        </div>
      )}
    </div>
  );
};


const modalStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  position: "relative",
};


export default AddUser;
