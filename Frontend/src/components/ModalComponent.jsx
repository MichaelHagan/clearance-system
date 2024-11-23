// ModalComponent.js
import React from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backdropFilter: "blur(5px)",
  },
  content: {
    /* your modal styles here */
  },
};

const ModalComponent = ({ isOpen, closeModal, children }) => {
  return (
    <Modal
      className="relative w-[20rem] mx-auto top-[16rem] bg-white border-2 border-yellowgreen overflow-auto"
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal"
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
