import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Wrapper from "../Wrapper";
import { request } from "../../utils/request";
import { validationSchema } from "./validation";
import ROUTES from "../../apiConfig";
import {
  initialValues,
  authError,
  USERNAME_FIELD,
  PASSWORD_FIELD,
} from "./constants";

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const loginRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (loginRef.current) {
      loginRef.current.focus();
    }
  }, []);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setErrors, setFieldError }) => {
      setErrors({});
      const response = await request(ROUTES.LOGIN_API, "POST", values);

      if (response.isError) {
        setErrors(authError);
        return;
      }

      auth.logIn(response);
      navigate(ROUTES.MAIN_PAGE);
    },
  });

  return (
    <Wrapper>
      <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">Войти</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            className="form-control"
            name={USERNAME_FIELD}
            id={USERNAME_FIELD}
            onChange={handleChange}
            value={values.username}
            autoComplete="username"
            placeholder="Ваш ник"
            ref={loginRef}
            isInvalid={!!errors[USERNAME_FIELD]}
          />
          <Form.Label htmlFor="username">Ваш ник</Form.Label>
          <Form.Control.Feedback type="invalid">
            {errors[USERNAME_FIELD]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            className="form-control"
            name={PASSWORD_FIELD}
            id={PASSWORD_FIELD}
            type="password"
            onChange={handleChange}
            value={values.password}
            autoComplete="current-pasword"
            placeholder="Пароль"
            isInvalid={!!errors[PASSWORD_FIELD]}
          />
          <Form.Label htmlFor="password">Пароль</Form.Label>
          <Form.Control.Feedback type="invalid">
            {errors[PASSWORD_FIELD]}
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
