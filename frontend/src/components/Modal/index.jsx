import { Modal } from 'react-bootstrap';
import { useModal } from 'context/ModalContext';
import Body from './Body';
import Header from './Header';

const BaseModal = () => {
  const { config, closeModal } = useModal();

  if (!config) return null;

  return (
    <Modal show onHide={closeModal} centered>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {config?.header && <Header {...config.header} handleClose={closeModal} />}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {config?.body && <Body {...config.body} handleClose={closeModal} />}
    </Modal>
  );
};

export default BaseModal;
