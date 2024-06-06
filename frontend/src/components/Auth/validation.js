import * as yup from 'yup';
import {
  FIELD_CONFIRM_PASSWORD,
  FIELD_PASSWORD,
  FIELD_USERNAME,
} from './constants';

export const loginValidationSchema = yup.object().shape({
  [FIELD_USERNAME]: yup.string().trim().required('requiredField'),
  [FIELD_PASSWORD]: yup.string().trim().required('requiredField'),
});

export const signupValidationSchema = yup.object().shape({
  [FIELD_USERNAME]: yup
    .string()
    .trim()
    .required('requiredField')
    .min(3, `${FIELD_USERNAME}Length`)
    .max(20, `${FIELD_USERNAME}Length`),
  [FIELD_PASSWORD]: yup
    .string()
    .trim()
    .required('requiredField')
    .min(6, `${FIELD_PASSWORD}Length`),
  [FIELD_CONFIRM_PASSWORD]: yup
    .string()
    .required('requiredField')
    .test(
      'confirm-password',
      'passwordsMustMatch',
      (_, { originalValue, parent }) => parent[FIELD_PASSWORD] === originalValue,
    ),
});
