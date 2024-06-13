import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLogin } from 'services/authApi';
import { selectAuthError, selectIsAuthError } from 'redux/slices/authSlice';
import { PAGE_SIGNUP, PAGE_MAIN, getPage } from 'configs/pageRouts';
import loginImg from 'assets/login.jpg';
import Button from 'components/Buttons/LoadingButton';
import AuthForm from './AuthForm';
import { loginValidationSchema as validationSchema } from './validation';
import {
  loginInitialValues as initialValues,
  FIELD_PASSWORD,
  FIELD_USERNAME,
} from './constants';

const Login = () => {
  const { t } = useTranslation();
  const authError = useSelector(selectAuthError);
  const isAuthError = useSelector(selectIsAuthError);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLogin();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data, { setErrors }) => {
      setErrors({});
      await login(data).unwrap();
      navigate(getPage(PAGE_MAIN));
    },
  });

  const extraErrors = {
    ...errors,
    ...(isAuthError && { [FIELD_PASSWORD]: authError }),
  };

  const footer = {
    text: t('auth.loginForm.dontHaveAccount'),
    action: t('auth.signupForm.registration'),
    href: getPage(PAGE_SIGNUP),
  };

  return (
    <AuthForm img={loginImg} footer={footer}>
      <Form className="mt-3 mt-mb-0" onSubmit={handleSubmit}>
        <Card.Title>{t('auth.loginForm.login')}</Card.Title>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            className="form-control"
            name={FIELD_USERNAME}
            id={FIELD_USERNAME}
            onChange={handleChange}
            value={values[FIELD_USERNAME]}
            autoComplete="username"
            placeholder={t('auth.loginForm.yourNickname')}
            ref={inputRef}
            isInvalid={!!extraErrors[FIELD_USERNAME] || isAuthError}
          />
          <Form.Label htmlFor="username">
            {t('auth.loginForm.yourNickname')}
          </Form.Label>
          {!isAuthError && (
            <Form.Control.Feedback type="invalid">
              {t(`auth.loginForm.error.${extraErrors[FIELD_USERNAME]}`)}
            </Form.Control.Feedback>
          )}
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
            placeholder={t('auth.loginForm.password')}
            isInvalid={!!extraErrors[FIELD_PASSWORD] || isAuthError}
          />
          <Form.Label htmlFor="password">
            {t('auth.loginForm.password')}
          </Form.Label>
          <Form.Control.Feedback type="invalid">
            {t(`auth.loginForm.error.${extraErrors[FIELD_PASSWORD]}`)}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          className="w-100 mb-3"
          type="submit"
          variant="outline-primary"
        >
          {t('auth.loginForm.login')}
        </Button>
      </Form>
    </AuthForm>
  );
};

export default Login;
