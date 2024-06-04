import { ModalBody } from "react-bootstrap";

const Body = ({ component, handleClose, modalProps = {} }) => {
  const Component = component;

  return (
    <ModalBody>
      <Component handleClose={handleClose} {...modalProps} />
    </ModalBody>
  );
};

export default Body;
