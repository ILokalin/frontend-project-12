import * as yup from 'yup';

const testLeadSpaces = (_, { originalValue }) => !/^\s/.test(originalValue);

export const getValidationSchema = (channels) => (
  yup.object().shape({
    name: yup
      .string()
      .trim()
      .required('requiredField')
      .min(3, 'min')
      .max(20, 'max')
      .notOneOf(channels, 'mustBeUnique')
      .test('no-leading-spaces', 'removeLeadSpaces', testLeadSpaces),
  })
);
