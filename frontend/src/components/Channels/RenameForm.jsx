import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { selectChannelsNames, useUpdateChannel } from "api/channelsApi";
import { getValidationSchema } from "./validation";
import { FIELD_NAME, initialValues } from "./constants";

export const RenameForm = ({ handleClose, channel }) => {
  const names = useSelector(selectChannelsNames);
  const inputRef = useRef(null);
  const [renameChannel, { error, isLoading }] = useUpdateChannel();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
    initialValues,
    onSubmit: async (formData) => {
      const response = await renameChannel({
        ...formData,
        id: channel.id,
      });
      handleClose();
    },
  });

  const nameError = (dirty && errors[FIELD_NAME]) || status;
  const isSubmitDisabled = !dirty || nameError || isSubmitting;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          className="mb-2"
          disabled={isSubmitting}
          ref={inputRef}
          onChange={handleChange}
          onBlur={handleBlur}
          values={values[FIELD_NAME]}
          name={FIELD_NAME}
          id={FIELD_NAME}
          isInvalid={nameError}
        />
        <label className="visually-hidden" htmlFor={FIELD_NAME}>
          Название канала
        </label>
        <Form.Control.Feedback type="invalid">
          {nameError}
        </Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
          >
            Отменить
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitDisabled}>
            Сохранить
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default RenameForm;
