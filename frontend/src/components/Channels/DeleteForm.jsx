import { useDeleteChannel } from "services/channelsApi";
import Button from "components/Buttons/LoadingButton";
import { Fragment } from "react";

const DeleteForm = ({ handleClose, channel }) => {
  const [deleteChannel, { isLoading }] = useDeleteChannel();

  const handaleDelete = async () => {
    await deleteChannel(channel);
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
        <Button
          variant="danger"
          type="button"
          disabled={isLoading}
          isLoading={isLoading}
          onClick={handaleDelete}
        >
          Удалить
        </Button>
      </div>
    </Fragment>
  );
};

export default DeleteForm;
