import * as yup from 'yup';
import { FIELD_MESSAGE } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = yup.object().shape({
  [FIELD_MESSAGE]: yup.string().trim().required('required'),
});
