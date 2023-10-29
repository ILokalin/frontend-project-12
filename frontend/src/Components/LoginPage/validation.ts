import * as yup from "yup";

export const validationSchema = yup.object().shape({
  username: yup.string().required("requiredField"),
  password: yup.string().required("requiredField"),
});
