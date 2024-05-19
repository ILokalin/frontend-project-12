import * as yup from "yup";

export const getValidationSchema = (channels) =>
  yup.object().shape({
    name: yup.string().trim().required().min(3).max(20).notOneOf(channels),
  });
