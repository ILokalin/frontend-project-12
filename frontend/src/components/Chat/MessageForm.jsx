import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { Form, InputGroup, Button } from "react-bootstrap";
import { ArrowRightSquare } from "react-bootstrap-icons";
import { selectCurrentChannel } from "services/channelsApi";
import { selectUser } from "redux/slices/authSlice";
import { useAddMessage } from "services/messagesApi";
import { initialValues, FIELD_MESSAGE } from "./constants";
import { validationSchema } from "./validation";

const MessageForm = () => {
  const [addMessage, { isLoading }] = useAddMessage();
  const channel = useSelector(selectCurrentChannel);
  const username = useSelector(selectUser);
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.focus();
  }, []);

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
        body: formData[FIELD_MESSAGE],
        channelId: channel.id,
        username,
      };
      await addMessage(message);
      resetForm();
      setSubmitting(false);
      formRef.current.focus();
    },
  });

  const isInvalid = !dirty || !isValid;

  return (
    <Form className="py-1" noValidate={true} onSubmit={handleSubmit}>
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          className="border rounded-end-0"
          ref={formRef}
          name={FIELD_MESSAGE}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[FIELD_MESSAGE]}
          disabled={isSubmitting}
          placeholder="Введите сообщение"
        />
        <Button
          variant="group-vertical"
          type="submit"
          disabled={isInvalid || isLoading}
        >
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
