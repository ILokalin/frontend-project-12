import React from "react";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import Wrapper from "../../Components/Wrapper";
import { validationSchema } from "./validation";

const LoginPage = () => {
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: () => {},
  });

  return (
    <Wrapper>
      <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">Войти</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            className="form-control"
            name="username"
            id="username"
            onChange={handleChange}
            value={values.username}
            autoComplete="username"
            required
            placeholder="Ваш ник"
          />
          <label htmlFor="username">Ваш ник</label>
        </Form.Group>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            className="form-control"
            name="password"
            id="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            autoComplete="current-pasword"
            required
            placeholder="Пароль"
          />
          <label htmlFor="username">Пароль</label>
        </Form.Group>
        <Button className="w-100 mb-3" type="submit" variant="outline-primary">
          Логин
        </Button>
      </Form>
    </Wrapper>
  );
};

export default LoginPage;
