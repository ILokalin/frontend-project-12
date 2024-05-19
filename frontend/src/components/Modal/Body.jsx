import { ModalBody } from "react-bootstrap";

export const Body = ({ component, handleClose, modalProps = {} }) => {
  const Component = component;

  return (
    <ModalBody>
      <Component handleClose={handleClose} {...modalProps} />
    </ModalBody>
  );
};

export default Body;
