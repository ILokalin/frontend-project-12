import { Button } from "react-bootstrap";
import { useDeleteChannel } from "api/channelsApi";
import { Fragment } from "react";

export const DeleteForm = ({ handleClose, channel }) => {
  const [deleteChannel, { error, isLoading }] = useDeleteChannel();

  const handaleDelete = () => {
    deleteChannel(channel);
    handleClose();
  };

  return (
    <Fragment>
      <p className="lead">Вы уверены?</p>
      <div className="d-flex justify-content-end">
        <Button
          className="me-2"
          variant="secondary"
          type="button"
          onClick={handleClose}
        >
          Отменить
        </Button>
        <Button variant="danger" type="button" onClick={handaleDelete}>
          Удалить
        </Button>
      </div>
    </Fragment>
  );
};

export default DeleteForm;
