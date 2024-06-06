import { Modal } from 'react-bootstrap';
import { useModal } from 'context/ModalContext';
import Body from './Body';
import Header from './Header';

const BaseModal = () => {
  const { config, closeModal } = useModal();

  if (!config) return null;

  return (
    <Modal show onHide={closeModal} centered>
      {config?.header && <Header {...config.header} handleClose={closeModal} />}
      {config?.body && <Body {...config.body} handleClose={closeModal} />}
    </Modal>
  );
};

export default BaseModal;