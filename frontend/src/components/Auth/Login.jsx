import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Card } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useLogin } from "services/authApi";
import { selectError } from "redux/slices/authSlice";
import PAGES from "configs/routs";
import loginImg from "assets/login.jpg";
import Button from "components/Buttons/LoadingButton";
import AuthForm from "./AuthForm";
import { validationSchema } from "./validation";
import { initialValues, FIELD_PASSWORD, FIELD_USERNAME } from "./constants";

export const Login = () => {
  const authError = useSelector(selectError);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLogin();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      setErrors({});
      await login(values).unwrap();
      navigate(PAGES.MAIN);
    },
  });

  const extraErrors = {
    ...errors,
    ...(authError && { [FIELD_PASSWORD]: authError }),
  };

  const footer = {
    text: "Нет аккаунта?",
    action: "Регистрация",
    href: PAGES.SIGNUP,
  };

  return (
    <AuthForm img={loginImg} footer={footer}>
      <Form className="mt-3 mt-mb-0" onSubmit={handleSubmit}>
        <Card.Title>Вход</Card.Title>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            className="form-control"
            name={FIELD_USERNAME}
            id={FIELD_USERNAME}
            onChange={handleChange}
            value={values[FIELD_USERNAME]}
            autoComplete="username"
            placeholder="Ваш ник"
            ref={inputRef}
            isInvalid={!!extraErrors[FIELD_USERNAME]}
          />
          <Form.Label htmlFor="username">Ваш ник</Form.Label>
          <Form.Control.Feedback type="invalid">
            {extraErrors[FIELD_USERNAME]}
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
            isInvalid={!!extraErrors[FIELD_PASSWORD]}
          />
          <Form.Label htmlFor="password">Пароль</Form.Label>
          <Form.Control.Feedback type="invalid">
            {extraErrors[FIELD_PASSWORD]}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          className="w-100 mb-3"
          type="submit"
          variant="outline-primary"
        >
          Логин
        </Button>
      </Form>
    </AuthForm>
  );
};

export default Login;
