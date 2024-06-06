import {
  createContext,
  useContext,
  useState,
  useMemo,
} from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [config, setConfig] = useState(null);

  const openModal = (data) => {
    setConfig(data);
  };

  const closeModal = () => {
    setConfig(null);
  };

  const value = useMemo(
    () => ({
      config,
      openModal,
      closeModal,
    }),
    [config],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
