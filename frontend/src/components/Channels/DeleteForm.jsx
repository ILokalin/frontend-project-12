import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDeleteChannel } from 'services/channelsApi';
import Button from 'components/Buttons/LoadingButton';
import { Fragment } from 'react';

const DeleteForm = ({ handleClose, channel }) => {
  const { t } = useTranslation();
  const [deleteChannel, { isLoading, isSuccess }] = useDeleteChannel();

  useEffect(() => {
    if (isSuccess) {
      toast.success(t(`channels.сhannelDeletedSuccessfully`));
    }
  }, [isSuccess, t]);

  const handaleDelete = async () => {
    await deleteChannel(channel);
    handleClose();
  };

  return (
    <Fragment>
      <p className="lead">{t('channels.deleteForm.areYouSure')}</p>
      <div className="d-flex justify-content-end">
        <Button
          className="me-2"
          variant="secondary"
          type="button"
          onClick={handleClose}
        >
          {t('global.cancel')}
        </Button>
        <Button
          variant="danger"
          type="button"
          disabled={isLoading}
          isLoading={isLoading}
          onClick={handaleDelete}
        >
          {t('global.delete')}
        </Button>
      </div>
    </Fragment>
  );
};

export default DeleteForm;
