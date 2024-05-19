import { ModalHeader, ModalTitle, Button } from "react-bootstrap";

export const Header = ({ title, handleClose }) => (
  <ModalHeader>
    <ModalTitle>{title}</ModalTitle>
    <Button
      variant="close"
      type="button"
      onClick={handleClose}
      aria-label="Close"
      data-bs-dismiss="modal"
    />
  </ModalHeader>
);

export default Header;
