import {
  createContext,
  useContext,
  useState,
  useMemo,
} from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState(null);

  const openModal = (config) => {
    setModalConfig(config);
  };

  const closeModal = () => {
    setModalConfig(null);
  };

  const value = useMemo(
    () => ({
      modalConfig,
      openModal,
      closeModal,
    }),
    [modalConfig],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
