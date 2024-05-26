import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import { selectChannelsNames, useAddChannel } from "services/channelsApi";
import Button from "components/Buttons/LoadingButton";
import { getValidationSchema } from "./validation";
import { FIELD_NAME, initialValues } from "./constants";

const AddForm = ({ handleClose }) => {
  const names = useSelector(selectChannelsNames);
  const inputRef = useRef(null);
  const [addChannel, { isLoading }] = useAddChannel();

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
      const schema = getValidationSchema(names);
      await schema.validate(formData);
      await addChannel(schema.cast(formData));
      handleClose();
    },
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
          values={values[FIELD_NAME]}
          name={FIELD_NAME}
          id={FIELD_NAME}
          isInvalid={extraErrors[FIELD_NAME]}
        />
        <label className="visually-hidden" htmlFor={FIELD_NAME}>
          Название канала
        </label>
        <Form.Control.Feedback type="invalid">
          {extraErrors[FIELD_NAME]}
        </Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Отменить
          </Button>
          <Button
            isLoading={isLoading}
            variant="primary"
            type="submit"
            disabled={isSubmitDisabled}
          >
            Сохранить
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default AddForm;
