import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [config, setConfig] = useState(null);

  const openModal = (config) => {
    setConfig(config);
  };

  const closeModal = () => {
    setConfig(null);
  };

  return (
    <ModalContext.Provider value={{ config, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
