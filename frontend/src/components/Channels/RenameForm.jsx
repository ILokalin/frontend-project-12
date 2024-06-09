import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import { selectChannelsNames, useUpdateChannel } from 'services/channelsApi';
import { getValidationSchema } from './validation';
import { FIELD_NAME } from './constants';
import Button from 'components/Buttons/LoadingButton';

const RenameForm = ({ handleClose, channel }) => {
  const { t } = useTranslation();
  const names = useSelector(selectChannelsNames);
  const inputRef = useRef(null);
  const [renameChannel, { isLoading, isSuccess }] = useUpdateChannel();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success(t(`channels.сhannelRenamedSuccessfully`));
    }
  }, [isSuccess, t]);

  const {
    isSubmitting,
    handleSubmit,
    handleBlur,
    values,
    handleChange,
    errors,
    status,
    dirty,
  } = useFormik({
    validationSchema: getValidationSchema(names),
    initialValues: {
      [FIELD_NAME]: channel.name,
    },
    onSubmit: async (formData) => {
      const schema = getValidationSchema(names);
      const newChannelData = {
        [FIELD_NAME]: leoProfanity.clean(formData[FIELD_NAME]) 
      }
      await schema.validate(newChannelData);
      await renameChannel({
        ...schema.cast(newChannelData),
        id: channel.id,
      });
      handleClose();
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  const extraErrors = {
    ...errors,
    ...(status && { [FIELD_NAME]: status }),
  };
  const isSubmitDisabled = !dirty || isSubmitting;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          className="mb-2"
          disabled={isSubmitting}
          ref={inputRef}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[FIELD_NAME]}
          name={FIELD_NAME}
          id={FIELD_NAME}
          isInvalid={!!extraErrors[FIELD_NAME]}
        />
        <Form.Label className="visually-hidden" htmlFor={FIELD_NAME}>
          {t('global.channelName')}
        </Form.Label>
        <Form.Control.Feedback type="invalid">
          {t(`channels.renameForm.error.${extraErrors[FIELD_NAME]}`)}
        </Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            disabled={isSubmitting}
            onClick={handleClose}
          >
            {t('global.cancel')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitDisabled}
            isLoading={isLoading}
          >
            {t('global.submit')}
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default RenameForm;
