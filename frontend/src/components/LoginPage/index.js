import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Wrapper from "components/Wrapper";
import { useLogin } from "api/authApi";
import { selectError } from "slices/authSlice";
import ROUTES from "api/apiConfig";
import { validationSchema } from "./validation";
import { initialValues, FIELD_USERNAME, FIELD_PASSWORD } from "./constants";

const LoginPage = () => {
  const authError = useSelector(selectError);
  const navigate = useNavigate();
  const loginRef = useRef(null);
  const [login, { isLoading }] = useLogin();

  useEffect(() => {
    loginRef.current.focus();
  }, []);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      setErrors({});
      await login(values).unwrap();
      navigate(ROUTES.MAIN_PAGE);
    },
  });

  const userFieldErrors = errors[FIELD_USERNAME];
  const passwordFieldErrors = errors[FIELD_PASSWORD] || authError;

  return (
    <Wrapper>
      <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">Войти</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            className="form-control"
            name={FIELD_USERNAME}
            id={FIELD_USERNAME}
            onChange={handleChange}
            value={values[FIELD_USERNAME]}
            autoComplete="username"
            placeholder="Ваш ник"
            ref={loginRef}
            isInvalid={!!userFieldErrors}
          />
          <Form.Label htmlFor="username">Ваш ник</Form.Label>
          <Form.Control.Feedback type="invalid">
            {userFieldErrors}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            className="form-control"
            name={FIELD_PASSWORD}
            id={FIELD_PASSWORD}
            type="password"
            onChange={handleChange}
            value={values[FIELD_PASSWORD]}
            autoComplete="current-pasword"
            placeholder="Пароль"
            isInvalid={!!passwordFieldErrors}
          />
          <Form.Label htmlFor="password">Пароль</Form.Label>
          <Form.Control.Feedback type="invalid">
            {passwordFieldErrors}
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="w-100 mb-3" type="submit" variant="outline-primary">
          Логин
        </Button>
      </Form>
    </Wrapper>
  );
};

export default LoginPage;
