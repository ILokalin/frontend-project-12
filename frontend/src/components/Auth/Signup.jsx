import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSignup } from 'services/authApi';
import { selectAuthError, selectIsAuthError } from 'redux/slices/authSlice';
import { PAGE_ROUTS } from 'configs/pageRouts';
import signupImg from 'assets/signup.jpg';
import Button from 'components/Buttons/LoadingButton';
import AuthForm from './AuthForm';
import { signupValidationSchema as validationSchema } from './validation';
import {
  signupInitialValues as initialValues,
  FIELD_PASSWORD,
  FIELD_USERNAME,
  FIELD_CONFIRM_PASSWORD,
} from './constants';

const Signup = () => {
  const { t } = useTranslation();
  const authError = useSelector(selectAuthError);
  const isAuthError = useSelector(selectIsAuthError);
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignup();
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
      await signup(data).unwrap();
      navigate(PAGE_ROUTS.MAIN);
    },
  });

  const extraErrors = {
    ...errors,
    ...(isAuthError && { [FIELD_CONFIRM_PASSWORD]: authError }),
  };

  return (
    <AuthForm img={signupImg}>
      <Form className="mt-3 mt-mb-0" onSubmit={handleSubmit}>
        <Card.Title>{t('auth.signupForm.registration')}</Card.Title>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            className="form-control"
            name={FIELD_USERNAME}
            id={FIELD_USERNAME}
            onChange={handleChange}
            value={values[FIELD_USERNAME]}
            autoComplete="username"
            placeholder={t('auth.signupForm.yourNickname')}
            ref={inputRef}
            isInvalid={!!extraErrors[FIELD_USERNAME]}
          />
          <Form.Label htmlFor={FIELD_USERNAME}>
            {t('auth.signupForm.yourNickname')}
          </Form.Label>
          {!isAuthError && (
            <Form.Control.Feedback type="invalid">
              {t(`auth.signupForm.error.${extraErrors[FIELD_USERNAME]}`)}
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
            placeholder={t('auth.signupForm.password')}
            isInvalid={!!extraErrors[FIELD_PASSWORD]}
          />
          <Form.Label htmlFor={FIELD_PASSWORD}>
            {t('auth.signupForm.password')}
          </Form.Label>
          {!isAuthError && (
            <Form.Control.Feedback type="invalid">
              {t(`auth.signupForm.error.${extraErrors[FIELD_PASSWORD]}`)}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            className="form-control"
            name={FIELD_CONFIRM_PASSWORD}
            id={FIELD_CONFIRM_PASSWORD}
            type="password"
            onChange={handleChange}
            value={values[FIELD_CONFIRM_PASSWORD]}
            autoComplete="current-pasword"
            placeholder={t('auth.signupForm.confirmPassword')}
            isInvalid={!!extraErrors[FIELD_CONFIRM_PASSWORD]}
          />
          <Form.Label htmlFor={FIELD_CONFIRM_PASSWORD}>
            {t('auth.signupForm.confirmPassword')}
          </Form.Label>
          <Form.Control.Feedback type="invalid">
            {t(`auth.signupForm.error.${extraErrors[FIELD_CONFIRM_PASSWORD]}`)}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          className="w-100 mb-3"
          type="submit"
          variant="outline-primary"
        >
          {t('auth.signupForm.register')}
        </Button>
      </Form>
    </AuthForm>
  );
};

export default Signup;
