import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { selectCurrentChannel } from "api/channelsApi";
import { selectUser } from "slices/authSlice";
import { useAddMessage } from "api/messagesApi";
import { Form, InputGroup, Button } from "react-bootstrap";
import { ArrowRightSquare } from "react-bootstrap-icons";
import { initialValues, MESSAGE_FIELD } from "./constants";
import { validationSchema } from "./validation";

const MessageForm = () => {
  const [addMessage, { error, isLoading }] = useAddMessage();
  const channel = useSelector(selectCurrentChannel);
  const username = useSelector(selectUser);
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.focus();
    }
  }, [channel]);

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
        body: formData[MESSAGE_FIELD],
        channelId: channel.id,
        username,
      };
debugger
      addMessage(message);
      resetForm();
      setSubmitting();
      messageRef.current.focus();
    },
  });

  const isInvalid = !dirty || !isValid;

  return (
    <Form
      className="py-1 border rounded-2"
      noValidate={true}
      onSubmit={handleSubmit}
    >
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          className="border-0 p-0 ps-2"
          ref={messageRef}
          name={MESSAGE_FIELD}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[MESSAGE_FIELD]}
          disabled={isSubmitting}
          placeholder="Введите сообщение"
        />
        <Button variant="group-vertical" type="submit" disabled={isInvalid}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
