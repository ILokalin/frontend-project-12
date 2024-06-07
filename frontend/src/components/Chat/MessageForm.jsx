import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { selectCurrentChannel } from 'services/channelsApi';
import { selectUser } from 'redux/slices/authSlice';
import { useAddMessage } from 'services/messagesApi';
import { initialValues, FIELD_MESSAGE } from './constants';
import { validationSchema } from './validation';
import { filterProfanity } from './profanityFilter';

const MessageForm = () => {
  const { t } = useTranslation();
  const [addMessage, { isLoading }] = useAddMessage();
  const channel = useSelector(selectCurrentChannel);
  const username = useSelector(selectUser);
  const inputRef = useRef(null);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    isSubmitting,
    isValid,
    dirty,
    resetForm,
    setSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: async (formData) => {
      const message = {
        body: filterProfanity(formData[FIELD_MESSAGE]),
        channelId: channel.id,
        username,
      };
      await addMessage(message);
      resetForm();
      setSubmitting(false);
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [channel, isSubmitting]);

  const isInvalid = !dirty || !isValid;

  return (
    <Form className="py-1" noValidate={true} onSubmit={handleSubmit}>
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          className="border rounded-end-0"
          ref={inputRef}
          name={FIELD_MESSAGE}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[FIELD_MESSAGE]}
          disabled={isSubmitting}
          aria-label={t('chat.newMessage')}
          placeholder={t('chat.typeYourMessage')}
        />
        <Button
          variant="group-vertical"
          type="submit"
          disabled={isInvalid || isLoading}
        >
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('global.submit')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
