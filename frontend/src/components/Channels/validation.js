import * as yup from 'yup';

const testLeadSpaces = (_, { originalValue }) => !/^\s/.test(originalValue);

// eslint-disable-next-line import/prefer-default-export
export const getValidationSchema = (channels) => (
  yup.object().shape({
    name: yup
      .string()
      .trim()
      .required('requiredField')
      .min(3, 'length')
      .max(20, 'length')
      .notOneOf(channels, 'mustBeUnique')
      .test('no-leading-spaces', 'removeLeadSpaces', testLeadSpaces),
  })
);
