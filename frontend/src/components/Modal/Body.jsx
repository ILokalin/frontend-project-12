import { ModalBody } from 'react-bootstrap';

const Body = ({ component, handleClose, modalProps = {} }) => {
  const Component = component;

  return (
    <ModalBody>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component handleClose={handleClose} {...modalProps} />
    </ModalBody>
  );
};

export default Body;
